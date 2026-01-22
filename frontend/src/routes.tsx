import {
  HomeIcon,
  Cog6ToothIcon,
  ClipboardDocumentCheckIcon,
  FolderIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Settings, Tasks, Projects } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import NewProject from "@/pages/projects/newProject";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <FolderIcon {...icon} />,
        name: "projects",
        path: "/projects",
        element: <Projects />,
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "tasks",
        path: "/tasks",
        element: <Tasks />,
      },
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "settings",
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
