package middlewares

import (
	"net/http"
	"strings"

	"github.com/Kei-K23/nextjs-go-auth/database"
	"github.com/Kei-K23/nextjs-go-auth/models"
	"github.com/Kei-K23/nextjs-go-auth/utils"
	"github.com/gin-gonic/gin"
)

func JwtAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenStr := c.GetHeader("Authorization")
		if tokenStr == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is required"})
			c.Abort()
			return
		}

		tokenStr = strings.Split(tokenStr, "Bearer ")[1]

		token, claims, err := utils.ParseToken(tokenStr)
		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid access token"})
			c.Abort()
			return
		}

		// If user already attached, them call next function
		_, isUserExist := c.Get("user")
		if isUserExist {
			c.Next()
		}

		// Attach the user to request
		var user models.User
		userID := claims["user_id"]
		if err := database.DB.Where("id = ?", userID).Find(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error when getting user"})
			c.Abort()
			return
		}
		c.Set("user", user)
		c.Next()
	}
}
