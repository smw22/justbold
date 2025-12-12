import { useLoaderData } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import type { Thread } from "~/types/threads";
import ThreadCard from "./components/ThreadCard";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Threads List | LineUp" },
    {
      property: "og:title",
      content: "Threads List | LineUp",
    },
    // {
    //   name: "description",
    //   content: "This app is the best",
    // },
  ];
};

export async function clientLoader() {
  const userResponse = await apiFetch(`/user`);
  if (!userResponse.ok) throw new Error(`Failed to load user: ${userResponse.status}`);
  const userResult = await userResponse.json();

  const userId = userResult.data.id;

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
