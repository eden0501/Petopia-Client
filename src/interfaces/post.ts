import type { UserInterface } from "./user";
import type { PostTypes } from "../constants/postTypes";
import type { CommentInterface } from "./comment";

export interface PostInterface {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  type: PostTypes;
  createdAt: string;
  imageUrl?: string;
  hashtags?: string[];
  likes?: string[];
  comments?: CommentInterface[];
  author: UserInterface;
}
