import { useOutletContext } from "react-router";
import type { Thread } from "~/types/threads";
import ThreadCard from "./ThreadCard";

type ThreadsContext = { threads: Thread[]; groupThreads: Thread[] };

export default function Groups() {
  const { groupThreads } = useOutletContext<ThreadsContext>();

  return (
    <>
      {groupThreads.length === 0 ? (
        <div className="mt-8 text-center text-gray-500">No groups available. Start a new group to connect with others!</div>
      ) : (
        groupThreads.map((thread: Thread) => {
          const latestMessage = thread.messages[thread.messages.length - 1];
          return <ThreadCard key={thread.id} threadData={thread} messageData={latestMessage} isGroup />;
        })
      )}
    </>
  );
}
