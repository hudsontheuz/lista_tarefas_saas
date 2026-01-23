import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

type Project = {
  id: string;
  name: string;
  description: string;
  status: "active" | "archived" | "done";
};

export function Projects(): JSX.Element {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await api.get<Project[]>("/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Erro ao buscar projetos", error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  function getStatusColor(status: Project["status"]) {
    switch (status) {
      case "done":
        return "green";
      case "archived":
        return "gray";
      default:
        return "blue";
    }
  }

  function getStatusLabel(status: Project["status"]) {
    switch (status) {
      case "done":
        return "Concluído";
      case "archived":
        return "Arquivado";
      default:
        return "Ativo";
    }
  }

  return (
    <div className="mt-12 max-w-6xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h4" color="blue-gray">
            Projetos
          </Typography>
          <Typography className="text-blue-gray-600">
            Gerencie todos os seus projetos em um só lugar
          </Typography>
        </div>

        <Button
          color="blue"
          className="flex items-center gap-2"
          onClick={() => navigate("/dashboard/projects/newProject")}
        >
          <PlusIcon className="h-5 w-5" />
          Novo projeto
        </Button>
      </div>

      {loading && (
        <Typography className="text-blue-gray-500">
          Carregando projetos...
        </Typography>
      )}

      {!loading && projects.length === 0 && (
        <Typography className="text-blue-gray-500">
          Nenhum projeto encontrado.
        </Typography>
      )}

      {!loading && projects.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="border border-blue-gray-100 shadow-sm"
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="p-4"
              >
                <div className="flex items-center justify-between">
                  <Typography variant="h6" color="blue-gray">
                    {project.name}
                  </Typography>

                  <Chip
                    value={getStatusLabel(project.status)}
                    color={getStatusColor(project.status)}
                    size="sm"
                  />
                </div>
              </CardHeader>

              <CardBody className="space-y-4">
                <Typography className="text-sm text-blue-gray-600">
                  {project.description}
                </Typography>

                <Button
                  variant="outlined"
                  size="sm"
                  fullWidth
                  onClick={() =>
                    navigate(`/dashboard/projects/${project.id}/tasks/new`)
                  }
                >
                  Abrir projeto
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
