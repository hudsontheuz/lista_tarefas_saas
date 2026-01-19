import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Switch,
  Button,
  Input,
} from "@material-tailwind/react";

export function Settings() {
  return (
    <div className="mt-12 max-w-5xl space-y-8">
      {/* HEADER */}
      <div>
        <Typography variant="h4" color="blue-gray">
          Configurações da conta
        </Typography>
        <Typography className="text-blue-gray-600">
          Gerencie seu perfil, preferências e segurança.
        </Typography>
      </div>

      {/* PROFILE */}
      <Card className="border border-blue-gray-100 shadow-sm">
        <CardBody className="space-y-6">
          <Typography variant="h6">Perfil</Typography>

          <div className="flex items-center gap-6">
            <Avatar
              src="/img/avatar.png"
              alt="user avatar"
              size="xl"
              variant="rounded"
            />

            <div className="flex flex-col gap-2">
              <Typography variant="h6">Hudson França</Typography>
              <Typography className="text-blue-gray-600">
                hudson@email.com
              </Typography>
              <Button size="sm" variant="outlined">
                Alterar avatar
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Nome" defaultValue="Hudson França" />
            <Input label="Email" defaultValue="hudson@email.com" />
          </div>

          <Button color="blue">Salvar alterações</Button>
        </CardBody>
      </Card>

      {/* PREFERENCES */}
      <Card className="border border-blue-gray-100 shadow-sm">
        <CardBody className="space-y-6">
          <Typography variant="h6">Preferências</Typography>

          <div className="flex items-center justify-between">
            <div>
              <Typography>Notificações por email</Typography>
              <Typography className="text-sm text-blue-gray-500">
                Receber avisos sobre tarefas e projetos
              </Typography>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Typography>Modo escuro</Typography>
              <Typography className="text-sm text-blue-gray-500">
                Interface com tema escuro
              </Typography>
            </div>
            <Switch />
          </div>
        </CardBody>
      </Card>

      {/* SECURITY */}
      <Card className="border border-blue-gray-100 shadow-sm">
        <CardBody className="space-y-6">
          <Typography variant="h6">Segurança</Typography>

          <div className="grid gap-4 md:grid-cols-2">
            <Input type="password" label="Senha atual" />
            <Input type="password" label="Nova senha" />
          </div>

          <Button variant="outlined" color="blue-gray">
            Alterar senha
          </Button>
        </CardBody>
      </Card>

      {/* DANGER ZONE */}
      <Card className="border border-red-200 bg-red-50 shadow-sm">
        <CardBody className="space-y-4">
          <Typography variant="h6" color="red">
            Zona de risco
          </Typography>

          <Typography className="text-sm text-red-600">
            Essa ação é irreversível. Todos os seus dados serão apagados.
          </Typography>

          <Button color="red">Excluir conta</Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default Settings;
