package manager

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"time"

	"slices"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"openchains.com/cutfm/interfaces"
)

func (m *Manager) CommentRadio(c *fiber.Ctx) error {
	user, err := m.DB.ValidateUser(c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: err.Error()})
	}
	comment := interfaces.Comment{}
	if err := c.BodyParser(&comment); err != nil {
		return c.Status(400).JSON(interfaces.Message{Message: err.Error()})
	}
	radio, err2 := m.fetchRadioById(comment.CommentIdTag)
	if err2 != nil {
		return c.Status(400).JSON(interfaces.Message{Message: err2.Error()})
	}
	comment.Time = time.Now().Unix()
	comment.Email = user.Email
	comment.FirstName = user.Name
	comment.LastName = user.LastName
	if _, err := m.DB.Comments().InsertOne(c.Context(), comment); err != nil {
		return c.Status(400).JSON(interfaces.Message{Message: "failed to update comments"})
	}
	if _, err := m.DB.RadioStations().UpdateOne(c.Context(), bson.M{"_id": radio.Id}, bson.M{"$set": bson.M{"comments": radio.Comments + 1}}); err != nil {
		return c.Status(500).JSON(interfaces.Message{Message: "failed to save to db"})
	}
	return c.JSON(interfaces.Message{Message: "comment posted"})
}
func (m *Manager) LikeRadio(c *fiber.Ctx) error {
	user, err := m.DB.ValidateUser(c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: err.Error()})
	}
	likeId := c.Query("id")
	if likeId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: "Invalid id"})
	}
	radio, err := m.fetchRadioById(likeId)
	if err != nil {
		return c.Status(400).JSON(interfaces.Message{Message: err.Error()})
	}
	if user.Likes != nil {
		for i, v := range user.Likes {
			if v.Id.Hex() == likeId {
				radio.Likes -= 1
				user.Likes = slices.Delete(user.Likes, i, i+1)
				if _, err := m.DB.RadioStations().UpdateOne(c.Context(), bson.M{"_id": radio.Id}, bson.M{"$set": bson.M{"likes": radio.Likes}}); err != nil {
					return c.Status(500).JSON(interfaces.Message{Message: "failed to save to db"})
				}
				if _, err := m.DB.Users().UpdateOne(c.Context(), bson.M{"email": user.Email}, bson.M{"$set": bson.M{"likes": user.Likes}}); err != nil {
					return c.Status(500).JSON(interfaces.Message{Message: "failed to save to db"})
				}
				return c.JSON(interfaces.Message{Message: "you have removed radio from favourites",
					Payload: bson.M{"radioLikes": radio.Likes, "user": user},
				})
			}
		}
	}
	radio.Likes += 1
	user.Likes = append(user.Likes, *radio)
	if _, err := m.DB.RadioStations().UpdateOne(c.Context(), bson.M{"_id": radio.Id}, bson.M{"$set": bson.M{"likes": radio.Likes}}); err != nil {
		return c.Status(500).JSON(interfaces.Message{Message: "failed to save to db"})
	}
	if _, err := m.DB.Users().UpdateOne(c.Context(), bson.M{"email": user.Email}, bson.M{"$set": bson.M{"likes": user.Likes}}); err != nil {
		return c.Status(500).JSON(interfaces.Message{Message: "failed to save to db"})
	}
	return c.JSON(interfaces.Message{Message: "you have added radio to favourites",
		Payload: bson.M{"radioLikes": radio.Likes, "user": user},
	})
}
func (m *Manager) UploadRadioEvents(c *fiber.Ctx) error {
	user, err2 := m.DB.ValidateUser(c)
	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: err2.Error()})
	}
	if user.Role != "admin" {
		return c.Status(401).JSON(interfaces.Message{Message: "You have no authorities to perfom this action"})
	}
	events := []interfaces.Event{}
	sort.Slice(events, func(i, j int) bool {
		return time.Unix(events[i].StartTime, 0).Before(time.Unix(events[j].StartTime, 0))
	})
	if err := c.BodyParser(&events); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: "Invalid JSON data"})
	}
	temporaryStorage := map[string][]interfaces.EventsTimeTable{}
	for _, v := range events {
		if _, exists := temporaryStorage[v.RadioId]; !exists {
			temporaryStorage[v.RadioId] = []interfaces.EventsTimeTable{}
		}
		found := false
		for i, v2 := range temporaryStorage[v.RadioId] {
			if v2.DateCode == v.Id {
				found = true
				temporaryStorage[v.RadioId][i].Events = append(v2.Events, v)
				break
			}
		}
		if !found {
			temporaryStorage[v.RadioId] = append(temporaryStorage[v.RadioId], interfaces.EventsTimeTable{
				Events:       []interfaces.Event{v},
				DateCode:     v.Id,
				RadioId:      v.RadioId,
				AbsoluteTime: v.StartTime,
			})
		}
	}
	for _, timeTables := range temporaryStorage {
		records := make([]interface{}, len(timeTables))
		for i, tt := range timeTables {
			records[i] = tt
		}
		_, err := m.DB.TimeTable().InsertMany(context.Background(), records)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(interfaces.Message{Message: err.Error()})
		}
	}
	return c.JSON(interfaces.Message{Message: "All time tables succefully added"})
}
func (m *Manager) UploadRadio(c *fiber.Ctx) error {

	user, err2 := m.DB.ValidateUser(c)
	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: err2.Error()})
	}
	if user.Role != "admin" {
		return c.Status(401).JSON(interfaces.Message{Message: "You have no authorities to perfom this action"})
	}
	radio := interfaces.Radio{}
	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: err.Error()})
	}
	radio.Picture = ""
	files := form.File["files"]
	if len(files) > 0 {
		uploadDir := "./uploads/radio"
		err := os.MkdirAll(uploadDir, os.ModePerm) // Creates nested directories if needed
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(interfaces.Message{Message: "Failed to save image"})
		}
		join := filepath.Base(fmt.Sprintf("%v%v%v", 1, time.Now().Unix(), files[0].Filename))
		path := filepath.Join(uploadDir, join)
		err = c.SaveFile(files[0], path)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(interfaces.Message{Message: err.Error()})
		}
		radio.Picture = "/uploads/radio/" + join
		radio.PictureActualPath = path
	}
	if len(form.Value["radioTitle"]) > 0 {
		radio.Title = form.Value["radioTitle"][0]
		if radio.Title == "" {
			return c.Status(400).JSON(interfaces.Message{Message: "title is missing"})
		}
	} else {
		return c.Status(400).JSON(interfaces.Message{Message: "title is missing"})
	}

	if len(form.Value["radioFM"]) > 0 {
		radio.FmChannel = form.Value["radioFM"][0]
	}
	if len(form.Value["path"]) > 0 {
		radio.Path = form.Value["path"][0]
		if radio.Title == "" {
			return c.Status(400).JSON(interfaces.Message{Message: "path is missing"})
		}
	} else {
		return c.Status(400).JSON(interfaces.Message{Message: "path is missing"})
	}
	if len(form.Value["description"]) > 0 {
		radio.Description = form.Value["description"][0]
		if radio.Title == "" {
			return c.Status(400).JSON(interfaces.Message{Message: "description is missing"})
		}
	} else {
		return c.Status(400).JSON(interfaces.Message{Message: "description is missing"})
	}
	radio.SearchQuery = radio.Title + " " + radio.Description + " " + radio.FmChannel
	if err_ := m.DB.AddRadioStation(&radio); err_ != nil {
		return c.Status(400).JSON(interfaces.Message{Message: err_.Error()})
	}
	return c.JSON(interfaces.Message{Message: "Radio station uploaded succesfully"})
}

func (m *Manager) UploadPodcaster(c *fiber.Ctx) error {
	user, err2 := m.DB.ValidateUser(c)
	if err2 != nil {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: err2.Error()})
	}
	if user.Role != "admin" {
		return c.Status(401).JSON(interfaces.Message{Message: "You have no authorities to perfom this action"})
	}
	podcast := interfaces.PodCaster{}
	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: err.Error()})
	}
	podcast.Picture = ""
	files := form.File["files"]
	if len(files) > 0 {
		uploadDir := "./uploads/podcasts"
		err := os.MkdirAll(uploadDir, os.ModePerm) // Creates nested directories if needed
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(interfaces.Message{Message: "Failed to save image"})
		}
		join := filepath.Base(fmt.Sprintf("%v%v%v", 1, time.Now().Unix(), files[0].Filename))
		path := filepath.Join(uploadDir, join)
		err = c.SaveFile(files[0], path)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(interfaces.Message{Message: err.Error()})
		}
		podcast.Picture = "/uploads/podcasts/" + join
		podcast.PictureActualPath = path
	}
	if len(form.Value["title"]) > 0 {
		podcast.Title = form.Value["title"][0]
		if podcast.Title == "" {
			return c.Status(400).JSON(interfaces.Message{Message: "title is missing"})
		}
	} else {
		return c.Status(400).JSON(interfaces.Message{Message: "title is missing"})
	}
	if len(form.Value["description"]) > 0 {
		podcast.Description = form.Value["description"][0]
	}
	if len(form.Value["website"]) > 0 {
		podcast.Website = form.Value["website"][0]
		if podcast.Title == "" {
			return c.Status(400).JSON(interfaces.Message{Message: "website is missing"})
		}
	} else {
		return c.Status(400).JSON(interfaces.Message{Message: "path is missing"})
	}
	if len(form.Value["presenter"]) > 0 {
		podcast.Presenter = form.Value["presenter"][0]
		if podcast.Presenter == "" {
			return c.Status(400).JSON(interfaces.Message{Message: "presenter is missing"})
		}
	} else {
		return c.Status(400).JSON(interfaces.Message{Message: "description is missing"})
	}
	if _, err_ := m.DB.Podcasts().InsertOne(c.Context(), podcast); err_ != nil {
		return c.Status(400).JSON(interfaces.Message{Message: err_.Error()})
	}
	return c.JSON(interfaces.Message{Message: "Podcast uploaded succesfully"})
}

func (m *Manager) LikePodcast(c *fiber.Ctx) error {
	user, err := m.DB.ValidateUser(c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: err.Error()})
	}
	likeId := c.Query("id")
	if likeId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: "Invalid id"})
	}
	podcasts, err := m.fetchPodcastById(likeId)
	if err != nil {
		return c.Status(400).JSON(interfaces.Message{Message: err.Error()})
	}
	if user.Podcasts != nil {
		for i, v := range user.Podcasts {
			if v.Id.Hex() == likeId {
				podcasts.Likes -= 1
				user.Podcasts = slices.Delete(user.Podcasts, i, i+1)
				if _, err := m.DB.Podcasts().UpdateOne(c.Context(), bson.M{"_id": podcasts.Id}, bson.M{"$set": bson.M{"likes": podcasts.Likes}}); err != nil {
					return c.Status(500).JSON(interfaces.Message{Message: "failed to save to db"})
				}
				if _, err := m.DB.Users().UpdateOne(c.Context(), bson.M{"email": user.Email}, bson.M{"$set": bson.M{"podcasts": user.Podcasts}}); err != nil {
					return c.Status(500).JSON(interfaces.Message{Message: "failed to save to db"})
				}
				return c.JSON(interfaces.Message{Message: "you have removed radio from favourites",
					Payload: bson.M{"podcastsLikes": podcasts.Likes, "user": user},
				})
			}
		}
	}
	podcasts.Likes += 1
	user.Podcasts = append(user.Podcasts, *podcasts)
	if _, err := m.DB.Podcasts().UpdateOne(c.Context(), bson.M{"_id": podcasts.Id}, bson.M{"$set": bson.M{"likes": podcasts.Likes}}); err != nil {
		return c.Status(500).JSON(interfaces.Message{Message: "failed to save to db"})
	}
	if _, err := m.DB.Users().UpdateOne(c.Context(), bson.M{"email": user.Email}, bson.M{"$set": bson.M{"podcasts": user.Podcasts}}); err != nil {
		return c.Status(500).JSON(interfaces.Message{Message: "failed to save to db"})
	}
	return c.JSON(interfaces.Message{Message: "you have added podcasts to favourites",
		Payload: bson.M{"podcastsLikes": podcasts.Likes, "user": user},
	})
}
