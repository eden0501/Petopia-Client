import type { UserInterface } from "../interfaces/user";
import { createApiInstance } from "../config/axiosInstance";

const axiosInstance = createApiInstance("auth");

export const login = async (username: string, password: string) =>
  (await axiosInstance.post("/login", { username, password })).data;

export const register = async (userData: Omit<UserInterface, "_id">) =>
  (await axiosInstance.post("/register", userData)).data;

export const googleLogin = async (credential: string) =>
  (await axiosInstance.post("/google", { credential })).data;

export const logout = async () => (await axiosInstance.post("/logout")).data;
