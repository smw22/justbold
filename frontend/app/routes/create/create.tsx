import { Link, redirect } from "react-router";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Create" },
    {
      property: "og:title",
      content: "Create",
    },
  ];
};

export async function clientLoader() {
  return redirect("/create/post");
}
