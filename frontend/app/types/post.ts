import type { ProfileType } from "./profile";
export interface PostType {
  user_id: string;
  title: string;
  content: string;
  tags: { title: string }[];
  media: string;
  created: Date;
  likes: ProfileType[];
  user: ProfileType;
}
