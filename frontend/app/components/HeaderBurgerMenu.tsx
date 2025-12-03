import { useState } from "react";
import Icon from "./icon";
import { Link } from "react-router";

export default function HeaderBurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const baseClasses = "fixed top-0 right-0 w-full h-full bg-white transition-transform duration-400 ease-out z-50 p-4";
  const openClasses = isOpen ? "translate-x-0" : "translate-x-full";

  const menuItems = [
    { label: "Get Pro LineUp", Link: "", Icon: "BrightStar", active: false },
    { label: "Saved", Link: "", Icon: "BookmarkEmpty", active: false },
    { label: "Insights", Link: "", Icon: "StatsUpSquare", active: false },
    { label: "Invite friends", Link: "", Icon: "Community", active: false },
    { label: "Rate the app", Link: "", Icon: "Star", active: false },
    { label: "Settings", Link: "", Icon: "Settings", active: false },
    { label: "Help", Link: "", Icon: "HelpCircle", active: false },
    { label: "Log Out", Link: "", Icon: "LogOut", active: true },
  ];

  const menuDisabledClasses = "opacity-50 pointer-events-none";

  return (
    <>
      <button onClick={toggleMenu} aria-label="Toggle menu" className="cursor-pointer">
        <Icon name="Menu" color="black" size={20} />
      </button>

      <div className={`${baseClasses} ${openClasses}`}>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4 items-center">
            <button onClick={toggleMenu}>
              <Icon name="Close" color="black" size={24} />
            </button>
            <div className="text-center text-sm">Menu</div>
          </div>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className={`flex items-center gap-2 py-4 relative `}>
                <Link to={item.Link} className="flex items-center gap-2 w-full">
                  <Icon
                    name={item.Icon}
                    color="black"
                    size={20}
                    className={`${item.active === false ? menuDisabledClasses : ""}`}
                  />
                  <span className={`${item.active === false ? menuDisabledClasses : ""}`}>{item.label}</span>
                  {item.active === true && <Icon name="Chevron" color="black" size={16} className="-rotate-90 ml-auto" />}
                  {item.active === false && (
                    <span className="text-xs ml-auto bg-primary-yellow/50 px-2 py-1 rounded-full">Coming Soon</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
