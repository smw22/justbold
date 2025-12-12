import { useLoaderData } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import type { Thread } from "~/types/threads";
import ThreadCard from "./components/ThreadCard";
import type { MetaFunction } from "react-router";
import ErrorMessage from "~/components/ErrorMessage";

export const meta: MetaFunction = () => {
  return [
    { title: "Group Threads List | LineUp" },
    {
      property: "og:title",
      content: "Group Threads List | LineUp",
    },
  ];
};

export async function clientLoader() {
  const userResponse = await apiFetch(`/user`);
  if (!userResponse.ok) throw new Error(`Failed to load user: ${userResponse.status}`);
  const userResult = await userResponse.json();

  const userId = userResult.data.id;

  let threadsError = null;

  if (!userId) {
    threadsError = `User not authenticated`;
    // throw new Error("User not authenticated");
  }

  const groupThreadResponse = await apiFetch(`/threads/group-chats?userId=${userId}`);

  if (!groupThreadResponse.ok) {
    threadsError = `Failed to load group threads: ${groupThreadResponse.status}`;
    // throw new Error(`Failed to load group threads: ${groupThreadResponse.status}`);
  }

  const groupThreadResult = await groupThreadResponse?.json();

  if (!groupThreadResult.success || !groupThreadResult.data) {
    threadsError = `Failed to load group threads.`;
    // throw new Error(groupThreadResult.message || "Failed to load group threads");
  }

  return { groupThreads: groupThreadResult.data, threadsError };
}

export default function GroupThreads() {
  const { groupThreads, threadsError } = useLoaderData<typeof clientLoader>();

  return (
    <main className="outer-wrapper pb-28">
      {/* Group Threads List */}
      <div className="bg-white">
        <ErrorMessage error={threadsError} />
        {!groupThreads ? (
          <p className="text-center py-8 text-gray-500">It looks a little empty here...</p>
        ) : (
          groupThreads.map((thread: Thread) => (
            <ThreadCard key={thread.id} threadData={thread} messageData={thread.messages[0]} isGroup={true} />
          ))
        )}
      </div>
    </main>
  );
}
