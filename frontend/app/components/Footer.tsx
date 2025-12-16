import Icon from "./icon";
import { NavLink, useLocation } from "react-router";
import { useEffect, useState, useRef } from "react";

export default function Footer({ userId }: { userId: string }) {
  const location = useLocation().pathname;
  const [currentUser, setCurrentUser] = useState<string | null>(userId);
  const [glassPosition, setGlassPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setCurrentUser(userId);
  }, []);

  // calculate window size for use in the tab bar
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // we calculate the position of the glass circle behind the current tab
  useEffect(() => {
    let index = -1;

    if (location === "/") {
      index = 0;
    } else if (location.startsWith("/services")) {
      index = 1;
    } else if (location.startsWith("/create")) {
      index = 2;
    } else if (location.startsWith("/chat")) {
      index = 3;
    } else if (location === `/profile/${currentUser}` || location === `profile/${currentUser}`) {
      index = 4;
    } else {
      index = -1; // none
    }

    if (index === -1 || !footerRef.current || !tabRefs.current[index]) {
      setGlassPosition(-1);
      return;
    }

    const footerRect = footerRef.current.getBoundingClientRect();
    const tabRect = tabRefs.current[index]?.getBoundingClientRect();

    if (tabRect) {
      // Calculate position accounting for the glass element's m-1 margin (4px)
      const tabCenter = tabRect.left + tabRect.width / 2 - footerRect.left - 4;
      setGlassPosition(tabCenter);
    }
  }, [location, currentUser, windowWidth]);

  const passiveClass =
    "w-14 h-14 sm:w-18 sm:h-18 flex flex-col items-center justify-center text-[10px] sm:text-sm text-white gap-0.5 sm:gap-1 p-0";
  const activeClass =
    "w-14 h-14 sm:w-18 sm:h-18 flex flex-col items-center justify-center text-[10px] sm:text-sm text-primary-yellow gap-0.5 sm:gap-1 p-0";

  return (
    <footer
      ref={footerRef}
      className="glass-bar max-w-md bg-tab-bar bg-opacity-80 fixed z-2000 bottom-5 left-1/2 -translate-x-1/2 w-[90%] p-1 text-white rounded-full backdrop-blur-lg backdrop-saturate-150"
    >
      <div
        style={{
          left: `${glassPosition}px`,
          transform: "translateX(-50%)",
          display: `${glassPosition > 0 ? "block" : "none"}`,
        }}
        className="absolute! top-0 m-1 glass w-14 h-14 sm:w-18 sm:h-18 rounded-full z-0 transition-all duration-300 ease-in-out"
      ></div>
      <nav className="relative z-1">
        <ul className="flex justify-between">
          <li>
            <div
              ref={(el) => {
                tabRefs.current[0] = el;
              }}
            >
              <NavLink
                to="/"
                className={({ isActive, isPending }) => (isPending ? passiveClass : isActive ? activeClass : passiveClass)}
              >
                <Icon name="HomeSimpleDoor" size={24} />
                Home
              </NavLink>
            </div>
          </li>
          <li>
            <div
              ref={(el) => {
                tabRefs.current[1] = el;
              }}
            >
              <NavLink
                to="/services"
                className={({ isActive, isPending }) => (isPending ? passiveClass : isActive ? activeClass : passiveClass)}
              >
                <Icon name="SmallShopAlt" size={24} /> Services
              </NavLink>
            </div>
          </li>
          <li>
            <div
              ref={(el) => {
                tabRefs.current[2] = el;
              }}
            >
              <NavLink
                to="/create"
                className={({ isActive, isPending }) => (isPending ? passiveClass : isActive ? activeClass : passiveClass)}
              >
                <Icon name="AddCircle" size={24} /> Create
              </NavLink>
            </div>
          </li>
          <li>
            <div
              ref={(el) => {
                tabRefs.current[3] = el;
              }}
            >
              <NavLink
                to="/chats"
                className={({ isActive, isPending }) => (isPending ? passiveClass : isActive ? activeClass : passiveClass)}
              >
                <Icon name="ChatLines" size={24} /> Chats
              </NavLink>
            </div>
          </li>
          <li>
            <div
              ref={(el) => {
                tabRefs.current[4] = el;
              }}
            >
              <NavLink
                to={`/profile/${currentUser}`}
                className={({ isActive, isPending }) => (isPending ? passiveClass : isActive ? activeClass : passiveClass)}
              >
                <Icon name="UserCircle" size={24} /> Profile
              </NavLink>
            </div>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
