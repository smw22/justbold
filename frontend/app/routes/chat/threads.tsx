import { useLoaderData } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import type { Thread } from "~/types/threads";
import ThreadCard from "./components/ThreadCard";

export async function clientLoader() {
  const userId = localStorage.getItem("user_id");
  if (!userId) throw new Error("User not authenticated");

  const threadResponse = await apiFetch(`/threads?userId=${userId}`);
  if (!threadResponse.ok) throw new Error(`Failed to load threads: ${threadResponse.status}`);
  const threadResult = await threadResponse.json();
  if (!threadResult.success || !threadResult.data) {
    throw new Error(threadResult.message || "Failed to load threads");
  }

  return { threads: threadResult.data };
}

export default function Threads() {
  const { threads } = useLoaderData<typeof clientLoader>();

  return (
    <main className="outer-wrapper pb-28">
      {/* Threads List */}
      <div className="bg-white">
        {threads.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No chats yet</p>
        ) : (
          threads.map((thread: Thread) => (
            <ThreadCard key={thread.id} threadData={thread} messageData={thread.messages[0]} isGroup={false} />
          ))
        )}
      </div>
    </main>
  );
}
