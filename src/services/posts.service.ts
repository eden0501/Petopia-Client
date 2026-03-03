import { createAxiosInstance } from "../config/axiosInstance";
import type { PostInterface } from "../interfaces/post";

const axiosInstance = createAxiosInstance(
  `${import.meta.env.VITE_SERVER_URL}/posts`,
);

export const BATCH_SIZE = 5;

export const getPosts = async (
  batchPage: number,
  { typeFilter, userId }: { typeFilter?: string; userId?: string },
) =>
  (
    await axiosInstance.get<{ posts: PostInterface[] }>("/batch", {
      params: {
        page: batchPage,
        limit: BATCH_SIZE,
        type: typeFilter === "All" ? null : typeFilter,
        authorId: userId,
      },
    })
  ).data.posts;

export const toggleLike = async (postId: string, liked: boolean) =>
  (await axiosInstance.post(`/${liked ? "unlike" : "like"}/${postId}`)).data;
