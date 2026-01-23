package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/google/uuid"
	"github.com/hudsontheuz/lista_tarefas_saas/db"
	"github.com/hudsontheuz/lista_tarefas_saas/models"
)


func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	user.ID = uuid.New()

	if err := db.DB.Create(&user).Error; err != nil {
		http.Error(w, "Erro ao criar usuário", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}


func GetUserByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := uuid.Parse(params["id"])
	if err != nil {
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}

	var user models.User

	if err := db.DB.First(&user, "id = ?", id).Error; err != nil {
		http.Error(w, "Usuário não encontrado", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(user)
}
