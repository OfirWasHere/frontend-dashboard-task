import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Root from "../pages/Root/Root";
import GuardedRoute from "../wrappers/GuardedRoute/GuardedRoute";
import AuthPage from "../pages/AuthPage/AuthPage";
import { RoutesModel } from "../utils/types";
import Dashboard from "../pages/Dashboard/Dashboard";

const Routes: RoutesModel[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/dashboard",
        element: (
          <GuardedRoute>
            <Dashboard />
          </GuardedRoute>
        ),
      },
    ],
  },
];

export { Routes };
