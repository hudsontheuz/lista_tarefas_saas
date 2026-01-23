package main

import (
	"log"

	"github.com/hudsontheuz/lista_tarefas_saas/db"
	"github.com/hudsontheuz/lista_tarefas_saas/routes"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Erro ao carregar o arquivo .env")
	}

	db.ConectaComBancoDeDados()

	routes.CarregaRotas()
}
