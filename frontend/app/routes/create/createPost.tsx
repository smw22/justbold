import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Create post | LineUp" },
    {
      property: "og:title",
      content: "Create post | LineUp",
    },
    // {
    //   name: "description",
    //   content: "This app is the best",
    // },
  ];
};

export default function CreatePost() {
  return <div>Create Posts Page</div>;
}
