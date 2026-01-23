package dto

import (
	"time"

	"github.com/google/uuid"
)

type CreateTaskInput struct {
	ProjectID uuid.UUID `json:"project_id"`
	Title     string    `json:"title"`
	Priority  string    `json:"priority"` // High | Medium | Low
	Status    string    `json:"status"`   // Pending | In Progress | Done
	DueDate   time.Time `json:"due_date"`
}
