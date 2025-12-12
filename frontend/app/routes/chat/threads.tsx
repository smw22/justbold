import { useLoaderData } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import type { Thread } from "~/types/threads";
import ThreadCard from "./components/ThreadCard";
import ErrorMessage from "~/components/ErrorMessage";

export async function clientLoader() {
  const userId = localStorage.getItem("user_id");
  let threadsError = null;

  if (!userId) {
    threadsError = `User not authenticated`;
    // throw new Error("User not authenticated");
  }

  const threadResponse = await apiFetch(`/threads?userId=${userId}`);

  if (!threadResponse.ok) {
    threadsError = `Failed to load threads: ${threadResponse.statusText}`;
  }

  const threadResult = await threadResponse?.json();

  if (!threadResult.success || !threadResult.data) {
    threadsError = `Failed to load threads.`;
    // throw new Error(threadResult.message || "Failed to load threads");
  }

  return { threads: threadResult?.data, threadsError };
}

export default function Threads() {
  const { threads, threadsError } = useLoaderData<typeof clientLoader>();

  return (
    <main className="outer-wrapper pb-28">
      {/* Threads List */}
      <div className="bg-white">
        <ErrorMessage error={threadsError} />
        {!threads ? (
          <p className="text-center py-8 text-gray-500">It looks a little empty here...</p>
        ) : (
          threads.map((thread: Thread) => (
            <ThreadCard key={thread.id} threadData={thread} messageData={thread.messages[0]} isGroup={false} />
          ))
        )}
      </div>
    </main>
  );
}
