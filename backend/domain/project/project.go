package project

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
)

var (
	ErrNameRequired   = errors.New("nome é obrigatório")
	ErrPrefixRequired = errors.New("prefixo é obrigatório")
)

type Project struct {
	ID          uuid.UUID
	UserID      uuid.UUID
	Tag         string
	Name        string
	Description string
	Status      string
	CreatedAt   time.Time
}

func NewProject(userID uuid.UUID, prefix, name, description, status string, sequence int64) (*Project, error) {
	if strings.TrimSpace(name) == "" {
		return nil, ErrNameRequired
	}

	if strings.TrimSpace(prefix) == "" {
		return nil, ErrPrefixRequired
	}

	if strings.TrimSpace(status) == "" {
		status = "active"
	}

	tag := fmt.Sprintf("%s-%04d", strings.ToUpper(strings.TrimSpace(prefix)), sequence)

	return &Project{
		ID:          uuid.New(),
		UserID:      userID,
		Tag:         tag,
		Name:        name,
		Description: description,
		Status:      status,
		CreatedAt:   time.Now(),
	}, nil
}

func (p *Project) Update(name, description, status string) error {
	if strings.TrimSpace(name) != "" {
		p.Name = name
	}

	p.Description = description

	if strings.TrimSpace(status) != "" {
		p.Status = status
	}

	return nil
}
