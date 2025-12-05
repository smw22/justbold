import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Chat | LineUp" },
    {
      property: "og:title",
      content: "Chat | LineUp",
    },
  ];
};
import { useState } from "react";
import Tabs from "~/components/Tabs";
import ThreadCard from "./components/ThreadCard";
import { Link } from "react-router";

export default function Threads() {
  const [tab, setTab] = useState(0);

  return (
    <main>
      <Tabs tabs={["Chats", "Groups"]} currentTab={tab} setTab={(e) => setTab(e)} />
      {Array.from({ length: 5 }).map((_, index) => (
        <Link to={`/chats/${index}`} key={index}>
          <ThreadCard />
        </Link>
      ))}
    </main>
  );
}
