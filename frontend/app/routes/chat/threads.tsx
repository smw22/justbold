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
import { useLoaderData } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import type { Thread } from "~/types/threads";
import type { Message } from "~/types/messages";

export async function clientLoader(): Promise<{ threads: Thread[]; message: Message }> {
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const threadResponse = await apiFetch(`/threads?userId=${userId}`);

  if (!threadResponse.ok) {
    throw new Error(`Failed to load threads: ${threadResponse.status}`);
  }

  const threadResult = await threadResponse.json();

  if (!threadResult.success || !threadResult.data) {
    throw new Error(threadResult.message || "Failed to load threads");
  }

  const threadId = threadResult.data[0]?.id;

  if (!threadId) {
    throw new Error("No threads found for user");
  }

  const messageResponse = await apiFetch(`/messages/${threadId}`);

  if (!messageResponse.ok) {
    throw new Error(`Failed to load message: ${messageResponse.status}`);
  }

  const messageResult = await messageResponse.json();

  if (!messageResult.success || !messageResult.data) {
    throw new Error(messageResult.message || "Failed to load messages");
  }

  return {
    threads: threadResult.data,
    message: messageResult.data,
  };
}

export default function Threads() {
  const { threads, message } = useLoaderData();

  const [tab, setTab] = useState(0);

  return (
    <main>
      <Tabs tabs={["Chats", "Groups"]} currentTab={tab} setTab={(e) => setTab(e)} />
      {threads.map((thread: Thread) => (
        <ThreadCard key={thread.id} threadData={thread} messagesData={message} />
      ))}

      {threads.length === 0 ? (
        <div className="mt-8 text-center text-gray-500">No threads available. Start a new chat to connect with others!</div>
      ) : (
        threads.map((thread: Thread) => <p>{thread.created}</p>)
      )}
    </main>
  );
}
