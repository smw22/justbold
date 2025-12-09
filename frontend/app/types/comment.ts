import type { ProfileType } from "./profile";
export interface CommentType {
  id: string;
  content: string;
  likeCount: number;
  likedByCurrentUser: boolean;
  created: Date;
  user: ProfileType;
}
