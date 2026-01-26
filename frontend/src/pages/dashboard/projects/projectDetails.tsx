import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  Typography,
  Spinner,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Tooltip,
} from "@material-tailwind/react";
import {
  ArrowLeftIcon,
  PlusIcon,
  TagIcon,
  CheckCircleIcon,
  ArchiveBoxIcon,
  ChartBarIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import api from "@/services/api";

type Project = {
  id: string;
  name: string;
  description: string;
  tag: string;
  status: "active" | "archived" | "done";
};

// Dados mockados para demonstração
const mockStats = {
  totalTasks: 24,
  completedTasks: 18,
  pendingTasks: 6,
  members: 4,
};

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    async function loadProject() {
      try {
        const response = await api.get<Project>(`/projects/${projectId}`);
        setProject(response.data);
      } catch {
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  const getStatusConfig = (status: Project["status"]) => {
    switch (status) {
      case "done":
        return {
          label: "Concluído",
          bgColor: "bg-emerald-50",
          textColor: "text-emerald-700",
          borderColor: "border-emerald-200",
          dotColor: "bg-emerald-500",
          icon: CheckCircleIcon,
        };
      case "archived":
        return {
          label: "Arquivado",
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          borderColor: "border-gray-200",
          dotColor: "bg-gray-500",
          icon: ArchiveBoxIcon,
        };
      default:
        return {
          label: "Ativo",
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          borderColor: "border-blue-200",
          dotColor: "bg-blue-500",
          icon: ChartBarIcon,
        };
    }
  };

  async function handleDeleteProject() {
    if (!project) return;

    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este projeto?"
    );

    if (!confirmDelete) return;

    try {
      setActionLoading(true);
      await api.delete(`/projects/${project.id}`);
      navigate("/dashboard/projects");
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="text-center space-y-4">
          <Spinner className="h-12 w-12 mx-auto text-blue-500" />
          <Typography className="text-gray-500">Carregando projeto...</Typography>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-4">
        <Card className="max-w-md w-full border-0 shadow-xl">
          <CardBody className="text-center space-y-6 py-12">
            <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center">
              <ArchiveBoxIcon className="h-10 w-10 text-red-500" />
            </div>
            <div className="space-y-2">
              <Typography variant="h5" className="text-gray-900">
                Projeto não encontrado
              </Typography>
              <Typography className="text-gray-500">
                O projeto não existe ou foi removido.
              </Typography>
            </div>
            <Button
              onClick={() => navigate("/dashboard/projects")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl"
            >
              Voltar aos projetos
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  const statusConfig = getStatusConfig(project.status);
  const progressPercentage = Math.round(
    (mockStats.completedTasks / mockStats.totalTasks) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Voltar aos projetos</span>
        </button>

        {/* Main Header Card */}
        <Card className="border-0 shadow-xl shadow-gray-200/50 overflow-hidden">
          {/* Gradient Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-8 py-10">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-20 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />

            <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="space-y-4">
                {/* Status & Tag */}
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white`}
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    {statusConfig.label}
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white">
                    <TagIcon className="h-4 w-4" />
                    {project.tag}
                  </span>
                </div>

                {/* Title */}
                <Typography variant="h2" className="text-white font-bold">
                  {project.name}
                </Typography>

                {/* Description */}
                <Typography className="text-blue-100 max-w-2xl">
                  {project.description}
                </Typography>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Menu>
                  <MenuHandler>
                    <IconButton
                      variant="text"
                      className="bg-white/10 hover:bg-white/20 text-white rounded-xl"
                      disabled={actionLoading}
                    >
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </IconButton>
                  </MenuHandler>
                  <MenuList className="border-0 shadow-xl rounded-xl">
                    <MenuItem className="flex items-center gap-3 py-3 hover:bg-gray-50 rounded-lg"
                     onClick={() => navigate(`/dashboard/projects/${project.id}/editProject`)}>
                      <PencilIcon className="h-4 w-4 text-gray-500" />
                      <span>Editar projeto</span>
                    </MenuItem>
                    <MenuItem className="flex items-center gap-3 py-3 hover:bg-gray-50 rounded-lg">
                      <ShareIcon className="h-4 w-4 text-gray-500" />
                      <span>Compartilhar</span>
                    </MenuItem>
                    <MenuItem className="flex items-center gap-3 py-3 hover:bg-gray-50 rounded-lg">
                      <ArchiveBoxIcon className="h-4 w-4 text-gray-500" />
                      <span>Arquivar</span>
                    </MenuItem>
                    <hr className="my-2 border-gray-100" />
                    <MenuItem
                      className="flex items-center gap-3 py-3 hover:bg-red-50 rounded-lg text-red-500"
                      onClick={handleDeleteProject}
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span>Excluir projeto</span>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <CardBody className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {/* Progress */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <BoltIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    Progresso
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {progressPercentage}%
                  </span>
                </div>
                <div className="mt-3 h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Total Tasks */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <ClipboardDocumentListIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    Tarefas
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {mockStats.totalTasks}
                  </span>
                  <span className="text-sm text-gray-500 mb-1">total</span>
                </div>
              </div>

              {/* Completed */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-100 rounded-xl">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    Concluídas
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {mockStats.completedTasks}
                  </span>
                  <span className="text-sm text-emerald-600 mb-1">
                    <SparklesIcon className="h-4 w-4 inline" />
                  </span>
                </div>
              </div>

              {/* Team */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 rounded-xl">
                    <UserGroupIcon className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    Membros
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {mockStats.members}
                  </span>
                  <span className="text-sm text-gray-500 mb-1">pessoas</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() =>
                  navigate(`/dashboard/projects/${project.id}/tasks/new`)
                }
                disabled={actionLoading}
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Nova Tarefa
              </Button>

              <Button
                size="lg"
                variant="outlined"
                className="flex-1 sm:flex-none rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <CalendarDaysIcon className="h-5 w-5" />
                Ver Timeline
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Tasks Section Placeholder */}
        <Card className="border-0 shadow-xl shadow-gray-200/50">
          <CardBody className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Typography variant="h5" className="text-gray-900">
                  Tarefas Recentes
                </Typography>
                <Typography className="text-gray-500 text-sm">
                  Últimas atividades do projeto
                </Typography>
              </div>
              <Button variant="text" className="text-blue-600">
                Ver todas
              </Button>
            </div>

            {/* Empty State */}
            <div className="text-center py-12 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
              <ClipboardDocumentListIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <Typography className="text-gray-500 mb-2">
                Nenhuma tarefa criada ainda
              </Typography>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg"
                onClick={() =>
                  navigate(`/dashboard/projects/${project.id}/tasks/new`)
                }
              >
                Criar primeira tarefa
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}