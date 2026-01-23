package models

import "github.com/google/uuid"

type UserPreferences struct {
	ID                 uuid.UUID `gorm:"type:uuid;primaryKey"`
	UserID             uuid.UUID `gorm:"type:uuid"`
	DarkMode           bool
	EmailNotifications bool
}
