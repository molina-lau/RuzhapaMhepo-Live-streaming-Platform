package database

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"errors"
	"strings"

	"github.com/gofiber/fiber/v2"
	"openchains.com/cutfm/interfaces"
)

var separator = "://=/=/[09212]//:"
var keyPass = "---sl2-ers-df-sf"

func (ul *Database) Encrypt(data string) (string, error) {
	// Example AES encryption logic
	key := []byte(keyPass) // 16 bytes key for AES-128
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}
	plaintext := []byte(data)
	padding := block.BlockSize() - len(plaintext)%block.BlockSize()
	paddedText := append(plaintext, bytes.Repeat([]byte{byte(padding)}, padding)...)

	ciphertext := make([]byte, len(paddedText))
	mode := cipher.NewCBCEncrypter(block, key[:block.BlockSize()])
	mode.CryptBlocks(ciphertext, paddedText)
	return base64.StdEncoding.EncodeToString(ciphertext), nil
}
func (ul *Database) Decrypt(encryptedData string) (string, error) {
	// Example AES decryption logic
	key := []byte(keyPass) // 16 bytes key for AES-128
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}
	ciphertext, err := base64.StdEncoding.DecodeString(encryptedData)
	if err != nil {
		return "", err
	}
	if len(ciphertext)%block.BlockSize() != 0 {
		return "", fiber.NewError(fiber.StatusInternalServerError, "ciphertext is not a multiple of the block size")
	}
	mode := cipher.NewCBCDecrypter(block, key[:block.BlockSize()])
	plaintext := make([]byte, len(ciphertext))
	mode.CryptBlocks(plaintext, ciphertext)
	// Remove padding
	padding := int(plaintext[len(plaintext)-1])
	if padding > block.BlockSize() || padding == 0 {
		return "", fiber.NewError(fiber.StatusInternalServerError, "invalid padding size")
	}
	plaintext = plaintext[:len(plaintext)-padding]

	return string(plaintext), nil
}
func (d *Database) GetSeparator() string {
	return separator
}
func (d *Database) ValidateUser(c *fiber.Ctx) (*interfaces.User, error) {
	key := c.Get("Authorization")
	if len(key) < 3 {
		return nil, errors.New("you are not authorized")
	}
	result, err := d.Decrypt(key)
	if err != nil {
		return nil, errors.New("you are not authorized")
	}
	parts := strings.Split(result, separator)
	if len(parts) < 3 {
		return nil, errors.New("you are not authorized ?")
	}
	if parts[2] != c.Get("x-device-id") {
		return nil, errors.New("you are not authorized : invalid login device")
	}
	return d.VerifyUser(parts[1], parts[0])
}
