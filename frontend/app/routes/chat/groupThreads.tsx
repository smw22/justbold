import { Link, useLoaderData } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import type { Thread } from "~/types/threads";
import ThreadCard from "./components/ThreadCard";

export async function clientLoader() {
  const userId = localStorage.getItem("user_id");
  if (!userId) throw new Error("User not authenticated");

  const groupThreadResponse = await apiFetch(`/threads/group-chats?userId=${userId}`);
  if (!groupThreadResponse.ok) throw new Error(`Failed to load group threads: ${groupThreadResponse.status}`);
  const groupThreadResult = await groupThreadResponse.json();
  if (!groupThreadResult.success || !groupThreadResult.data) {
    throw new Error(groupThreadResult.message || "Failed to load group threads");
  }

  return { groupThreads: groupThreadResult.data };
}

export default function GroupThreads() {
  const { groupThreads } = useLoaderData<typeof clientLoader>();

  return (
    <main className="outer-wrapper pb-28">
      {/* Tabs UI */}
      <div className="bg-white flex flex-row w-full items-center rounded-tl-3xl rounded-tr-3xl -mt-6 overflow-hidden">
        <Link
          to="/chats"
          className="flex py-3 m-2 rounded-2xl flex-row bg-white items-center justify-center w-full text-gray-400"
        >
          Chats
        </Link>
        <div className="w-px bg-gray-300 h-8" />
        <Link
          to="/chats/groups"
          className="flex py-3 m-2 rounded-2xl flex-row bg-white items-center justify-center w-full text-black border-b-2 border-black"
        >
          Groups
        </Link>
      </div>

      {/* Group Threads List */}
      <div className="bg-white">
        {groupThreads.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No group chats yet</p>
        ) : (
          groupThreads.map((thread: Thread) => (
            <ThreadCard key={thread.id} threadData={thread} messageData={thread.messages[0]} isGroup={true} />
          ))
        )}
      </div>
    </main>
  );
}
