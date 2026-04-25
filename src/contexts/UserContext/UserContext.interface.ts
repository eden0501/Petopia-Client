import type { UpdateUserData, UserStatsInterface } from "@/interfaces/user";

export type likeAction = "like" | "unlike";

export interface UserContextType {
  userData: UserStatsInterface;
  userId: string;
  isLoading: boolean;
  changePostCount: (add: boolean) => void;
  updateLikeCount: (action: likeAction) => void;
  logoutUser: () => void;
  updateUserData: (data: UpdateUserData) => void;
}
