import type { ProfileType } from "./profile";
export interface CommentType {
  id: string;
  content: string;
  likeCount: number;
  likedByCurrentUser: boolean;
  parentId: string;
  created: Date;
  user: ProfileType;
}
