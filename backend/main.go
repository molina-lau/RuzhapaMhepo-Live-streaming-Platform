package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"openchains.com/cutfm/database"
	"openchains.com/cutfm/manager"
	"openchains.com/cutfm/users"
)

func main() {
	app := fiber.New()
	// Enable CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "X-Device-ID, Content-Type, Accept, Authorization",
	}))

	db, err := database.InitializeMongoDB("mongodb+srv://wayne:wayne@cluster0.ewha4oz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
	if err != nil {
		panic(err)
	}
	userActions := users.UserLogin{DB: db}
	manager := manager.Manager{DB: db}
	go manager.SessionRun()
	app.Static("/uploads", "./uploads")
	app.Get("/radio/like", manager.LikeRadio)
	app.Get("/radio/get", manager.GetAllRadios)
	app.Get("/radio/get/one", manager.GetRadio)
	app.Get("/podcast/like", manager.LikePodcast)
	app.Post("/radio/upload", manager.UploadRadio)
	app.Post("/user/login", userActions.LoginUser)
	app.Get("/podcast/get", manager.GetAllPodcasts)
	app.Post("/radio/record", manager.RecordForUser)
	app.Post("/radio/comment", manager.CommentRadio)
	app.Get("/radio/query", manager.FindRadiosByQuery)
	app.Post("/radio/record/stop", manager.StopRecord)
	app.Post("/radio/record/sync", manager.SyncRecord)
	app.Get("/radio/record/get", manager.GetRecordings)
	app.Post("/user/register", userActions.RegisterUser)
	app.Get("/radio/schedule", manager.GetRadioSchedule)
	app.Post("/podcast/upload", manager.UploadPodcaster)
	app.Get("/radio/comment/get", manager.GetAllComments)
	app.Post("/events/upload", manager.UploadRadioEvents)
	app.Post("/radio/record/delete", manager.DeleteRecord)
	if err := app.Listen("0.0.0.0:5111"); err != nil {
		panic(err)
	}
}
