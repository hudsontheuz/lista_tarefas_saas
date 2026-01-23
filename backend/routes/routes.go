package routes

import (
	"log"
	"net/http"
	"github.com/hudsontheuz/lista_tarefas_saas/controllers"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func CarregaRotas() {
	router := mux.NewRouter()

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("API TaskFrança rodando 🚀"))
	}).Methods("GET")
	// Users
	router.HandleFunc("/users", controllers.CreateUser).Methods("POST")
	router.HandleFunc("/users/{id}", controllers.GetUserByID).Methods("GET")

	// Tasks
	router.HandleFunc("/tasks", controllers.CreateTask).Methods("POST")
	router.HandleFunc("/tasks", controllers.GetTasks).Methods("GET")

	// Projects
	router.HandleFunc("/projects", controllers.CreateProject).Methods("POST")
	router.HandleFunc("/projects", controllers.GetProjects).Methods("GET")
	router.HandleFunc("/projects/{id}", controllers.GetProjectByID).Methods("GET")



	log.Fatal(
		http.ListenAndServe(
			":8000",
			handlers.CORS(
				handlers.AllowedOrigins([]string{"http://localhost:5173"}),
				handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),
				handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
			)(router),
		),
	)
}
