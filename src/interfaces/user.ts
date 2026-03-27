export interface UserInterface {
  _id: string;
  username: string;
  petOwnerSince: string;
  petsCount: number;
  profilePicture?: string;
  email?: string;
  password?: string;
  googleId?: string;
  refreshToken?: string;
}

export interface UserStatsInterface extends UserInterface {
  commentsCount: number;
  likesCount: number;
  postsCount: number;
}
