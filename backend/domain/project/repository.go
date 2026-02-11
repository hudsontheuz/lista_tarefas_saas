package project

import "github.com/google/uuid"

type Repository interface {
	Create(project *Project) error
	List() ([]Project, error)
	GetByIDAndUser(id, userID uuid.UUID) (*Project, error)
	DeleteByIDAndUser(id, userID uuid.UUID) (bool, error)
	Update(project *Project) error
	CountByPrefix(prefix string) (int64, error)
}
