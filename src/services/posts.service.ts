import { createApiInstance } from "@/config/axiosInstance";
import type { PostCreationType, PostInterface } from "@/interfaces/post";

const axiosInstance = createApiInstance("posts");

export const BATCH_SIZE = 5;

const buildPostFormData = (data: PostCreationType, image?: File): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((elem) => formData.append(key, String(elem)));
      } else {
        formData.append(key, String(value));
      }
    }
  });

  if (image) {
    formData.append("image", image);
  }

  return formData;
};

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

export const createPost = async (newPost: PostCreationType, image?: File) =>
  (
    await axiosInstance.post<PostInterface>(
      "",
      buildPostFormData(newPost, image),
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    )
  ).data;

export const updatePost = async (
  postId: string,
  updatedFields: PostCreationType,
  image?: File,
) =>
  (
    await axiosInstance.put<PostInterface>(
      `/${postId}`,
      buildPostFormData(updatedFields, image),
      { headers: { "Content-Type": "multipart/form-data" } },
    )
  ).data;

export const deletePost = async (postId: string) =>
  (await axiosInstance.delete(`/${postId}`)).data;
