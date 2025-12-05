import { Link, redirect } from "react-router";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Create | LineUp" },
    {
      property: "og:title",
      content: "Create | LineUp",
    },
  ];
};

export async function clientLoader() {
  return redirect("/create/post");
}
