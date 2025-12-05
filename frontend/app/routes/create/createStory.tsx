import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Create story | LineUp" },
    {
      property: "og:title",
      content: "Create story | LineUp",
    },
    // {
    //   name: "description",
    //   content: "This app is the best",
    // },
  ];
};

export default function CreateStory() {
  return <div>Create Story Page</div>;
}
