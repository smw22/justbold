import Icon from "./icon";
import Logo from "../assets/icons/artwork/Logo";
import { useLocation, useNavigate, Link } from "react-router";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  return (
    <header className="outer-wrapper">
      <nav className="flex justify-between items-center p-4">
        {/* navigate(-1) : Lets you go back to the previous page  */}
        {isHomePage ? (
          <Logo />
        ) : (
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="hover:bg-gray-200 p-2 rounded-full transition-colors duration-200 ease-in-out cursor-pointer"
          >
            <Icon name="NavArrowLeft" color="black" size={20} />
          </button>
        )}
        <ul className="flex gap-0">
          <li className="hover:bg-gray-200 p-2 rounded-full transition-colors duration-200 ease-in-out cursor-pointer">
            <Link to="/search">
              <Icon name="Search" color="black" size={20} />
            </Link>
          </li>
          <li className="hover:bg-gray-200 p-2 rounded-full transition-colors duration-200 ease-in-out cursor-pointer">
            <Link to="/notifications">
              <Icon name="BellNotification" color="black" size={20} />
            </Link>
          </li>
          <li>
            <button
              onClick={() => alert("Open burger menu")}
              className="hover:bg-gray-200 p-2 rounded-full transition-colors duration-200 ease-in-out cursor-pointer"
              aria-label="Open side menu"
            >
              <Icon name="Menu" color="black" size={20} />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
