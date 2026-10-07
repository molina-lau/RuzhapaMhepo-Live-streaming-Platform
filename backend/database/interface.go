package database

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	client *mongo.Database
}

func InitializeMongoDB(uri string) (*Database, error) {
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Printf("Failed to connect to MongoDB: %v", err)
		return nil, err
	}

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Printf("Failed to ping MongoDB: %v", err)
		return nil, err
	}

	return &Database{client: client.Database("cutfm")}, nil
}
func (db *Database) Users() *mongo.Collection {
	return db.client.Collection("users")
}
func (db *Database) Podcasts() *mongo.Collection {
	return db.client.Collection("podcasts")
}
func (db *Database) RadioStations() *mongo.Collection {
	return db.client.Collection("radios")
}
func (db *Database) TimeTable() *mongo.Collection {
	return db.client.Collection("time_table")
}
func (db *Database) Comments() *mongo.Collection {
	return db.client.Collection("comments")
}
func (db *Database) Recordings() *mongo.Collection {
	return db.client.Collection("recordings")
}
