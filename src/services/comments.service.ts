import { createAxiosInstance } from "../config/axiosInstance";

const axiosInstance = createAxiosInstance(
  `${import.meta.env.VITE_SERVER_URL}/comments`,
);

export const createComment = async (postId: string, content: string) =>
  (
    await axiosInstance.post("", {
      postId,
      content,
    })
  ).data;
