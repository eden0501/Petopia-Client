import Home from "../pages/Home";
import Loader from "../pages/Loader";
import Profile from "../pages/Profile";
import type { JSX } from "react";

export interface Route {
  path: string;
  element: () => JSX.Element;
}

export const ROUTES: Route[] = [
  {
    path: "/home",
    element: Home,
  },
  {
    path: "/profile",
    element: Profile,
  },
  {
    path: "/load",
    element: Loader,
  },
];
