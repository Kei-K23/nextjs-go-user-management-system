package routes

import (
	"github.com/Kei-K23/nextjs-go-auth/controllers"
	"github.com/Kei-K23/nextjs-go-auth/middlewares"
	"github.com/gin-gonic/gin"
)

func SetupRotes() *gin.Engine {
	r := gin.Default()

	// API version v1
	rv1 := r.Group("/api/v1")
	{
		// Public routes
		rv1.POST("/auth/register", controllers.Register)
		rv1.POST("/auth/login", controllers.Login)

		// Protected routes
		protectedRv1 := rv1.Group("/")
		protectedRv1.Use(middlewares.JwtAuthMiddleware())
		// Get current auth user
		protectedRv1.GET("users/me", controllers.GetAuthUser)
	}

	return r
}
