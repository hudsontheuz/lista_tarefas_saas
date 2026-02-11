package repositories

import (
	"strings"

	"github.com/google/uuid"
	domain "github.com/hudsontheuz/lista_tarefas_saas/domain/project"
	"github.com/hudsontheuz/lista_tarefas_saas/models"
	"gorm.io/gorm"
)

type ProjectRepository struct {
	db *gorm.DB
}

func NewProjectRepository(db *gorm.DB) *ProjectRepository {
	return &ProjectRepository{db: db}
}

func (r *ProjectRepository) Create(project *domain.Project) error {
	return r.db.Create(toModel(project)).Error
}

func (r *ProjectRepository) List() ([]domain.Project, error) {
	var projectModels []models.Project
	if err := r.db.Order("created_at desc").Find(&projectModels).Error; err != nil {
		return nil, err
	}

	projects := make([]domain.Project, 0, len(projectModels))
	for _, p := range projectModels {
		projects = append(projects, toDomain(p))
	}

	return projects, nil
}

func (r *ProjectRepository) GetByIDAndUser(id, userID uuid.UUID) (*domain.Project, error) {
	var projectModel models.Project
	if err := r.db.First(&projectModel, "id = ? AND user_id = ?", id, userID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	project := toDomain(projectModel)
	return &project, nil
}

func (r *ProjectRepository) DeleteByIDAndUser(id, userID uuid.UUID) (bool, error) {
	result := r.db.Delete(&models.Project{}, "id = ? AND user_id = ?", id, userID)
	if result.Error != nil {
		return false, result.Error
	}
	return result.RowsAffected > 0, nil
}

func (r *ProjectRepository) Update(project *domain.Project) error {
	return r.db.Save(toModel(project)).Error
}

func (r *ProjectRepository) CountByPrefix(prefix string) (int64, error) {
	var count int64
	if err := r.db.Model(&models.Project{}).Where("tag LIKE ?", strings.ToUpper(prefix)+"-%").Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}

func toModel(project *domain.Project) *models.Project {
	return &models.Project{
		ID:          project.ID,
		UserID:      project.UserID,
		Tag:         project.Tag,
		Name:        project.Name,
		Description: project.Description,
		Status:      project.Status,
		CreatedAt:   project.CreatedAt,
	}
}

func toDomain(project models.Project) domain.Project {
	return domain.Project{
		ID:          project.ID,
		UserID:      project.UserID,
		Tag:         project.Tag,
		Name:        project.Name,
		Description: project.Description,
		Status:      project.Status,
		CreatedAt:   project.CreatedAt,
	}
}
