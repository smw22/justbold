import { useLoaderData } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import type { Thread } from "~/types/threads";
import ThreadCard from "./components/ThreadCard";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Group Threads List | LineUp" },
    {
      property: "og:title",
      content: "Group Threads List | LineUp",
    },
    // {
    //   name: "description",
    //   content: "This app is the best",
    // },
  ];
};

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
