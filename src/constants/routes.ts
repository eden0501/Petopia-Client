import Home from "../pages/Home";
import type { JSX } from "react";
import Loader from "../pages/Loader";

export interface Route {
  path: string;
  element: () => JSX.Element;
}

export const ROUTES: Route[] = [
  {
    path: "/",
    element: Home,
  },
    {
    path: "/load",
    element: Loader,
  },
];
