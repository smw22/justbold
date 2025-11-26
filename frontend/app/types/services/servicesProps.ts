export type Service = {
  id: string;
  user: {
    name: string;
    profile_image: string;
  };
  title: string;
  content: string;
  media: string;
  price: number;
  location: string;
  tag: {
    title: string;
  };
  created: Date;
};
