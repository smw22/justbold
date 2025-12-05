import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Register | LineUp" },
    {
      property: "og:title",
      content: "Register | LineUp",
    },
    // {
    //   name: "description",
    //   content: "This app is the best",
    // },
  ];
};

export default function Register() {
  return <div>Register Page</div>;
}
