import { createApiInstance } from "@/config/axiosInstance";
import type { UpdateUserData, UserStatsInterface } from "@/interfaces/user";

const axiosInstance = createApiInstance("users");

export const getUserInfo = async () =>
  (await axiosInstance.get<UserStatsInterface>("info")).data;

export const updateUser = async (data: UpdateUserData) =>
  (await axiosInstance.put<UserStatsInterface>("", data)).data;

export const deleteUser = async () => (await axiosInstance.delete("")).data;
