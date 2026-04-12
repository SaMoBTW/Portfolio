import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Experience } from "./pages/Experience";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Admin } from "./pages/Admin";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "experience", Component: Experience },
      { path: "projects", Component: Projects },
      { path: "projects/:projectId", Component: ProjectDetail },
      { path: "ops/workspace", Component: Admin },
      { path: "*", Component: NotFound },
    ],
  },
]);