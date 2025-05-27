import { JSX } from "react";
import { RouteObject } from "react-router-dom";

export type RoutesModel = {
    path: string;
    element: JSX.Element;
    errorElement: JSX.Element;
    children?: RouteObject[];
};

export type NavbarLinksModel = {
    routeName: string;
    path?: string;
    RouteID?: string;
}

export type LoginServiceModal = {
    email: string;
    password: string;
}

export type VisitDataModal = {
    date: string;
    visits: number;
}