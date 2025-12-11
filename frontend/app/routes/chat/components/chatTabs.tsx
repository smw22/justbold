import { NavLink } from "react-router";

export default function ChatTabs() {
  return (
    <div className="bg-white flex flex-row w-full items-center rounded-tl-3xl rounded-tr-3xl -mt-6 overflow-hidden">
      <NavLink
        to="/chats"
        end
        className={({ isActive }) =>
          `flex py-3 m-2 rounded-2xl flex-row bg-white items-center justify-center w-full ${
            isActive ? "text-black border-b-2 border-black" : "text-gray-400"
          }`
        }
      >
        Chats
      </NavLink>
      <div className="w-px bg-gray-300 h-8" />
      <NavLink
        to="/chats/groups"
        className={({ isActive }) =>
          `flex py-3 m-2 rounded-2xl flex-row bg-white items-center justify-center w-full ${
            isActive ? "text-black border-b-2 border-black" : "text-gray-400"
          }`
        }
      >
        Groups
      </NavLink>
    </div>
  );
}
