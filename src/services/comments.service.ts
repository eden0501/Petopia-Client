import { createApiInstance } from "@/config/axiosInstance";

const axiosInstance = createApiInstance("comments");

export const createComment = async (postId: string, content: string) =>
  (
    await axiosInstance.post("", {
      postId,
      content,
    })
  ).data;
