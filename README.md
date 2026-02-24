# Lista de Tarefas SaaS (projeto de estudo)

Este repositório **não nasceu como produto pronto para produção**.
A proposta principal foi usar uma ideia de "SaaS de tarefas" como laboratório para **aprofundar aprendizado de APIs**, integração frontend/backend e modelagem básica com banco relacional.

## Objetivo real do projeto

O foco aqui foi praticar:

- criação de endpoints REST em Go;
- organização em camadas simples (routes, controllers, dto, models);
- uso de GORM com PostgreSQL e migrations automáticas;
- consumo de API via frontend React (Vite);
- fluxo CRUD básico para projetos e tarefas.

Em resumo: este projeto existe mais como **ambiente de treino técnico** do que como aplicação comercial final.

## Stack utilizada

### Backend
- Go
- Gorilla Mux
- GORM
- PostgreSQL
- godotenv

### Frontend
- React + Vite
- TypeScript (parcial)
- Material Tailwind
- Axios

### Infra
- Docker Compose (PostgreSQL)

## Estrutura do repositório

```text
backend/   -> API em Go
frontend/  -> aplicação React
```

## Funcionalidades implementadas

### API
- Healthcheck: `GET /`
- Usuários:
  - `POST /users`
  - `GET /users/{id}`
- Tarefas:
  - `POST /tasks`
  - `GET /tasks`
- Projetos:
  - `POST /projects`
  - `GET /projects`
  - `GET /projects/{id}`
  - `PUT /projects/{id}`
  - `DELETE /projects/{id}`

### Frontend
- páginas de autenticação (layout/base)
- dashboard com listagem/gestão de projetos e tarefas
- consumo dos endpoints via serviço de API

## Limitações atuais (sendo sincero)

Como é um projeto de aprendizado, ainda há pontos que mostram isso claramente:

- autenticação/autorização ainda não está madura para cenário real;
- parte dos endpoints usa regras simplificadas (ex.: `userID` fixo em operações de projeto);
- validações e tratamento de erros podem evoluir;
- falta suíte de testes automatizados mais completa;
- ausência de preocupações de produção (observabilidade, segurança mais robusta, CI/CD, etc.).

## Como rodar localmente

## 1) Subir o banco (PostgreSQL)

Na raiz do projeto:

```bash
docker compose up -d
```

Isso sobe um PostgreSQL com:

- host: `localhost`
- porta: `5433`
- database: `taskfranca`
- user: `taskfranca`
- password: `Famoso3capa`

## 2) Configurar o backend

Crie `backend/.env` (exemplo):

```env
DB_HOST=localhost
DB_PORT=5433
DB_USER=taskfranca
DB_PASSWORD=Famoso3capa
DB_NAME=taskfranca
```

> Alternativamente, você pode usar `DATABASE_URL`.

Rodar backend:

```bash
cd backend
go run main.go
```

API disponível em `http://localhost:8000`.

## 3) Rodar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend disponível em `http://localhost:5173`.

## Próximos passos sugeridos

Se quiser evoluir esse estudo para algo mais próximo de produção:

- implementar autenticação JWT e controle de acesso por usuário real;
- adicionar testes (unitários + integração);
- padronizar respostas de erro e validações;
- adicionar logs estruturados e monitoramento;
- criar pipeline CI para lint/test/build;
- documentar endpoints com OpenAPI/Swagger.

---

Se você chegou aqui para avaliar o projeto: pode considerar este repo como um **diário prático de aprendizado de APIs**, usando um domínio de tarefas para tornar os experimentos mais concretos.
