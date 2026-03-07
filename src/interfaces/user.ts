export interface UserInterface {
  _id: string;
  email: string;
  username: string;
  petOwnerSince: string;
  petsCount: number;
  profilePicture?: string;
  password?: string;
  googleId?: string;
  refreshToken?: string;
}

export interface UserStatsInterface extends UserInterface {
  commentsCount: number;
  likesCount: number;
  postsCount: number;
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  petsCount?: number;
  petOwnerSince?: string;
  profilePicture?: string;
}
