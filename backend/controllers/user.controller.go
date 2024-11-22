package controllers

import (
	"net/http"

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
