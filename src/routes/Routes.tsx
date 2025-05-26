import { JSX } from "react";
import { RouteObject } from "react-router";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Root from "../pages/Root/Root";
import GuardedRoute from "../wrappers/GuardedRoute/GuardedRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import AuthPage from "../pages/AuthPage/AuthPage";

export type RoutesModel = {
  path: string;
  element: JSX.Element;
  errorElement: JSX.Element;
  children?: RouteObject[];
};

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
