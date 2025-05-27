import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Root from "../pages/Root/Root";
import GuardedRoute from "../wrappers/GuardedRoute/GuardedRoute";
import AuthPage from "../pages/AuthPage/AuthPage";
import { RoutesModel } from "../utils/types";
import DashboardV2 from "../pages/DashboardV2/DashboardV2";

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
            <DashboardV2 />
          </GuardedRoute>
        ),
      },
    ],
  },
];

export { Routes };
