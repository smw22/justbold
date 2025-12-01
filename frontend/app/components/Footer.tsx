import Icon from "./icon";
import { NavLink } from "react-router";

export default function Footer() {
  const pasiveClass = "flex flex-col items-center text-sm text-white gap-1 p-3";
  const activeClass = "flex flex-col items-center text-sm bg-neutral-grey text-primary-yellow rounded-full gap-1 p-3 px-4";

  return (
    <footer className="bg-black fixed bottom-5 left-[5%] w-[90%] max-w-3xl py-1 text-white rounded-full md:left-[50%] md:-translate-x-1/2">
      <nav>
        <ul className="flex justify-evenly">
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) => (isPending ? pasiveClass : isActive ? activeClass : pasiveClass)}
            >
              <Icon name="HomeSimpleDoor" size={24} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive, isPending }) => (isPending ? pasiveClass : isActive ? activeClass : pasiveClass)}
            >
              <Icon name="SmallShopAlt" size={24} /> Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create"
              className={({ isActive, isPending }) => (isPending ? pasiveClass : isActive ? activeClass : pasiveClass)}
            >
              <Icon name="AddCircle" size={24} /> Create
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chats"
              className={({ isActive, isPending }) => (isPending ? pasiveClass : isActive ? activeClass : pasiveClass)}
            >
              <Icon name="ChatLines" size={24} /> Chats
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/:profileId"
              className={({ isActive, isPending }) => (isPending ? pasiveClass : isActive ? activeClass : pasiveClass)}
            >
              <Icon name="UserCircle" size={24} /> Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
