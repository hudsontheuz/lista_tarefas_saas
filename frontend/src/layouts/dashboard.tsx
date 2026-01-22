// src/layouts/dashboard.tsx
import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";

import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";

import routes from "@/routes";
import NewProject from "@/pages/projects/newProject";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
} from "@/context";

export function Dashboard(): JSX.Element {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "gray"
            ? "/img/logo-ct.png"
            : "/img/logo-ct-gray.png"
        }
      />

      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />

        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>

        <Routes>
          {/* Rotas do menu (sidenav) */}
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))
          )}

          <Route
            path="/projects/newProject"
            element={<NewProject />}
          />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
