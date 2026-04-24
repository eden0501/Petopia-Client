import type { UpdateUserData, UserStatsInterface } from "@/interfaces/user";

export type likeAction = "like" | "unlike";

export interface UserContextType {
  userData: UserStatsInterface;
  userId: string;
  isLoading: boolean;
  logoutUser: () => void;
  addUserComment: () => void;
  addPost: () => void;
  updateLikeCount: (action: likeAction) => void;
  updateUserData: (data: UpdateUserData) => void;
  deletePostStats: (likesCount: number, commentsCount: number) => void;
}
