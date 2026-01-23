package models

import (
	"time"

	"github.com/google/uuid"
)

type Project struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	UserID      uuid.UUID `gorm:"type:uuid;not null;index" json:"user_id"`
	Tag         string    `gorm:"type:varchar(20);not null;uniqueIndex" json:"tag"`
	Name        string    `gorm:"type:varchar(100);not null" json:"name"`
	Description string    `gorm:"type:text" json:"description"`
	Status      string    `gorm:"type:varchar(20);not null;default:'active'" json:"status"`
	CreatedAt   time.Time `json:"created_at"`
}
