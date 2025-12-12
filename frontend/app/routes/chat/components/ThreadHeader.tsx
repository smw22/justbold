import { Link } from "react-router";
import Icon from "~/components/icon";
import ChatTabs from "./chatTabs";

export default function ThreadHeader() {
  return (
    <header className="outer-wrapper bg-header-bg-3!">
      <nav className="flex flex-col gap-12">
        <div className="flex justify-between items-center px-4 pt-8">
          <button aria-label="Go to messages">
            <Link to="/chats" className="font-bold text-xl text-white">
              Messages
            </Link>
          </button>
          <ul className="flex gap-4">
            <li>
              <Icon name="Search" color="white" size={24} />
            </li>
          </ul>
        </div>
        <ChatTabs />
      </nav>
    </header>
  );
}
