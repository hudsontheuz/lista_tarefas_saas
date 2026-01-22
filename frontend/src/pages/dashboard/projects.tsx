import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Progress,
  Chip,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    id: 1,
    name: "TaskFrança Web",
    description: "Frontend do sistema TaskFrança",
    progress: 70,
    status: "Em andamento",
  },
  {
    id: 2,
    name: "API TaskFrança",
    description: "Backend em Go com PostgreSQL",
    progress: 40,
    status: "Em andamento",
  },
  {
    id: 3,
    name: "Landing Page",
    description: "Página institucional do produto",
    progress: 100,
    status: "Concluído",
  },
];

export function Projects(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="mt-12 max-w-6xl space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h4" color="blue-gray">
            Projetos
          </Typography>
          <Typography className="text-blue-gray-600">
            Gerencie todos os seus projetos em um só lugar
          </Typography>
        </div>

        {/* 🔗 MESMO BOTÃO DO HOME */}
        <Button
          color="blue"
          className="flex items-center gap-2"
          onClick={() => navigate("/dashboard/projects/newProject")}
        >
          <PlusIcon className="h-5 w-5" />
          Novo projeto
        </Button>
      </div>

      {/* PROJECT LIST */}
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
                  value={project.status}
                  color={project.progress === 100 ? "green" : "blue"}
                  size="sm"
                />
              </div>
            </CardHeader>

            <CardBody className="space-y-4">
              <Typography className="text-sm text-blue-gray-600">
                {project.description}
              </Typography>

              <div>
                <div className="mb-1 flex justify-between">
                  <Typography className="text-sm text-blue-gray-500">
                    Progresso
                  </Typography>
                  <Typography className="text-sm text-blue-gray-500">
                    {project.progress}%
                  </Typography>
                </div>

                <Progress
                  value={project.progress}
                  color={project.progress === 100 ? "green" : "blue"}
                  className="h-2"
                />
              </div>

              <Button variant="outlined" size="sm" fullWidth>
                Abrir projeto
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Projects;
