package middlewares

import (
	"net/http"

	"github.com/Kei-K23/nextjs-go-auth/models"
	"github.com/gin-gonic/gin"
)

// To check make sure user account is active
func CheckUserStatusMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		userValue, isUserExist := c.Get("user")
		if !isUserExist {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		user, ok := userValue.(models.User)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user data"})
			c.Abort()
			return
		}

		if user.Status != "Active" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User account is inactive"})
			c.Abort()
			return
		}

		c.Next()
	}
}
