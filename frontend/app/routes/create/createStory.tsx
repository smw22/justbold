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
  return (
    <div className="flex justify-center items-center ">
      <div className="bg-light-grey border border-gray-300 rounded-2xl px-16 py-12 text-center w-full">
        <span className="text-2xl font-bold text-gray-800 tracking-wider">🚧 Coming Soon!</span>
        <div className="mt-3 text-gray-500">We're working hard to bring you this feature.</div>
      </div>
    </div>
  );
}
