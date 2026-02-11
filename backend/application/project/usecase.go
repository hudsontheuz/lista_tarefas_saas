package project

import (
	"errors"
	"strings"

	"github.com/google/uuid"
	domain "github.com/hudsontheuz/lista_tarefas_saas/domain/project"
)

var ErrProjectNotFound = errors.New("projeto não encontrado")

type UseCase struct {
	repository domain.Repository
}

func NewUseCase(repository domain.Repository) *UseCase {
	return &UseCase{repository: repository}
}

func (u *UseCase) Create(userID uuid.UUID, prefix, name, description, status string) (*domain.Project, error) {
	count, err := u.repository.CountByPrefix(strings.ToUpper(strings.TrimSpace(prefix)))
	if err != nil {
		return nil, err
	}

	project, err := domain.NewProject(userID, prefix, name, description, status, count+1)
	if err != nil {
		return nil, err
	}

	if err := u.repository.Create(project); err != nil {
		return nil, err
	}

	return project, nil
}

func (u *UseCase) List() ([]domain.Project, error) {
	return u.repository.List()
}

func (u *UseCase) GetByID(id, userID uuid.UUID) (*domain.Project, error) {
	project, err := u.repository.GetByIDAndUser(id, userID)
	if err != nil {
		return nil, err
	}

	if project == nil {
		return nil, ErrProjectNotFound
	}

	return project, nil
}

func (u *UseCase) DeleteByID(id, userID uuid.UUID) error {
	deleted, err := u.repository.DeleteByIDAndUser(id, userID)
	if err != nil {
		return err
	}

	if !deleted {
		return ErrProjectNotFound
	}

	return nil
}

func (u *UseCase) Update(id, userID uuid.UUID, name, description, status string) (*domain.Project, error) {
	project, err := u.repository.GetByIDAndUser(id, userID)
	if err != nil {
		return nil, err
	}

	if project == nil {
		return nil, ErrProjectNotFound
	}

	if err := project.Update(name, description, status); err != nil {
		return nil, err
	}

	if err := u.repository.Update(project); err != nil {
		return nil, err
	}

	return project, nil
}
