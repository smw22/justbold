import { useNavigate, useRouteLoaderData } from "react-router";
import Icon from "~/components/icon";
import AvatarHeader from "~/components/AvatarHeader";
import Button from "~/components/Button";
import ContextMenu from "~/components/ContextMenu";
import { useState } from "react";

export default function MessagesHeader() {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const navigate = useNavigate();
  const data = useRouteLoaderData("routes/chat/chat") as
    | { otherUser?: { id: string; name: string; profile_image?: string } }
    | undefined;
  const otherUser = data?.otherUser;

  return (
    <header className="outer-wrapper bg-header-bg-3!">
      <nav className="flex justify-between items-center px-4 py-6">
        <button onClick={() => navigate(-1)} aria-label="Go back">
          <Icon name="NavArrowLeft" color="white" size={20} />
        </button>
        {otherUser && (
          <AvatarHeader
            imageUrl={otherUser.profile_image || "https://avatar.iran.liara.run/public"}
            imageSize={60}
            title={otherUser.name}
            color="white"
            className="font-semibold gap-6"
          />
        )}
        <ul className="flex gap-4">
          <li className="relative">
            <button onClick={() => setShowContextMenu(!showContextMenu)} aria-label="Open context menu">
              <Icon name="MoreVert" color="white" size={24} />
            </button>
            <ContextMenu show={showContextMenu} setShow={(e) => setShowContextMenu(e)}>
              <Button
                text="Go to profile"
                icon="UserCircle"
                variant="context-menu"
                fullWidth={true}
                onClick={() => alert("Indsæt funktionalitet")}
              />
              <div className="bg-white h-px mx-2"></div>
              <Button
                text="Block user"
                icon="DeleteCircle"
                variant="context-menu"
                fullWidth={true}
                onClick={() => alert("Indsæt funktionalitet")}
              />
              <div className="bg-white h-px mx-2"></div>
              <Button
                text="Report user"
                icon="ChatBubbleWarning"
                variant="context-menu"
                fullWidth={true}
                onClick={() => alert("Indsæt funktionalitet")}
              />
            </ContextMenu>
          </li>
        </ul>
      </nav>
    </header>
  );
}
