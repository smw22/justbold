import { Link } from "react-router";
import Icon from "~/components/icon";

export default function Threadheader() {
  return (
    <header className="outer-wrapper bg-header-bg-3!">
      <nav className="flex justify-between items-center px-4 py-8 -translate-y-2">
        <button aria-label="Go to messages">
          <Link to="/chats" className="font-bold text-xl text-white">
            Messages
          </Link>
        </button>
        <ul className="flex gap-4">
          <li>
            <Icon name="Search" color="white" size={24} />
          </li>
          <li>
            <Icon name="EditPencil" color="white" size={24} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
