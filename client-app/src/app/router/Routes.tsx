import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import HomePage from "../../features/home/HomePage";
import ProfilePage from "../../features/profiles/ProfilePage";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "activities", element: <ActivityDashboard /> },
          { path: "activities/:id", element: <ActivityDetails /> },
          { path: "create-activity", element: <ActivityForm key="create" /> },
          { path: "edit-activity/:id", element: <ActivityForm key="edit" /> },
          { path: "profiles/:username", element: <ProfilePage /> },
          { path: "errors", element: <TestErrors /> },
        ],
      },
      { path: "", element: <HomePage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
