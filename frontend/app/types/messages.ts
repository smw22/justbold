export interface Message {
  id: number;
  content: string;
  created: string;
  user: {
    id: string;
    name: string;
    profile_image: string;
  };
  threadId: string;
}
