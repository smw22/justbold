import { Outlet, useLoaderData, useLocation } from "react-router";
import Footer from "~/components/Footer";
import ChatFooter from "./components/ChatFooter";
import Threadheader from "./components/ThreadHeader";

export default function ChatLayout() {
  const location = useLocation();
  const isThreadPage = location.pathname === "/chats" || location.pathname === "/chats/groups";

  return (
    <>
      {isThreadPage ? <Threadheader /> : <> </>}
      <Outlet />
      {isThreadPage ? <Footer /> : <ChatFooter />}
    </>
  );
}
