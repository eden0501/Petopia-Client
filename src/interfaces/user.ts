export interface UserInterface {
  _id: string;
  email: string;
  username: string;
  petOwnerSince: string;
  petsCount: number;
  profilePicture?: string;
}

export interface UserStatsInterface extends UserInterface {
  commentsCount: number;
  likesCount: number;
  postsCount: number;
}
