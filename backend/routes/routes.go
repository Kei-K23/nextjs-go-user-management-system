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
		protectedRv1.Use(middlewares.CheckUserStatusMiddleware())
		// Get current auth user
		protectedRv1.GET("users/me", controllers.GetAuthUser)
		protectedRv1.PATCH("users/me", controllers.UpdateAuthUser)
		protectedRv1.DELETE("users/me", controllers.DeleteAuthUser)

		// User management
		protectedRv1.GET("users", middlewares.CheckAdminMiddleware(), controllers.GetAllUsers)
		protectedRv1.GET("users/:id", middlewares.CheckAdminMiddleware(), controllers.GetUserById)
		protectedRv1.POST("users", middlewares.CheckAdminMiddleware(), controllers.CreateUser)
		protectedRv1.PATCH("users/:id", middlewares.CheckAdminMiddleware(), controllers.UpdateUser)
		protectedRv1.DELETE("users/:id", middlewares.CheckAdminMiddleware(), controllers.DeleteUser)

		// Other functions...
	}

	return r
}
