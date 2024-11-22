package routes

import (
	"github.com/Kei-K23/nextjs-go-auth/controllers"
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
	}

	return r
}
