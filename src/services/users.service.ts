import { createApiInstance } from "../config/axiosInstance";
import type { UserStatsInterface } from "../interfaces/user";

const axiosInstance = createApiInstance("users");

export const getUserInfo = async () =>
  (await axiosInstance.get<UserStatsInterface>("info")).data;
