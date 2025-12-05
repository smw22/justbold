import type { CommentType } from "./comment";
import type { ProfileType } from "./profile";
export interface PostType {
  id: string;
  user_id: string;
  title: string;
  content: string;
  tags: { title: string }[];
  media: string;
  created: Date;
  likes: ProfileType[];
  comments: CommentType[];
  user: ProfileType;
}
