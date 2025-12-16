import type { CommentType } from "./comment";
import type { ProfileType } from "./profile";
export interface PostType {
  members: any;
  id: string;
  user_id: string;
  title: string;
  content: string;
  tags: { title: string }[];
  media: string;
  created: Date;
  likes: ProfileType[];
  likedByCurrentUser: boolean;
  totalLikes: number;
  comments: CommentType[];
  user: ProfileType;
  users: ProfileType[];
}
