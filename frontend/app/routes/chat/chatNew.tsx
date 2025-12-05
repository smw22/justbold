import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "New conversation | LineUp" },
    {
      property: "og:title",
      content: "New conversation | LineUp",
    },
    // {
    //   name: "description",
    //   content: "This app is the best",
    // },
  ];
};

export default function ChatNew() {
  return <div>New Chat</div>;
}
