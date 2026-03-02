import type { UserInterface } from "./user";
import type { PostTypes } from "../constants/postTypes";

export interface PostInterface {
  title: string;
  content: string;
  authorId: string;
  type: PostTypes;
  createdAt: Date;
  imageUrl?: string;
  hashtags?: string[];
  author: UserInterface;
}
