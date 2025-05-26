import { JSX } from "react";
import { RouteObject } from "react-router";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Root from "../pages/Root/Root";
import LandingPage from "../pages/LandingPage/LandingPage";
import GuardedRoute from "../wrappers/GuardedRoute/GuardedRoute";
import Dashboard from "../pages/Dashboard/Dashboard";

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
        path: "/",
        element: <LandingPage />,
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
