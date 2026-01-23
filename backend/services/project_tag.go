package services

import (
	"fmt"
	"strings"

	"github.com/hudsontheuz/lista_tarefas_saas/db"
	"github.com/hudsontheuz/lista_tarefas_saas/models"
)

func GenerateProjectTag(prefix string) (string, error) {
	var count int64

	err := db.DB.
		Model(&models.Project{}).
		Where("tag LIKE ?", strings.ToUpper(prefix)+"-%").
		Count(&count).Error

	if err != nil {
		return "", err
	}

	next := count + 1

	return fmt.Sprintf(
		"%s-%04d",
		strings.ToUpper(prefix),
		next,
	), nil
}
