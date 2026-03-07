import type { UserInterface } from "./user";

export interface CommentInterface {
  _id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: string;
  author: UserInterface;
}
