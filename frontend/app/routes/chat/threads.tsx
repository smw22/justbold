import { Link, Outlet, useLocation, useOutletContext } from "react-router";
import type { Thread } from "~/types/threads";

type ThreadsContext = { threads: Thread[]; groupThreads: Thread[] };

export default function Threads() {
  const { threads, groupThreads } = useOutletContext<ThreadsContext>();
  const location = useLocation();

  const isGroups = location.pathname.endsWith("/groups");

  return (
    <main className="outer-wrapper">
      {/* tabs ui */}
      <div className="bg-white flex flex-row w-full items-center rounded-tl-3xl rounded-tr-3xl -mt-6 overflow-hidden">
        <Link
          to="/chats"
          className={`flex py-3 m-2 rounded-2xl flex-row bg-white items-center justify-center w-full transition-colors duration-400 ${
            isGroups ? "text-gray-400" : "text-black border-b-2 border-black"
          }`}
        >
          Chats
        </Link>
        <div className="w-px bg-gray-300 h-8" />
        <Link
          to="/chats/groups"
          className={`flex py-3 m-2 rounded-2xl flex-row bg-white items-center justify-center w-full transition-colors duration-400 ${
            isGroups ? "text-black border-b-2 border-black" : "text-gray-400"
          }`}
        >
          Groups
        </Link>
      </div>

      {/* Provide data to children via Outlet context */}
      <Outlet context={{ threads, groupThreads }} />
    </main>
  );
}
