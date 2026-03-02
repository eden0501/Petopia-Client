import { createContext, useContext } from "react";
import type { UserContextType } from "./UserContext.interface";

export const UserContext = createContext<UserContextType>(
  {} as UserContextType,
);

export const useUserContext = () => useContext(UserContext);
