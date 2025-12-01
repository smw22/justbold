import { Outlet, useLocation } from "react-router";
import Footer from "~/components/Footer";
import ChatFooter from "./components/ChatFooter";

export default function ChatLayout() {
  const location = useLocation();
  const isThreadPage = location.pathname === "/chats";

  return (
    <div>
      Chat Layout
      <Outlet />
      {isThreadPage ? <Footer /> : <ChatFooter />}
    </div>
  );
}
