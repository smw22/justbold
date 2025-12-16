import { useState, useEffect } from "react";
import { Link } from "react-router";
import ContextMenu from "~/components/ContextMenu";
import Button from "~/components/Button";
import Icon from "~/components/icon";
import { apiFetch } from "~/lib/apiFetch";

export default function ProfileHeader({
  id,
  name,
  bio,
  connection_count,
  post_count,
  image,
  theme,
  currentUsersProfile,
  userId,
}: {
  id: string;
  name: string;
  bio: string;
  connection_count: number;
  post_count: number;
  image: string;
  theme: string;
  currentUsersProfile: boolean;
  userId: string;
}) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"pending" | "accepted" | null>(null);

  useEffect(() => {
    if (currentUsersProfile) return;

    const fetchConnectionStatus = async () => {
      try {
        const res = await apiFetch("/connections");
        if (res.ok) {
          const data = await res.json();

          // Check accepted connections
          for (const connection of data.accepted ?? []) {
            const otherId = connection.requester.id === data.me ? connection.addressee.id : connection.requester.id;
            if (otherId === userId) {
              setConnectionStatus("accepted");
              return;
            }
          }

          // Check pending connections
          for (const connection of data.pending ?? []) {
            const otherId = connection.requester.id === data.me ? connection.addressee.id : connection.requester.id;
            if (otherId === userId) {
              setConnectionStatus("pending");
              return;
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch connection status:", error);
      }
    };

    fetchConnectionStatus();
  }, [currentUsersProfile, userId]);

  const handleConnect = async () => {
    try {
      const res = await apiFetch("/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: userId }),
      });
      if (res.ok) {
        setConnectionStatus("pending");
      }
    } catch (error) {
      console.error("Failed to send connection request:", error);
    }
  };

  const hideConnectButton = connectionStatus === "accepted";
  const isPending = connectionStatus === "pending";

  return (
    <article className={`p-5 rounded-4xl mb-12 mt-4 bg-${theme} text-white flex flex-col justify-center gap-3 items-center`}>
      <div className="w-full relative flex items-end justify-end -mb-8">
        <button
          className="cursor-pointer hover:bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full transition-colors duration-200 ease-in-out"
          onClick={() => setShowContextMenu(!showContextMenu)}
        >
          <Icon name="More" size={24} className="invert" />
        </button>
        <ContextMenu show={showContextMenu} setShow={(e) => setShowContextMenu(e)}>
          {!currentUsersProfile ? (
            <>
              <Button
                text="Hide posts from this user"
                icon="EyeEmpty"
                variant="context-menu"
                fullWidth={true}
                onClick={() => alert("Indsæt funktionalitet")}
              />
              <div className="bg-white h-px mx-2"></div>
              <Button
                text="Report post"
                icon="ChatBubbleWarning"
                variant="context-menu"
                fullWidth={true}
                onClick={() => alert("Indsæt funktionalitet")}
              />
            </>
          ) : (
            <>
              <Button
                text="Saved"
                icon="BookmarkEmpty"
                variant="context-menu"
                fullWidth={true}
                onClick={() => alert("Indsæt funktionalitet")}
              />
              <div className="bg-white h-px mx-2"></div>
              <Button
                text="Archived"
                icon="Unlock"
                variant="context-menu"
                fullWidth={true}
                onClick={() => alert("Indsæt funktionalitet")}
              />
            </>
          )}
        </ContextMenu>
      </div>
      <section className="flex justify-center gap-1 items-center">
        <div className="flex flex-col items-center w-24 gap-1">
          <p className="text-lg">{connection_count}</p>
          <p className="text-xs">{connection_count === 1 ? "Connection" : "Connections"}</p>
        </div>

        <img src={image} className="w-36 h-36 rounded-full object-cover bg-gray-400  border-2 border-white" />
        <div className="flex flex-col items-center w-24 gap-1">
          <p className="text-lg">{post_count}</p>
          <p className="text-xs">{post_count === 1 ? "Post" : "Posts"}</p>
        </div>
      </section>
      <section className="flex flex-col items-center gap-2 flex-1">
        <div className="flex items-center gap-1">
          <h4 className="text-white! font-normal">{name}</h4>
          <Icon name="TwitterVerifiedBadge" size={20} />
        </div>
        <p className="text-xs">{bio}</p>
      </section>
      <section className="flex flex-row gap-4 w-full mt-1">
        {currentUsersProfile ? (
          <>
            <Link to={"/profile/edit"} className="w-full">
              <Button variant="primary-glass" text="Edit profile" fullWidth={true} />
            </Link>
            <Button
              variant="primary-glass"
              text="Share profile"
              fullWidth={true}
              onClick={() => navigator.share({ title: name, text: `Profile for ${name}. ${bio}`, url: `./profile/` })}
            />
          </>
        ) : (
          <>
            {!hideConnectButton && (
              <Button
                variant="primary-glass"
                text={isPending ? "Pending" : "Connect"}
                icon="AddCircle"
                fullWidth={true}
                disabled={isPending}
                onClick={handleConnect}
              />
            )}
            <Link to={`/chats/new?userId=${userId}`} className="w-full">
              <Button variant="primary-glass" text="Message" fullWidth={true} />
            </Link>
          </>
        )}
      </section>
    </article>
  );
}
