import { useState } from "react";
import Tabs from "~/components/Tabs";
import ThreadCard from "./components/ThreadCard";

export default function Threads() {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <Tabs tabs={["Chats", "Groups"]} currentTab={tab} setTab={(e) => setTab(e)} />
      Threads Page
      <ThreadCard />
      <ThreadCard />
      <ThreadCard />
      <ThreadCard />
    </div>
  );
}
