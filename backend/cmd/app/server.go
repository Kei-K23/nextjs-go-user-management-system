package main

import (
	"log"

	"github.com/Kei-K23/nextjs-go-auth/config"
	"github.com/Kei-K23/nextjs-go-auth/database"
	"github.com/Kei-K23/nextjs-go-auth/models"
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
}
