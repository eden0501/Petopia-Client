export interface UserInterface {
  _id: string;
  email: string;
  username: string;
  petOwnerSince: Date;
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
