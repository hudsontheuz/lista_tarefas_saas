import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { projectsTableData } from "@/data";

// 🔹 Mock de tarefas (frontend only)
const tasks = [
  {
    id: 1,
    title: "Criar layout do dashboard",
    project: "TaskFrança",
    priority: "High",
    dueDate: "2026-01-20",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Migrar projeto para TypeScript",
    project: "TaskFrança",
    priority: "Medium",
    dueDate: "2026-01-25",
    status: "Pending",
  },
  {
    id: 3,
    title: "Definir modelo do backend",
    project: "API",
    priority: "Low",
    dueDate: "2026-02-01",
    status: "Pending",
  },
];

export function Tasks() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* TASKS TABLE */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Tasks
          </Typography>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["task", "project", "priority", "due date", "status", ""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {tasks.map((task, key) => {
                const className = `py-3 px-5 ${
                  key === tasks.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={task.id}>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {task.title}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography className="text-xs text-blue-gray-600">
                        {task.project}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Chip
                        value={task.priority}
                        color={
                          task.priority === "High"
                            ? "red"
                            : task.priority === "Medium"
                            ? "amber"
                            : "green"
                        }
                        className="w-fit"
                      />
                    </td>

                    <td className={className}>
                      <Typography className="text-xs text-blue-gray-600">
                        {task.dueDate}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Chip
                        value={task.status}
                        color={
                          task.status === "In Progress" ? "blue" : "gray"
                        }
                        className="w-fit"
                      />
                    </td>

                    <td className={className}>
                      <EllipsisVerticalIcon className="h-5 w-5 cursor-pointer text-blue-gray-500" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* PROJECTS TABLE (pode remover depois) */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Projects
          </Typography>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <tbody>
              {projectsTableData.map(
                ({ name, budget, completion }, key) => (
                  <tr key={name}>
                    <td className="py-3 px-5">
                      <Typography className="text-sm font-medium">
                        {name}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <Typography className="text-sm">{budget}</Typography>
                    </td>
                    <td className="py-3 px-5">
                      <Progress
                        value={completion}
                        color={completion === 100 ? "green" : "blue"}
                        className="h-1"
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tasks;
