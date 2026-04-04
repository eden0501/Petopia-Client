import { createApiInstance } from "@/config/axiosInstance";
import type { UpdateUserData, UserStatsInterface } from "@/interfaces/user";

const axiosInstance = createApiInstance("users");

export const getUserInfo = async () =>
  (await axiosInstance.get<UserStatsInterface>("info")).data;

export const updateUser = async (data: UpdateUserData, image?: File) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (image) {
    formData.append("image", image);
  }

  return (
    await axiosInstance.put<UserStatsInterface>("", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data;
};

export const deleteUser = async () => (await axiosInstance.delete("")).data;
