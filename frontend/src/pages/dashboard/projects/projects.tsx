import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FolderIcon,
  CheckCircleIcon,
  PauseCircleIcon,
  ChartBarIcon,
  ArrowRightIcon,
  SparklesIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

type Project = {
  id: string;
  name: string;
  description: string;
  tag: string;
  status: "active" | "paused" | "completed";
  tasksCount?: number;
  completedTasks?: number;
};

const statusConfig = {
  active: {
    label: "Ativo",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    icon: ChartBarIcon,
  },
  paused: {
    label: "Pausado",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
    icon: PauseCircleIcon,
  },
  completed: {
    label: "Concluído",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-500",
    icon: CheckCircleIcon,
  },
};

export function Projects(): JSX.Element {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    completed: projects.filter((p) => p.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-200">
                <FolderIcon className="h-6 w-6 text-white" />
              </div>
              <Typography variant="h3" className="text-gray-900 font-bold">
                Projetos
              </Typography>
            </div>
            <Typography className="text-gray-500 max-w-md">
              Gerencie todos os seus projetos em um só lugar. Organize tarefas e
              acompanhe o progresso.
            </Typography>
          </div>

          <Button
            size="lg"
            onClick={() => navigate("/dashboard/projects/newProject")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 flex items-center gap-2 w-full lg:w-auto justify-center"
          >
            <PlusIcon className="h-5 w-5" />
            Novo Projeto
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total de Projetos</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-xl">
                <FolderIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Ativos</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {stats.active}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <ChartBarIcon className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Concluídos</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.completed}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <CheckCircleIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Squares2X2Icon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <ListBulletIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
              <Typography className="text-gray-500">
                Carregando projetos...
              </Typography>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <Card className="border-0 shadow-xl">
            <CardBody className="py-16 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6">
                <SparklesIcon className="h-10 w-10 text-blue-500" />
              </div>
              <Typography variant="h5" className="text-gray-900 mb-2">
                Nenhum projeto ainda
              </Typography>
              <Typography className="text-gray-500 mb-6 max-w-sm mx-auto">
                Comece criando seu primeiro projeto para organizar suas tarefas
                de forma eficiente.
              </Typography>
              <Button
                onClick={() => navigate("/dashboard/projects/newProject")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Criar Primeiro Projeto
              </Button>
            </CardBody>
          </Card>
        )}

        {/* No Results */}
        {!loading && projects.length > 0 && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <Typography className="text-gray-500">
              Nenhum projeto encontrado para "{searchQuery}"
            </Typography>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && filteredProjects.length > 0 && (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                : "flex flex-col gap-4"
            }
          >
            {filteredProjects.map((project) => {
              const config = statusConfig[project.status];
              const StatusIcon = config.icon;
              const progress = project.tasksCount
                ? Math.round(
                    ((project.completedTasks || 0) / project.tasksCount) * 100
                  )
                : 0;

              return viewMode === "grid" ? (
                // Grid Card
                <Card
                  key={project.id}
                  className="group border-0 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-gray-200 transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                >
                  {/* Colored top bar */}
                  <div
                    className={`h-1.5 ${config.dot.replace("bg-", "bg-gradient-to-r from-")} ${
                      project.status === "active"
                        ? "to-emerald-400"
                        : project.status === "paused"
                        ? "to-amber-400"
                        : "to-blue-400"
                    }`}
                  />

                  <CardBody className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-xl ${config.bg} ${config.border} border`}
                        >
                          <StatusIcon className={`h-5 w-5 ${config.color}`} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {project.tag}
                          </span>
                          <Typography
                            variant="h6"
                            className="text-gray-900 font-bold line-clamp-1"
                          >
                            {project.name}
                          </Typography>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} ${config.border} border`}
                      >
                        {config.label}
                      </span>
                    </div>

                    {/* Description */}
                    <Typography className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
                      {project.description || "Sem descrição"}
                    </Typography>

                    {/* Progress (if has tasks) */}
                    {project.tasksCount && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Progresso</span>
                          <span className="font-semibold text-gray-700">
                            {progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              config.dot.replace("bg-", "bg-gradient-to-r from-")
                            } ${
                              project.status === "active"
                                ? "to-emerald-400"
                                : project.status === "paused"
                                ? "to-amber-400"
                                : "to-blue-400"
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action */}
                    <div className="pt-2">
                      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all group-hover:border-blue-200 group-hover:text-blue-600 group-hover:bg-blue-50">
                        Abrir projeto
                        <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </CardBody>
                </Card>
              ) : (
                // List Item
                <Card
                  key={project.id}
                  className="group border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                >
                  <CardBody className="p-4 flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${config.bg} ${config.border} border shrink-0`}
                    >
                      <StatusIcon className={`h-6 w-6 ${config.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          {project.tag}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span
                          className={`text-xs font-medium ${config.color}`}
                        >
                          {config.label}
                        </span>
                      </div>
                      <Typography
                        variant="h6"
                        className="text-gray-900 font-bold truncate"
                      >
                        {project.name}
                      </Typography>
                      <Typography className="text-sm text-gray-500 truncate">
                        {project.description || "Sem descrição"}
                      </Typography>
                    </div>

                    <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0" />
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;