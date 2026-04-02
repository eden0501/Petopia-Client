import { createApiInstance } from "@/config/axiosInstance";
import type { PostCreationType, PostInterface } from "@/interfaces/post";

const axiosInstance = createApiInstance("posts");

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

export const createPost = async (newPost: PostCreationType) =>
  (await axiosInstance.post<PostInterface>("", newPost)).data;

export const updatePost = async (
  postId: string,
  updatedFields: PostCreationType,
) => (await axiosInstance.put<PostInterface>(`/${postId}`, updatedFields)).data;

export const deletePost = async (postId: string) =>
  (await axiosInstance.delete(`/${postId}`)).data;
