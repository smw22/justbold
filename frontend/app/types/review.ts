import type { ProfileType } from "./profile";
export interface ReviewType {
  id: string;
  sender: ProfileType;
  rating: number;
  content: string;
  type: string;
  created: Date;
}
