import Icon from "./icon";

export default function Footer() {
  return (
    <footer className="bg-black">
      <nav>
        <ul className="flex justify-evenly">
          <li>
            <Icon name="HomeSimpleDoor" />
          </li>
          <li>
            <Icon name="SmallShopAlt" />
          </li>
          <li>
            <Icon name="AddCircle" />
          </li>
          <li>
            <Icon name="ChatLines" />
          </li>
          <li>
            <Icon name="UserCircle" />
          </li>
        </ul>
      </nav>
    </footer>
  );
}
