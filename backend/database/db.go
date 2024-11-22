package database

import (
	"fmt"
	"log"

	"github.com/Kei-K23/nextjs-go-auth/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	var err error
	// DB connection
	dsn := "host=" + config.GetEnv("DB_HOST") +
		" user=" + config.GetEnv("DB_USER") +
		" password=" + config.GetEnv("DB_PASSWORD") +
		" dbname=" + config.GetEnv("DB_NAME") +
		" port=" + config.GetEnv("DB_PORT") +
		" sslmode=disable"

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	fmt.Println("Successfully connected to database!")
}
