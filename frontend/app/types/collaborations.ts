export type Collaboration = {
  id: string;
  user: {
    name: string;
    profile_image: string;
  };
  title: string;
  content: string;
  tags: [
    {
      id: string;
      title: string;
    },
  ];
  location: string;
  created: Date;
};
