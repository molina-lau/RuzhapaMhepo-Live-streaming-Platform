package manager

import (
	"context"
	"errors"
	"fmt"
	"os"
	"sort"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"openchains.com/cutfm/interfaces"
)

func (m *Manager) FindRadiosByQuery(c *fiber.Ctx) error {
	radios := []interfaces.Radio{}
	options := options.Find().SetLimit(20).SetSort(bson.M{"time": -1})
	cursor, err := m.DB.RadioStations().Find(
		context.Background(),
		bson.M{
			"radioTitle": bson.M{
				"$regex":   c.Query("q"),
				"$options": "i",
			},
		},
		options,
	)
	if err != nil {
		return c.Status(500).JSON(interfaces.Message{Message: "Failed to find data"})
	}
	if err := cursor.All(context.TODO(), &radios); err != nil { // Use cursor.All
		return c.Status(500).JSON(interfaces.Message{Message: "no data found"})
	}
	return c.Status(200).JSON(radios)
}

func (m *Manager) GetAllComments(c *fiber.Ctx) error {
	comments := []interfaces.Comment{}
	page := m.DB.ConvertToInt(c.Query("page"), "")
	if page <= 0 {
		return c.Status(400).JSON(interfaces.Message{Message: "Page size too small"})
	}
	options := options.Find().SetLimit(10).SetSkip((page - 1) * 10).SetSort(bson.M{"time": -1})
	cursor, err := m.DB.Comments().
		Find(context.Background(), bson.M{"idTag": c.Query("id")}, options)
	if err != nil {
		return c.Status(500).JSON(interfaces.Message{Message: "Failed to find data"})
	}
	if err := cursor.All(context.TODO(), &comments); err != nil { // Use cursor.All
		return c.Status(500).JSON(interfaces.Message{Message: "no data found"})
	}
	return c.Status(200).JSON(map[string]any{"page": page + 1, "hasMore": len(comments) >= 10, "comments": comments})
}
func (m *Manager) GetAllRadios(c *fiber.Ctx) error {
	radios := []interfaces.Radio{}
	page := m.DB.ConvertToInt(c.Query("page"), "")
	if page <= 0 {
		return c.Status(400).JSON(interfaces.Message{Message: "Page size too small"})
	}
	options := options.Find().SetLimit(10).SetSkip((page - 1) * 10).SetSort(bson.M{"time": -1})
	cursor, err := m.DB.RadioStations().
		Find(context.Background(), bson.M{}, options)
	if err != nil {
		return c.Status(500).JSON(interfaces.Message{Message: "Failed to find data"})
	}
	if err := cursor.All(context.TODO(), &radios); err != nil { // Use cursor.All
		return c.Status(500).JSON(interfaces.Message{Message: "no data found"})
	}
	return c.Status(200).JSON(map[string]any{"page": page + 1, "hasMore": len(radios) >= 10, "radios": radios})
}
func (m *Manager) GetRadio(c *fiber.Ctx) error {
	radio, err := m.fetchRadioById(c.Query("id"))
	if err != nil {
		return c.Status(400).JSON(interfaces.Message{Message: err.Error()})
	}
	return c.JSON(radio)
}
func (m *Manager) fetchRadioById(idString string) (*interfaces.Radio, error) {
	id, err := primitive.ObjectIDFromHex(idString)
	if err != nil {
		return nil, errors.New("invalid radio id")
	}
	radio := interfaces.Radio{}
	if err := m.DB.RadioStations().
		FindOne(context.Background(), bson.M{"_id": id}).Decode(&radio); err != nil {
		return nil, errors.New("radio Not Found")
	}
	return &radio, nil
}
func (m *Manager) fetchPodcastById(idString string) (*interfaces.PodCaster, error) {
	id, err := primitive.ObjectIDFromHex(idString)
	if err != nil {
		return nil, errors.New("invalid podcast id")
	}
	podcast := interfaces.PodCaster{}
	if err := m.DB.Podcasts().
		FindOne(context.Background(), bson.M{"_id": id}).Decode(&podcast); err != nil {
		return nil, errors.New("podcast Not Found")
	}
	return &podcast, nil
}

func (m *Manager) GetAllPodcasts(c *fiber.Ctx) error {
	podcast := []interfaces.PodCaster{}
	page := m.DB.ConvertToInt(c.Query("page"), "")
	if page <= 0 {
		return c.Status(400).JSON(interfaces.Message{Message: "Page size too small"})
	}
	options := options.Find().SetLimit(20).SetSkip((page - 1) * 20).SetSort(bson.M{"time": -1})
	cursor, err := m.DB.Podcasts().
		Find(
		context.Background(),
		bson.M{
			"title": bson.M{
				"$regex":   c.Query("q"),
				"$options": "i",
			},
		},
		options,
	)
	if err != nil {
		return c.Status(500).JSON(interfaces.Message{Message: "Failed to find data"})
	}
	if err := cursor.All(context.TODO(), &podcast); err != nil { 
		return c.Status(500).JSON(interfaces.Message{Message: "no data found"})
	}
	return c.Status(200).JSON(bson.M{"podcasts": podcast, "page": page + 1, "hasMore": len(podcast) >= 20})
}
func (m *Manager) GetRadioSchedule(c *fiber.Ctx) error {
	id := c.Query("id")
	timeRange := m.DB.ConvertToInt(c.Query("time"))
	dateTime := time.Unix(timeRange, 0)
	dayOfWeek := dateTime.Weekday()
	startDate := int64(0)
	endDate := int64(0)
	if dayOfWeek > 0 {
		dateTime = dateTime.AddDate(0, 0, -int(dayOfWeek))
		startDate = dateTime.Unix()
	}
	dateTime = dateTime.AddDate(0, 0, 6)
	endDate = dateTime.Unix()
	schedules := []interfaces.EventsTimeTable{}
	filter := bson.M{
		"radioId": id,
		"absoluteTime": bson.M{
			"$lte": endDate,
			"$gte": startDate,
		},
	}
	cursor, err := m.DB.TimeTable().Find(context.Background(), filter)
	if err != nil {
		return c.Status(400).JSON(interfaces.Message{Message: "Radio Not Found"})
	}
	if err := cursor.All(context.Background(), &schedules); err != nil {
		return c.Status(400).JSON(interfaces.Message{Message: "Radio Not Found | opposite decode"})
	}
	sort.Slice(schedules, func(i, j int) bool {
		return time.Unix(schedules[i].AbsoluteTime, 0).Before(time.Unix(schedules[j].AbsoluteTime, 0))
	})
	for i := range schedules {
		week := time.Unix(int64(schedules[i].AbsoluteTime), 0).Weekday()
		schedules[i].DayOfWeek = int(week)
	}
	return c.Status(200).JSON(schedules)
}

func (m *Manager) RecordForUser(c *fiber.Ctx) error {
	user, err := m.DB.ValidateUser(c)
	data := interfaces.Radio{}
	if err != nil {
		return c.Status(400).JSON(interfaces.Message{Message: "Please login to record"})
	}
	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: "Invalid JSON data"})
	}
	if session, err := m.StartRecording(user, data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: err.Error()})
	} else {
		return c.Status(200).JSON(session)
	}
}

func (m *Manager) SyncRecord(c *fiber.Ctx) error {
	_, err := m.DB.ValidateUser(c)
	data := interfaces.UserSession{}
	if err != nil {
		return c.Status(400).JSON(interfaces.Message{Message: "Please login to record"})
	}
	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: "Invalid JSON data"})
	}
	_, ok := mutextMap.data[data.SessionId]
	if !ok {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: "Session doesnt exits"})
	}
	mutextMap.Lock()
	listener := mutextMap.data[data.SessionId]
	listener.Counter = 1
	mutextMap.data[data.SessionId] = listener
	mutextMap.Unlock()
	return c.Status(200).JSON(interfaces.Message{Message: "Session updated"})
}

func (m *Manager) StopRecord(c *fiber.Ctx) error {
	_, err := m.DB.ValidateUser(c)
	data := interfaces.UserSession{}
	if err != nil {
		return c.Status(400).JSON(interfaces.Message{Message: "Please login to record"})
	}
	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: "Invalid JSON data"})
	}
	_, ok := mutextMap.data[data.SessionId]
	if !ok {
		return c.Status(fiber.StatusBadRequest).JSON(interfaces.Message{Message: "Session doesnt exits"})
	}
	listener := mutextMap.data[data.SessionId]
	mutextMap.Lock()
	listener.Counter = -1
	listener.Stop = true
	mutextMap.data[data.SessionId] = listener
	mutextMap.Unlock()
	return c.Status(200).JSON(interfaces.Message{Message: "Record stopped"})
}

func (m *Manager) GetRecordings(c *fiber.Ctx) error {
	fmt.Println("Getting records for page ", c.Query("page"), " id ", c.Query("radioId"))
	user, err := m.DB.ValidateUser(c)
	if err != nil {
		return c.Status(400).JSON(interfaces.Message{Message: "Please login to record"})
	}
	recordings := []interfaces.Recording{}
	page := m.DB.ConvertToInt(c.Query("page"), "")
	if page <= 0 {
		return c.Status(400).JSON(interfaces.Message{Message: "Page size too small"})
	}
	options := options.Find().SetLimit(20).SetSkip((page - 1) * 20).SetSort(bson.M{"time": -1})
	cursor, err := m.DB.Recordings().
		Find(context.Background(), bson.M{
			"radioId": c.Query("radioId"),
			"email":   user.Email,
		}, options)
	if err != nil {
		return c.Status(500).JSON(interfaces.Message{Message: "Failed to find data"})
	}
	if err := cursor.All(context.TODO(), &recordings); err != nil { // Use cursor.All
		return c.Status(500).JSON(interfaces.Message{Message: "no data found"})
	}
	fmt.Println("finished success with ", len(recordings))
	return c.Status(200).JSON(bson.M{"recordings": recordings, "page": page + 1, "hasMore": len(recordings) >= 20})
}

func (m *Manager) DeleteRecord(c *fiber.Ctx) error {
	user, err := m.DB.ValidateUser(c)
	id, errId := primitive.ObjectIDFromHex(c.Query("id"))
	if errId != nil {
		return c.Status(400).JSON(interfaces.Message{Message: "Invalid Id"})
	}
	if err != nil {
		return c.Status(400).JSON(interfaces.Message{Message: "Please login to delete record"})
	}
	recording := interfaces.Recording{}
	if err2 := m.DB.Recordings().
		FindOne(context.Background(), bson.M{
			"_id":   id,
			"email": user.Email,
		}).Decode(&recording); err2 != nil {
		return c.Status(400).JSON(interfaces.Message{Message: "Failed to find data"})
	}

	if err := os.Remove(recording.FullPath); err != nil {
		// Handle potential errors during deletion
		if os.IsNotExist(err) {
			fmt.Printf("Error: File '%s' does not exist.\n", recording.FullPath)
		} else {
			// Handle other errors like permission issues
			fmt.Printf("Error deleting file '%s': %v\n", recording.FullPath, err)
		}
		return c.Status(400).JSON(interfaces.Message{Message: "Failed to delete data"})
	}
	_, err2 := m.DB.Recordings().
		DeleteOne(context.Background(), bson.M{
			"_id":   id,
			"email": user.Email,
		})
	if err2 != nil {
		return c.Status(400).JSON(interfaces.Message{Message: "Failed to find data " + err2.Error()})
	}

	return c.Status(200).JSON(interfaces.Message{Message: "Recording has been deleted succesffully"})
}
