package services

import (
	"fmt"

	"github.com/Kei-K23/nextjs-go-auth/database"
	"github.com/Kei-K23/nextjs-go-auth/models"
	"github.com/Kei-K23/nextjs-go-auth/utils"
)

func Register(user *models.User) error {
	// Hash Password
	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}

	user.Password = hashedPassword
	if err := database.DB.Create(user).Error; err != nil {
		return err
	}
	// Success, then return nill
	return nil
}

func Login(email, password string) (string, error) {
	var user models.User

	// Not found the user
	if err := database.DB.Where("email = ?").First(&user).Error; err != nil {
		// TODO Implement advanced error handling
		return "", fmt.Errorf("user not found")
	}

	// Verify the user password
	if err := utils.VerifyPassword(password, user.Password); err != nil {
		return "", fmt.Errorf("invalid credentials")
	}

	// Generate jwt token
	token, err := utils.GenerateJwtToken(user.ID, user.Role)
	if err != nil {
		return "", fmt.Errorf("error when generating jwt token")
	}

	return token, nil
}
