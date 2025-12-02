import type { ProfileType } from "./profile";
export interface CommentType {
  id: string;
  content: string;
  likes: ProfileType[];
  created: Date;
  user: ProfileType;
}
