package services

import (
	"time"

	"github.com/Kei-K23/nextjs-go-auth/database"
	"github.com/Kei-K23/nextjs-go-auth/models"
	"github.com/Kei-K23/nextjs-go-auth/utils"
)

func CreateUser(user *models.User) error {
	// Hash Password
	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}

	user.Password = hashedPassword
	user.CreatedAt = time.Now()
	user.Status = "Inactive" // By default, all user account inactive

	if err := database.DB.Create(user).Error; err != nil {
		return err
	}
	// Success, then return nill
	return nil
}

func GetUserById(id string) (*models.User, error) {
	var user models.User

	if err := database.DB.Where("id = ?", id).Find(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func GetAllUsers() (*[]models.User, error) {
	var user []models.User

	if err := database.DB.Order("created_at DESC").Find(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func UpdateUser(id string, updateUser *models.User) (*models.User, error) {
	var user models.User
	if err := database.DB.Where("id = ?", id).Find(&user).Error; err != nil {
		return nil, err
	}

	// Update the password
	if updateUser.Password != "" {
		hashedPassword, err := utils.HashPassword(updateUser.Password)
		if err != nil {
			return nil, err
		}

		user.Password = hashedPassword
	}

	// Update user name
	if updateUser.Username != "" {
		user.Username = updateUser.Username
	}

	// Update user email
	if updateUser.Email != "" {
		user.Email = updateUser.Email
	}

	// Update user status
	if updateUser.Status != "" {
		user.Status = updateUser.Status
	}

	// Update user role
	if updateUser.Role != "" {
		user.Role = updateUser.Role
	}

	user.UpdatedAt = time.Now()
	// Save changes to db
	if err := database.DB.Save(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func DeleteUser(id string) error {
	var user models.User
	if err := database.DB.Where("id = ?", id).Find(&user).Error; err != nil {
		return err
	}

	// Delete
	if err := database.DB.Delete(&user).Error; err != nil {
		return err
	}

	return nil
}
