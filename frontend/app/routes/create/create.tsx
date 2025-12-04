import { Link } from "react-router";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Create" },
    {
      property: "og:title",
      content: "Create",
    },
    // {
    //   name: "description",
    //   content: "This app is the best",
    // },
  ];
};

export default function Create() {
  return <div className="outer-wrapper px-4">Main Create</div>;
}
