import { useOutletContext } from "react-router";
import type { Thread } from "~/types/threads";
import ThreadCard from "./ThreadCard";

type ThreadsContext = { threads: Thread[]; groupThreads: Thread[] };

export default function Chats() {
  const { threads } = useOutletContext<ThreadsContext>();

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
