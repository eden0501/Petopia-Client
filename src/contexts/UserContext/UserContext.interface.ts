import type { UserStatsInterface } from "../../interfaces/user";

export type likeAction = "like" | "unlike";

export interface UserContextType extends UserStatsInterface {
  userId: string;
  isLoading: boolean;
  updateLikeCount: (action: likeAction) => void;
}
