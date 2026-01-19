import { Task } from "@/types/task";
import { Project } from "@/types/project";

export const tasks: Task[] = [
  { id: "1", title: "Criar landing page", status: "open", dueDate: "2026-01-18" },
  { id: "2", title: "Configurar CI", status: "done", dueDate: "2026-01-10" },
  { id: "3", title: "Modelar banco", status: "late", dueDate: "2026-01-12" },
];

export const projects: Project[] = [
  { id: "1", name: "SaaS Tasks", active: true },
  { id: "2", name: "Site institucional", active: false },
];
