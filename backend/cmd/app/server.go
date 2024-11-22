package main

import (
	"fmt"
	"log"

	"github.com/Kei-K23/nextjs-go-auth/config"
	"github.com/Kei-K23/nextjs-go-auth/database"
	"github.com/Kei-K23/nextjs-go-auth/models"
	"github.com/Kei-K23/nextjs-go-auth/routes"
)

func main() {
	// Load the .env value
	config.LoadEnv()

	// Connect the database
	database.Connect()
	// Run auto migration when start the server
	err := database.DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatalf("Error during migration: %v", err.Error())
	}

	port := config.GetEnv("PORT")
	if port == "" {
		port = "8080"
	}

	r := routes.SetupRotes()

	if err := r.Run(":" + port); err != nil {
		log.Fatal("Error when starting server")
	}

	fmt.Printf("Server is running on PORT: %s\n", port)
}
