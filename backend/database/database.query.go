package database

import (
	"context"
	"errors"
	"strconv"

	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
	"openchains.com/cutfm/interfaces"
)

func (db *Database) FindUserByEmail(email string) (*interfaces.User, error) {
	user := interfaces.User{}
	return &user, db.Users().FindOne(context.Background(), bson.M{"email": email}).Decode(&user)
}
func (db *Database) AddnewUser(user *interfaces.User) error {
	hashedPassword, err := hashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = ""
	user.EncrypterPassword = hashedPassword
	_, err = db.Users().InsertOne(context.Background(), user)
	return err
}
func (db *Database) AddRadioStation(radio *interfaces.Radio) error {
	_, err := db.RadioStations().InsertOne(context.Background(), radio)
	return err
}
func hashPassword(password string) ([]byte, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return bytes, err
}
func checkPasswordHash(password string, hash []byte) bool {
	err := bcrypt.CompareHashAndPassword(hash, []byte(password))
	return err == nil
}
func (db *Database) VerifyUser(email string, password string) (*interfaces.User, error) {
	user, err := db.FindUserByEmail(email)
	if err != nil {
		return nil, err
	}
	if !checkPasswordHash(password, user.EncrypterPassword) {
		return nil, errors.New("invalid login details")
	}
	user.EncrypterPassword = []byte{}
	user.Password = ""
	return user, nil
}
func (db *Database) ConvertToInt(input string, args ...string) int64 {
	value, err := strconv.Atoi(input)
	if err != nil {
		if len(args) > 0 {
			return 1
		}
		return 0
	}
	return int64(value)
}
