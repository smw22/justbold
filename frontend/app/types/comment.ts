import type { ProfileType } from "./profile";
export interface CommentType {
  id: string;
  content: string;
  created: Date;
  user: ProfileType;
}
