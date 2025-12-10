import { useNavigate } from "react-router";
import Icon from "~/components/icon";
import AvatarHeader from "~/components/AvatarHeader";
import Button from "~/components/Button";
import ContextMenu from "~/components/ContextMenu";
import { useState } from "react";

interface MessagesHeaderProps {
  otherUser?: {
    id: string;
    name: string;
    profile_image?: string;
  };
  threadId?: string;
  isGroup: boolean;
}

export default function MessagesHeader({ otherUser, threadId, isGroup }: MessagesHeaderProps) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const navigate = useNavigate();

  const imageUrl = isGroup
    ? "https://img.icons8.com/?size=100&id=87221&format=png&color=000000"
    : otherUser?.profile_image || "https://avatar.iran.liara.run/public";

  const title = isGroup ? `Group ${threadId?.slice(0, 8)}` : otherUser?.name || "Chat";

  return (
    <header className="outer-wrapper bg-header-bg-3!">
      <nav className="flex justify-between items-center px-4 py-6">
        <button onClick={() => navigate(-1)} aria-label="Go back">
          <Icon name="NavArrowLeft" color="white" size={20} />
        </button>
        <AvatarHeader imageUrl={imageUrl} imageSize={60} title={title} color="white" className="font-semibold gap-6" />
        <ul className="flex gap-4">
          <li className="relative">
            <button onClick={() => setShowContextMenu(!showContextMenu)} aria-label="Open context menu">
              <Icon name="MoreVert" color="white" size={24} />
            </button>
            <ContextMenu show={showContextMenu} setShow={(e) => setShowContextMenu(e)}>
              {!isGroup ? (
                <>
                  <Button
                    text="Go to profile"
                    icon="UserCircle"
                    variant="context-menu"
                    fullWidth={true}
                    onClick={() => navigate(`/profile/${otherUser?.id}`)}
                  />
                  <div className="bg-white h-px mx-2"></div>
                  <Button
                    text="Block user"
                    icon="DeleteCircle"
                    variant="context-menu"
                    fullWidth={true}
                    onClick={() => alert("Block functionality")}
                  />
                  <div className="bg-white h-px mx-2"></div>
                  <Button
                    text="Report user"
                    icon="ChatBubbleWarning"
                    variant="context-menu"
                    fullWidth={true}
                    onClick={() => alert("Report functionality")}
                  />
                </>
              ) : (
                <Button
                  text="Leave group"
                  icon="ChatBubbleWarning"
                  variant="context-menu"
                  fullWidth={true}
                  onClick={() => alert("Leave group functionality")}
                />
              )}
            </ContextMenu>
          </li>
        </ul>
      </nav>
    </header>
  );
}
