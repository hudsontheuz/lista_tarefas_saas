package db

import (
	"fmt"
	"log"
	"os"

	"github.com/hudsontheuz/lista_tarefas_saas/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConectaComBancoDeDados() {
	dsn := os.Getenv("DATABASE_URL")

	if dsn == "" {
		dsn = fmt.Sprintf(
			"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
			os.Getenv("DB_HOST"),
			os.Getenv("DB_USER"),
			os.Getenv("DB_PASSWORD"),
			os.Getenv("DB_NAME"),
			os.Getenv("DB_PORT"),
		)
	}

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Erro ao conectar no banco de dados: %v", err)
	}

	// extensão correta para UUID
	database.Exec(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

	DB = database

	migrate()

	log.Println("Banco conectado e migrado com sucesso!")
}

func migrate() {
	DB.AutoMigrate(
		&models.User{},
		&models.UserPreferences{},
		&models.Project{},
		&models.Task{},
	)
}
