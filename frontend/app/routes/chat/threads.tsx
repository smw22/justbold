import { useState } from "react";
import Tabs from "~/components/Tabs";
import ThreadCard from "./components/ThreadCard";
import { Link, useLoaderData } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import type { Thread } from "~/types/threads";

export async function clientLoader(): Promise<{ threads: Thread[] }> {
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const response = await apiFetch(`/threads?userId=${userId}`);

  if (!response.ok) {
    throw new Error(`Failed to load threads: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.message || "Failed to load threads");
  }

  return {
    threads: result.data,
  };
}

export default function Threads() {
  const { threads } = useLoaderData();

  const [tab, setTab] = useState(0);

  return (
    <main>
      <Tabs tabs={["Chats", "Groups"]} currentTab={tab} setTab={(e) => setTab(e)} />
      {Array.from({ length: 5 }).map((_, index) => (
        <Link to={`/chats/${index}`} key={index}>
          <ThreadCard />
        </Link>
      ))}

      {threads.length === 0 ? (
        <div className="mt-8 text-center text-gray-500">No threads available. Start a new chat to connect with others!</div>
      ) : (
        threads.map((thread: Thread) => <p>{thread.created}</p>)
      )}
    </main>
  );
}
