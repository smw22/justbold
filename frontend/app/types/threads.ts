import type { Message } from "./messages";

export interface Thread {
  id: number;
  created: string;
  messages: Message[];
}
