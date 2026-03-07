import type { JSX } from "react";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";

export interface AppRoute {
  path: string;
  element: () => JSX.Element;
}

export const ROUTES: AppRoute[] = [
  {
    path: "/home",
    element: Home,
  },
  {
    path: "/profile",
    element: Profile,
  },
  {
    path: "/edit-profile",
    element: EditProfile,
  },
];
