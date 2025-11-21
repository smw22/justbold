import Icon from "./icon";
import Logo from "../assets/icons/artwork/Logo";
import { useLocation, useNavigate } from "react-router";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  return (
    <header>
      <nav className="flex justify-between items-center p-6">
        {/* navigate(-1) : Lets you go back to the previous page  */}
        {isHomePage ? (
          <Logo />
        ) : (
          <button onClick={() => navigate(-1)} aria-label="Go back">
            <Icon name="NavArrowLeft" color="black" size={20} />
          </button>
        )}
        <ul className="flex gap-4">
          <li>
            <Icon name="Search" color="black" size={20} />
          </li>
          <li>
            <Icon name="BellNotification" color="black" size={20} />
          </li>
          <li>
            <Icon name="Menu" color="black" size={20} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
