import type { Message } from "./messages";

export interface Thread {
  id: string;
  created: string;
  messages: Message[];
}
