package controllers

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	appProject "github.com/hudsontheuz/lista_tarefas_saas/application/project"
	"github.com/hudsontheuz/lista_tarefas_saas/db"
	domainProject "github.com/hudsontheuz/lista_tarefas_saas/domain/project"
	"github.com/hudsontheuz/lista_tarefas_saas/dto"
	"github.com/hudsontheuz/lista_tarefas_saas/infrastructure/repositories"
)

func projectUseCase() *appProject.UseCase {
	repo := repositories.NewProjectRepository(db.DB)
	return appProject.NewUseCase(repo)
}

func CreateProject(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var input dto.CreateProjectInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "dados inválidos", http.StatusBadRequest)
		return
	}

	userID := uuid.MustParse("11111111-1111-1111-1111-111111111111")
	project, err := projectUseCase().Create(userID, input.Prefix, input.Name, input.Description, input.Status)
	if err != nil {
		switch {
		case errors.Is(err, domainProject.ErrNameRequired), errors.Is(err, domainProject.ErrPrefixRequired):
			http.Error(w, err.Error(), http.StatusBadRequest)
		default:
			http.Error(w, "erro ao criar projeto", http.StatusInternalServerError)
		}
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(project)
}

func GetProjects(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	projects, err := projectUseCase().List()
	if err != nil {
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

	userID := uuid.MustParse("11111111-1111-1111-1111-111111111111")
	project, err := projectUseCase().GetByID(id, userID)
	if err != nil {
		if errors.Is(err, appProject.ErrProjectNotFound) {
			http.Error(w, "projeto não encontrado", http.StatusNotFound)
			return
		}
		http.Error(w, "erro ao buscar projeto", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(project)
}

func DeleteProject(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := uuid.Parse(params["id"])
	if err != nil {
		http.Error(w, "id inválido", http.StatusBadRequest)
		return
	}

	userID := uuid.MustParse("11111111-1111-1111-1111-111111111111")
	if err := projectUseCase().DeleteByID(id, userID); err != nil {
		if errors.Is(err, appProject.ErrProjectNotFound) {
			http.Error(w, "projeto não encontrado", http.StatusNotFound)
			return
		}
		http.Error(w, "erro ao deletar projeto", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func UpdateProject(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id, err := uuid.Parse(params["id"])
	if err != nil {
		http.Error(w, "id inválido", http.StatusBadRequest)
		return
	}

	var input dto.UpdateProjectInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "dados inválidos", http.StatusBadRequest)
		return
	}

	userID := uuid.MustParse("11111111-1111-1111-1111-111111111111")
	project, err := projectUseCase().Update(id, userID, input.Name, input.Description, input.Status)
	if err != nil {
		if errors.Is(err, appProject.ErrProjectNotFound) {
			http.Error(w, "projeto não encontrado", http.StatusNotFound)
			return
		}
		http.Error(w, "erro ao atualizar projeto", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(project)
}
