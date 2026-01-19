import {
  Card,
  CardBody,
  Typography,
  Button,
  Progress,
} from "@material-tailwind/react";
import {
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export function Home() {
  return (
    <div className="mt-12 space-y-12">
      <section className="flex flex-col gap-4 rounded-xl border border-blue-gray-100 bg-white p-8 shadow-sm">
        <Typography variant="h3" color="blue-gray">
          Organize seus projetos sem dor de cabeça
        </Typography>

        <Typography className="max-w-2xl text-blue-gray-600">
          O <strong>TaskFrança</strong> é um SaaS simples e direto para você
          gerenciar tarefas, acompanhar progresso e manter tudo sob controle —
          sozinho ou em equipe.
        </Typography>

        <div className="flex gap-4">
          <Button color="blue" size="lg">
            Criar novo projeto
          </Button>
          <Button variant="outlined" color="blue-gray" size="lg">
            Ver tarefas
          </Button>
        </div>
      </section>
      
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardBody className="flex flex-col gap-4">
            <CheckCircleIcon className="h-8 w-8 text-blue-500" />
            <Typography variant="h5">Organização clara</Typography>
            <Typography className="text-blue-gray-600">
              Centralize todas as suas tarefas em um só lugar, com prioridades e
              status bem definidos.
            </Typography>
          </CardBody>
        </Card>

        <Card className="border border-blue-gray-100 shadow-sm">
          <CardBody className="flex flex-col gap-4">
            <ClockIcon className="h-8 w-8 text-green-500" />
            <Typography variant="h5">Mais produtividade</Typography>
            <Typography className="text-blue-gray-600">
              Acompanhe prazos, evite atrasos e mantenha o foco no que realmente
              importa.
            </Typography>
          </CardBody>
        </Card>

        <Card className="border border-blue-gray-100 shadow-sm">
          <CardBody className="flex flex-col gap-4">
            <UserGroupIcon className="h-8 w-8 text-purple-500" />
            <Typography variant="h5">Trabalho em equipe</Typography>
            <Typography className="text-blue-gray-600">
              Compartilhe projetos, delegue tarefas e acompanhe o progresso do
              time.
            </Typography>
          </CardBody>
        </Card>
      </section>

      {/* STATUS / PREVIEW (mockado por enquanto) */}
      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardBody className="flex flex-col gap-6">
            <Typography variant="h6">Resumo do seu progresso</Typography>

            <div>
              <div className="flex justify-between">
                <Typography variant="small">Tarefas concluídas</Typography>
                <Typography variant="small">70%</Typography>
              </div>
              <Progress value={70} color="green" className="h-2" />
            </div>

            <div>
              <div className="flex justify-between">
                <Typography variant="small">Projetos ativos</Typography>
                <Typography variant="small">3 / 5</Typography>
              </div>
              <Progress value={60} color="blue" className="h-2" />
            </div>
          </CardBody>
        </Card>

        <Card className="border border-blue-gray-100 shadow-sm">
          <CardBody className="flex flex-col justify-between gap-6">
            <div>
              <Typography variant="h6">Próximo passo</Typography>
              <Typography className="text-blue-gray-600">
                Crie seu primeiro projeto e comece a organizar suas tarefas.
              </Typography>
            </div>
            <Button fullWidth color="blue">
              Novo projeto
            </Button>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

export default Home;
