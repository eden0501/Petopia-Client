import { createAxiosInstance } from "../config/axiosInstance";
import type { UserStatsInterface } from "../interfaces/user";

const axiosInstance = createAxiosInstance(
  `${import.meta.env.VITE_SERVER_URL}/users`,
);

export const getUserInfo = async () =>
  (await axiosInstance.get<UserStatsInterface>("info")).data;
