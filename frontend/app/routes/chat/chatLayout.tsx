import { Outlet, useLoaderData, useLocation } from "react-router";
import Footer from "~/components/Footer";
import ChatFooter from "./components/ChatFooter";
import Threadheader from "./components/ThreadHeader";
import MessagesHeader from "./components/MessagesHeader";
import { apiFetch } from "~/lib/apiFetch";

export async function clientLoader() {
  // Move loader logic here from threads.tsx
  const userId = localStorage.getItem("user_id");
  if (!userId) throw new Error("User not authenticated");

  const threadResponse = await apiFetch(`/threads?userId=${userId}`);
  if (!threadResponse.ok) throw new Error(`Failed to load threads: ${threadResponse.status}`);
  const threadResult = await threadResponse.json();
  if (!threadResult.success || !threadResult.data) {
    throw new Error(threadResult.message || "Failed to load threads");
  }

  const groupThreadResponse = await apiFetch(`/threads/group-chats?userId=${userId}`);
  if (!groupThreadResponse.ok) throw new Error(`Failed to load group threads: ${groupThreadResponse.status}`);
  const groupThreadResult = await groupThreadResponse.json();
  if (!groupThreadResult.success || !groupThreadResult.data) {
    throw new Error(groupThreadResult.message || "Failed to load group threads");
  }

  return { threads: threadResult.data, groupThreads: groupThreadResult.data };
}

export default function ChatLayout() {
  const { threads, groupThreads } = useLoaderData();

  const location = useLocation();
  const isThreadPage = location.pathname === "/chats" || location.pathname === "/chats/groups";

  return (
    <>
      {isThreadPage ? <Threadheader /> : <MessagesHeader />}
      <Outlet context={{ threads, groupThreads }} />
      {isThreadPage ? <Footer /> : <ChatFooter />}
    </>
  );
}
