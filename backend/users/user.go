package users

import (
	"regexp"

	"github.com/gofiber/fiber/v2"
	"openchains.com/cutfm/interfaces"
)

func (ul *UserLogin) RegisterUser(fiber *fiber.Ctx) error {
	if fiber.Get("x-device-id") == "" {
		return fiber.Status(401).JSON(interfaces.Message{Message: "UnAuthorized request"})
	}
	user := interfaces.User{}
	if err := fiber.BodyParser(&user); err != nil {
		return fiber.SendStatus(400)
	}

	if user.LastName == "" || user.Name == "" || user.Password == "" {
		return fiber.Status(400).JSON(interfaces.Message{Message: "Username, Lastname, and Password cannot be empty"})
	}
	if user.Email == "" {
		return fiber.Status(400).JSON(interfaces.Message{Message: "Email cannot be empty"})
	}
	// Validate email format

	// Validate email format
	emailRegex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	isValidEmail := regexp.MustCompile(emailRegex).MatchString
	if !isValidEmail(user.Email) {
		return fiber.Status(400).JSON(interfaces.Message{Message: "Invalid email format"})
	}
	user.Role = "client"
	_, response := ul.DB.FindUserByEmail(user.Email)
	if response == nil {
		return fiber.Status(400).JSON(interfaces.Message{Message: "User with the given email address already exists"})
	}
	// Encrypt the password, device ID, and email
	key, err := ul.DB.Encrypt(string(user.Password) + ul.DB.GetSeparator() + user.Email + ul.DB.GetSeparator() + fiber.Get("x-device-id"))
	if err != nil {
		return fiber.Status(500).JSON(interfaces.Message{Message: "Failed to encrypt password"})
	}
	if err1 := ul.DB.AddnewUser(&user); err1 != nil {
		return fiber.Status(400).JSON(interfaces.Message{Message: "failed to create user , registration failed"})
	}
	return fiber.Status(200).JSON(interfaces.Message{Message: "User registration done ", Payload: key})
}

func (ul *UserLogin) LoginUser(fiber *fiber.Ctx) error {
	user := interfaces.User{}
	if fiber.Get("x-device-id") == "" {
		return fiber.Status(401).JSON(interfaces.Message{Message: "UnAuthorized request"})
	}
	if err := fiber.BodyParser(&user); err != nil {
		return fiber.Status(401).JSON(interfaces.Message{Message: ""})
	}
	user.Role = "client"
	userDb, response := ul.DB.VerifyUser(user.Email, user.Password)
	if response != nil {
		return fiber.Status(400).JSON(interfaces.Message{Message: "Email or password incorrect"})
	}
	// Encrypt the password, device ID, and email
	key, err := ul.DB.Encrypt(string(user.Password) + ul.DB.GetSeparator() + user.Email + ul.DB.GetSeparator() + fiber.Get("x-device-id"))
	if err != nil {
		return fiber.Status(500).JSON(interfaces.Message{Message: "Failed to encrypt password"})
	}
	return fiber.JSON(interfaces.Message{Message: "User registration done ", Payload: map[string]any{"user": userDb, "payload": key}})
}
