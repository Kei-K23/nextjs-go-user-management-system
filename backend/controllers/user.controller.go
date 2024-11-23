package controllers

import (
	"net/http"

	"github.com/Kei-K23/nextjs-go-auth/models"
	"github.com/Kei-K23/nextjs-go-auth/services"
	"github.com/gin-gonic/gin"
)

func GetAuthUser(c *gin.Context) {
	user, isUserExist := c.Get("user")
	if !isUserExist {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func UpdateAuthUser(c *gin.Context) {
	authUserValue, isUserExist := c.Get("user")
	if !isUserExist {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	authUser, ok := authUserValue.(models.User)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user data"})
		c.Abort()
		return
	}

	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedUser, err := services.UpdateUser(authUser.ID, &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error when updating user"})
		return
	}

	c.JSON(http.StatusOK, updatedUser)
}

func DeleteAuthUser(c *gin.Context) {
	authUserValue, isUserExist := c.Get("user")
	if !isUserExist {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	authUser, ok := authUserValue.(models.User)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user data"})
		c.Abort()
		return
	}

	err := services.DeleteUser(authUser.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error when deleting user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User account successfully deleted"})
}

func GetUserById(c *gin.Context) {
	userId := c.Param("id")
	if userId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "UserId is required"})
		return
	}

	user, err := services.GetUserById(userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error when retrieving user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func GetAllUsers(c *gin.Context) {
	users, err := services.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error when retrieving users"})
		return
	}

	c.JSON(http.StatusOK, users)
}

func CreateUser(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := services.CreateUser(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error when creating user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User account successfully created"})
}

func UpdateUser(c *gin.Context) {
	var user models.User
	userId := c.Param("id")
	if userId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user id is required"})
		return
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	updatedUser, err := services.UpdateUser(userId, &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error when updating user"})
		return
	}

	c.JSON(http.StatusOK, updatedUser)
}

func DeleteUser(c *gin.Context) {
	userId := c.Param("id")
	if userId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user id is required"})
		return
	}

	err := services.DeleteUser(userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error when deleting user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User account successfully deleted"})
}

func DeleteUsers(c *gin.Context) {
	var userIds struct {
		IDs []string `json:"ids"`
	}

	if err := c.ShouldBindJSON(&userIds); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := services.DeleteUsers(userIds.IDs)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error when deleting users"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User's accounts successfully deleted"})
}
