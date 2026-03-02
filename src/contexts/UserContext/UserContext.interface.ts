import type { UserStatsInterface } from "../../interfaces/user";

export type likeAction = "like" | "unlike";

export interface UserContextType {
  userData: UserStatsInterface;
  userId: string;
  isLoading: boolean;
  updateLikeCount: (action: likeAction) => void;
  addUserComment: () => void;
}
