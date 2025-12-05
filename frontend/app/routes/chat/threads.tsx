import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Chat | LineUp" },
    {
      property: "og:title",
      content: "Chat | LineUp",
    },
    // {
    //   name: "description",
    //   content: "This app is the best",
    // },
  ];
};

export default function Threads() {
  return <div>Threads Page</div>;
}
