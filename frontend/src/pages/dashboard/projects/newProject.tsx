import { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Textarea,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  FolderPlusIcon,
  DocumentTextIcon,
  TagIcon,
  SparklesIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

type NewProjectForm = {
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

export function NewProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState<NewProjectForm>({
    name: "",
    description: "",
    status: "active",
    prefix: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await api.post("/projects", {
        name: form.name,
        description: form.description,
        status: form.status,
        prefix: form.prefix,
      });
      navigate("/dashboard/projects");
    } catch (error) {
      console.error("Erro ao criar projeto", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isFormValid = form.name.trim() && form.prefix.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Voltar aos projetos</span>
        </button>

        <Card className="border-0 shadow-xl shadow-gray-200/50 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-8 py-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <FolderPlusIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <Typography variant="h4" className="text-white font-bold">
                  Novo Projeto
                </Typography>
                <Typography className="text-blue-100 mt-1">
                  Crie um projeto para organizar suas tarefas
                </Typography>
              </div>
            </div>
          </div>

          <CardBody className="p-8 space-y-8">
            {/* Prefix Input with Preview */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <TagIcon className="h-4 w-4 text-blue-500" />
                Prefixo do Projeto
              </label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    size="lg"
                    placeholder="Ex: DEV, APP, WEB"
                    name="prefix"
                    value={form.prefix}
                    onChange={handlePrefixChange}
                    maxLength={5}
                    className="!border-gray-200 focus:!border-blue-500 rounded-xl"
                    labelProps={{ className: "hidden" }}
                    containerProps={{ className: "min-w-0" }}
                  />
                </div>
                {form.prefix && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <span className="text-xs text-gray-500">Preview:</span>
                    <span className="font-mono font-bold text-blue-600">
                      {form.prefix}-001
                    </span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400">
                Apenas letras, máximo 5 caracteres
              </p>
            </div>

            {/* Project Name */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <DocumentTextIcon className="h-4 w-4 text-blue-500" />
                Nome do Projeto
              </label>
              <Input
                size="lg"
                placeholder="Digite o nome do seu projeto"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="!border-gray-200 focus:!border-blue-500 rounded-xl"
                labelProps={{ className: "hidden" }}
              />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <SparklesIcon className="h-4 w-4 text-blue-500" />
                Descrição
                <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <Textarea
                size="lg"
                placeholder="Descreva o objetivo do projeto..."
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="!border-gray-200 focus:!border-blue-500 rounded-xl resize-none"
                labelProps={{ className: "hidden" }}
              />
            </div>

            {/* Status Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">
                Status Inicial
              </label>
              <div className="grid grid-cols-3 gap-3">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, status: option.value }))
                    }
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                      form.status === option.value
                        ? "border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-100"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {form.status === option.value && (
                      <CheckCircleIcon className="absolute top-2 right-2 h-5 w-5 text-blue-500" />
                    )}
                    <div
                      className={`w-3 h-3 rounded-full ${option.color} mb-2`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        form.status === option.value
                          ? "text-blue-700"
                          : "text-gray-600"
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="text"
                color="gray"
                onClick={() => navigate("/dashboard/projects")}
                className="rounded-xl px-6"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className={`rounded-xl px-8 flex items-center gap-2 ${
                  isFormValid
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300"
                    : "bg-gray-300"
                } transition-all duration-300`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Criando...
                  </>
                ) : (
                  <>
                    <FolderPlusIcon className="h-5 w-5" />
                    Criar Projeto
                  </>
                )}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default NewProject;