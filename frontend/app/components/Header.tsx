import Icon from "./icon";
import Logo from "../assets/icons/artwork/Logo";
import { useLocation, useNavigate, Link } from "react-router";
import HeaderBurgerMenu from "./HeaderBurgerMenu";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  return (
    <header className="sticky top-0 z-90">
      <nav className="flex justify-between items-center px-4 py-6 outer-wrapper">
        {/* navigate(-1) : Lets you go back to the previous page  */}
        {isHomePage ? (
          <Logo />
        ) : (
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="hover:bg-gray-200 p-2 rounded-full transition-colors duration-200 ease-in-out cursor-pointer size-10 flex items-center justify-center"
          >
            <Icon name="NavArrowLeft" color="black" size={20} />
          </button>
        )}
        <ul className="flex gap-0">
          <li className="hover:bg-gray-200 p-2 rounded-full transition-colors duration-200 ease-in-out cursor-pointer size-10 flex items-center justify-center">
            <Link to="/search">
              <Icon name="Search" color="black" size={20} />
            </Link>
          </li>
          <li className="hover:bg-gray-200 p-2 rounded-full transition-colors duration-200 ease-in-out cursor-pointer size-10 flex items-center justify-center">
            <Link to="/notifications">
              <Icon name="BellNotification" color="black" size={20} />
            </Link>
          </li>
          <li className="hover:bg-gray-200 p-2 rounded-full transition-colors duration-200 ease-in-out cursor-pointer size-10 flex items-center justify-center">
            <HeaderBurgerMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
}
