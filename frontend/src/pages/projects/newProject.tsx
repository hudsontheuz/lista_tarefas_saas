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
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

type NewProjectForm = {
  name: string;
  description: string;
  status: string;
  prefix: string;
};

export function NewProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState<NewProjectForm>({
    name: "",
    description: "",
    status: "active",
    prefix: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    try {
      await api.post("/projects", {
        name: form.name,
        description: form.description,
        status: form.status,
        prefix: form.prefix, // 🔥 NOVA REGRA
      });

      navigate("/dashboard/projects");
    } catch (error) {
      console.error("Erro ao criar projeto", error);
    }
  }

  return (
    <div className="mt-12 flex justify-center">
      <Card className="w-full max-w-2xl border border-blue-gray-100 shadow-sm">
        <CardBody className="flex flex-col gap-6">
          <div>
            <Typography variant="h4" color="blue-gray">
              Novo Projeto
            </Typography>
            <Typography className="text-blue-gray-600">
              Crie um projeto para organizar suas tarefas.
            </Typography>
          </div>

          {/* PREFIXO */}
          <Input
            label="Prefixo do projeto (ex: DEV, APP)"
            name="prefix"
            value={form.prefix}
            onChange={handleChange}
            required
            maxLength={5}
          />

          <Input
            label="Nome do projeto"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <Textarea
            label="Descrição"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <Select
            label="Status"
            value={form.status}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, status: value || "active" }))
            }
          >
            <Option value="active">Ativo</Option>
            <Option value="paused">Pausado</Option>
            <Option value="completed">Concluído</Option>
          </Select>

          <div className="flex justify-end gap-3">
            <Button variant="outlined" color="blue-gray">
              Cancelar
            </Button>
            <Button color="blue" onClick={handleSubmit}>
              Criar Projeto
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default NewProject;
