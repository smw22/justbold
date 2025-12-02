import { Link, useNavigate } from "react-router";
import Icon from "~/components/icon";
import AvatarHeader from "~/components/AvatarHeader";

export default function Threadheader() {
  const navigate = useNavigate();

  return (
    <header className="outer-wrapper bg-header-bg-3">
      <nav className="flex justify-between items-center px-4 py-6">
        <button onClick={() => navigate(-1)} aria-label="Go back">
          <Icon name="NavArrowLeft" color="white" size={20} />
        </button>
        <AvatarHeader
          imageUrl="https://avatar.iran.liara.run/public"
          imageSize={60}
          title="Jonas Jacobsen"
          color="white"
          className="font-semibold gap-6"
        />
        <ul className="flex gap-4">
          <li>
            <Icon name="MoreVert" color="white" size={24} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
