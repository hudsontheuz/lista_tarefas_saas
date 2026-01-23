package dto

import "github.com/google/uuid"

type CreateProjectInput struct {
	UserID      uuid.UUID `json:"user_id"`
	Prefix      string    `json:"prefix"` 
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Status      string    `json:"status"` 
}