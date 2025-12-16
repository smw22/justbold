import type { Tag } from "./tag";

export type Collaboration = {
  id: string;
  user: {
    id: string;
    name: string;
    profile_image: string;
    looking_for: string[];
  };
  users?: Array<{
    id: string;
    name: string;
    profile_image: string;
  }>;
  title: string;
  content: string;
  media: string;
  role: string;
  tags: Tag[];
  location: string;
  created: Date;
};
