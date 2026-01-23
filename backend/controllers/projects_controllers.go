package controllers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/google/uuid"

	"github.com/hudsontheuz/lista_tarefas_saas/db"
	"github.com/hudsontheuz/lista_tarefas_saas/dto"
	"github.com/hudsontheuz/lista_tarefas_saas/models"
	"github.com/hudsontheuz/lista_tarefas_saas/services"
)

func CreateProject(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var input dto.CreateProjectInput

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "dados inválidos", http.StatusBadRequest)
		return
	}

	// 🔐 enquanto não existe login, user fixo (temporário)
	userID := uuid.MustParse("11111111-1111-1111-1111-111111111111")

	// 🏷️ gera a tag com base no prefix enviado pelo frontend
	tag, err := services.GenerateProjectTag(input.Prefix)
	if err != nil {
		http.Error(w, "erro ao gerar tag do projeto", http.StatusInternalServerError)
		return
	}

	project := models.Project{
		ID:          uuid.New(),
		UserID:      userID,
		Tag:         tag,
		Name:        input.Name,
		Description: input.Description,
		Status:      input.Status,
		CreatedAt:   time.Now(),
	}

	if err := db.DB.Create(&project).Error; err != nil {
		http.Error(w, "erro ao criar projeto", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(project)
}

func GetProjects(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var projects []models.Project

	if err := db.DB.Order("created_at desc").Find(&projects).Error; err != nil {
		http.Error(w, "erro ao buscar projetos", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(projects)
}

func GetProjectByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := uuid.Parse(params["id"])
	if err != nil {
		http.Error(w, "id inválido", http.StatusBadRequest)
		return
	}

	var project models.Project

	if err := db.DB.First(&project, "id = ?", id).Error; err != nil {
		http.Error(w, "projeto não encontrado", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(project)
}
