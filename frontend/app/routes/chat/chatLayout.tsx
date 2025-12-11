import { Outlet, useLocation, useLoaderData } from "react-router";
import Footer from "~/components/Footer";
import ChatFooter from "./components/ChatFooter";
import Threadheader from "./components/ThreadHeader";
import MessagesHeader from "./components/MessagesHeader";
import { apiFetch } from "~/lib/apiFetch";

export async function clientLoader() {
  const userResponse = await apiFetch(`/user`);

  if (!userResponse.ok) {
    throw new Error(`Failed to load user: ${userResponse.status}`);
  }

  const user = await userResponse.json();
  const userId = user.data.id;

  return { userId };
}

export default function ChatLayout() {
  const { userId } = useLoaderData();
  const location = useLocation();
  const isThreadPage = location.pathname === "/chats";

  return (
    <>
      {isThreadPage ? <Threadheader /> : <MessagesHeader />}
      <Outlet />
      {isThreadPage ? <Footer userId={userId} /> : <ChatFooter />}
    </>
  );
}
