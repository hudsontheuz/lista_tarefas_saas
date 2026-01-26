import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";
import {
  FolderIcon,
  DocumentTextIcon,
  TagIcon,
  SparklesIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/services/api";

type EditProjectForm = {
  name: string;
  description: string;
  status: string;
  prefix: string;
};

const statusOptions = [
  { value: "active", label: "Ativo", color: "bg-emerald-500" },
  { value: "paused", label: "Pausado", color: "bg-amber-500" },
  { value: "completed", label: "Concluído", color: "bg-blue-500" },
];

export function EditProject() {
  const { projectId } = useParams<{ projectId: string }>();

  const navigate = useNavigate();

  const [form, setForm] = useState<EditProjectForm>({
    name: "",
    description: "",
    status: "active",
    prefix: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔹 Busca o projeto
  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await api.get(`/projects/${projectId}`);
        setForm({
          name: response.data.name,
          description: response.data.description ?? "",
          status: response.data.status,
          prefix: response.data.prefix ?? "",
        });
      } catch (error) {
        console.error("Erro ao carregar projeto", error);
        navigate("/dashboard/projects");
      } finally {
        setIsLoading(false);
      }
    }

    if (projectId ) fetchProject();
  }, [projectId , navigate]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handlePrefixChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (!/^[a-zA-Z]*$/.test(value)) return;

    setForm((prev) => ({
      ...prev,
      prefix: value.toUpperCase(),
    }));
  }

  async function handleSubmit() {
    try {
      setIsSubmitting(true);
      await api.put(`/projects/${projectId}`, form);
      navigate("/dashboard/projects");
    } catch (error) {
      console.error("Erro ao atualizar projeto", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography className="text-gray-500">Carregando projeto...</Typography>
      </div>
    );
  }

  const isFormValid = form.name.trim() && form.prefix.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Voltar */}
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Voltar aos projetos</span>
        </button>

        <Card className="border-0 shadow-xl shadow-gray-200/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <FolderIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <Typography variant="h4" className="text-white font-bold">
                  Editar Projeto
                </Typography>
                <Typography className="text-blue-100 mt-1">
                  Atualize as informações do projeto
                </Typography>
              </div>
            </div>
          </div>

          <CardBody className="p-8 space-y-8">
            {/* Prefixo */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <TagIcon className="h-4 w-4 text-blue-500" />
                Prefixo
              </label>
              <Input
                size="lg"
                name="prefix"
                value={form.prefix}
                onChange={handlePrefixChange}
                maxLength={5}
                className="!border-gray-200 rounded-xl"
                labelProps={{ className: "hidden" }}
              />
            </div>

            {/* Nome */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <DocumentTextIcon className="h-4 w-4 text-blue-500" />
                Nome
              </label>
              <Input
                size="lg"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="!border-gray-200 rounded-xl"
                labelProps={{ className: "hidden" }}
              />
            </div>

            {/* Descrição */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <SparklesIcon className="h-4 w-4 text-blue-500" />
                Descrição
              </label>
              <Textarea
                rows={4}
                name="description"
                value={form.description}
                onChange={handleChange}
                className="!border-gray-200 rounded-xl resize-none"
                labelProps={{ className: "hidden" }}
              />
            </div>

            {/* Status */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">
                Status
              </label>
              <div className="grid grid-cols-3 gap-3">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, status: option.value }))
                    }
                    className={`relative p-4 rounded-xl border-2 ${
                      form.status === option.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    {form.status === option.value && (
                      <CheckCircleIcon className="absolute top-2 right-2 h-5 w-5 text-blue-500" />
                    )}
                    <div
                      className={`w-3 h-3 rounded-full ${option.color} mb-2`}
                    />
                    <span className="text-sm font-medium">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ações */}
            <div className="flex justify-end gap-3">
              <Button
                variant="text"
                onClick={() => navigate("/dashboard/projects")}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default EditProject;
