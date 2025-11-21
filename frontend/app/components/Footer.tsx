import Icon from "./icon";
import { NavLink } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-black fixed bottom-5 left-[5%] w-[90%] py-4 text-white rounded-full">
      <nav>
        <ul className="flex justify-evenly">
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex flex-col items-center text-sm"
                  : isActive
                    ? "bg-gray-500 rounded-full flex flex-col items-center text-sm"
                    : "flex flex-col items-center text-sm"
              }
            >
              <Icon name="HomeSimpleDoor" size={24} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex flex-col items-center text-sm"
                  : isActive
                    ? "bg-gray-500 rounded-full flex flex-col items-center text-sm"
                    : "flex flex-col items-center text-sm"
              }
            >
              <Icon name="SmallShopAlt" size={24} /> Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex flex-col items-center text-sm"
                  : isActive
                    ? "bg-gray-500 rounded-full flex flex-col items-center text-sm"
                    : "flex flex-col items-center text-sm"
              }
            >
              <Icon name="AddCircle" size={24} /> Create
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chats"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex flex-col items-center text-sm"
                  : isActive
                    ? "bg-gray-500 rounded-full flex flex-col items-center text-sm"
                    : "flex flex-col items-center text-sm"
              }
            >
              <Icon name="ChatLines" size={24} /> Chats
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/:profileId"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex flex-col items-center text-sm"
                  : isActive
                    ? "bg-gray-500 rounded-full flex flex-col items-center text-sm"
                    : "flex flex-col items-center text-sm"
              }
            >
              <Icon name="UserCircle" size={24} /> Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
