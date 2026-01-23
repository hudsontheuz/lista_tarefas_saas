package models

import (
	"time"

	"github.com/google/uuid"
)

type Task struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
	ProjectID uuid.UUID `gorm:"type:uuid"`
	Title     string
	Priority  string
	Status    string
	DueDate   time.Time
	CreatedAt time.Time
}
