import Icon from "./icon";
import Logo from "../assets/icons/artwork/Logo";

export default function Header() {
  return (
    <header>
      {/* NOTE: There are different headers for the app. I will start with the homepage navigation bar. */}
      <nav className="flex justify-between items-center px-4 py-2">
        <Logo />
        <ul className="flex">
          <li>
            <Icon name="Search" color="black" />
          </li>
          <li>
            <Icon name="BellNotification" color="black" />
          </li>
          <li>
            <Icon name="Menu" color="black" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
