package controllers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/hudsontheuz/lista_tarefas_saas/db"
	"github.com/hudsontheuz/lista_tarefas_saas/models"
	"github.com/hudsontheuz/lista_tarefas_saas/dto"
)

func CreateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var input dto.CreateTaskInput

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	task := models.Task{
		ID:        uuid.New(),
		ProjectID: input.ProjectID,
		Title:     input.Title,
		Priority:  input.Priority,
		Status:    input.Status,
		DueDate:   input.DueDate,
		CreatedAt: time.Now(),
	}

	if err := db.DB.Create(&task).Error; err != nil {
		http.Error(w, "Erro ao criar task", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(task)
}

func GetTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var tasks []models.Task

	if err := db.DB.Order("created_at desc").Find(&tasks).Error; err != nil {
		http.Error(w, "Erro ao buscar tasks", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(tasks)
}
