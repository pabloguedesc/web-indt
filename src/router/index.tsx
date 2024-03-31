import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { CommonUserPage } from "../pages/CommonUser";
import { DashboardPage } from "../pages/Dashboard";
import { ErrorPage } from "../pages/Error";
import { LoginPage } from "../pages/Login";
import { UsersPage } from "../pages/Users";
import { path } from "../utils/path";
import { ProtectedRoute } from "./guards/protected.route";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["admin", "common"]}>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: path.usersPage,
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: path.dashboardPage,
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: path.commonUserPage,
        element: (
          <ProtectedRoute allowedRoles={["admin", "common"]}>
            <CommonUserPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/error", element: <ErrorPage /> },
  { path: "*", element: <ErrorPage /> },
]);
