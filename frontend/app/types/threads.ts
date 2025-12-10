import type { Message } from "./messages";

export interface Thread {
  id: string;
  created: string;
  users: {
    id: string;
    name: string;
    profile_image: string;
  }[];
  messages: Message[];
}
