import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Chat with [INSERT USER NAME HERE] | LineUp" },
    {
      property: "og:title",
      content: "Chat [INSERT USER NAME HERE] | LineUp",
    },
    // {
    //   name: "description",
    //   content: "This app is the best",
    // },
  ];
};

export default function Chat() {
  return <div>Chat Page</div>;
}
