import { useState } from "react";
import Tabs from "~/components/Tabs";
import ThreadCard from "./components/ThreadCard";
import { useLoaderData } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import type { Thread } from "~/types/threads";

export async function clientLoader(): Promise<{ threads: Thread[]; groupThreads: Thread[] }> {
  const userId = localStorage.getItem("user_id");
  if (!userId) throw new Error("User not authenticated");

  const threadResponse = await apiFetch(`/threads?userId=${userId}`);
  if (!threadResponse.ok) throw new Error(`Failed to load threads: ${threadResponse.status}`);

  const threadResult = await threadResponse.json();
  if (!threadResult.success || !threadResult.data) {
    throw new Error(threadResult.message || "Failed to load threads");
  }

  const groupThreadResponse = await apiFetch(`/threads/group-chats?userId=${userId}`);
  if (!groupThreadResponse.ok) throw new Error(`Failed to load group threads: ${groupThreadResponse.status}`);

  const groupThreadResult = await groupThreadResponse.json();
  if (!groupThreadResult.success || !groupThreadResult.data) {
    throw new Error(groupThreadResult.message || "Failed to load group threads");
  }

  return { threads: threadResult.data, groupThreads: groupThreadResult.data };
}

export default function Threads() {
  const [tab, setTab] = useState(0);

  return (
    <main className="outer-wrapper">
      <Tabs tabs={["Chats", "Groups"]} currentTab={tab} setTab={(e) => setTab(e)} />
      {tab === 0 ? <SingularThreadsList /> : <GroupThreadsList />}
    </main>
  );
}

function SingularThreadsList() {
  const { threads } = useLoaderData();

  return (
    <>
      {threads.length === 0 ? (
        <div className="mt-8 text-center text-gray-500">No threads available. Start a new chat to connect with others!</div>
      ) : (
        threads.map((thread: Thread) => {
          const latestMessage = thread.messages[thread.messages.length - 1];
          return <ThreadCard key={thread.id} threadData={thread} messageData={latestMessage} />;
        })
      )}
    </>
  );
}

function GroupThreadsList() {
  const { groupThreads } = useLoaderData();

  return (
    <>
      {groupThreads.length === 0 ? (
        <div className="mt-8 text-center text-gray-500">No threads available. Start a new chat to connect with others!</div>
      ) : (
        groupThreads.map((thread: Thread) => {
          const latestMessage = thread.messages[thread.messages.length - 1];
          return <ThreadCard key={thread.id} threadData={thread} messageData={latestMessage} />;
        })
      )}
    </>
  );
}
