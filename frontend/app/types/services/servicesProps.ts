export type Service = {
  id: string;
  user: {
    id: string;
    name: string;
    profile_image: string;
    looking_for: string[];
  };
  title: string;
  content: string;
  media: string;
  price: number;
  location: string;
  category: string;
  created: Date;
};
