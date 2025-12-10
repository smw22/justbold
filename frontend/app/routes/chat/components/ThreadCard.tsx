import type { Message } from "~/types/messages";
import type { Thread } from "~/types/threads";
import { Link } from "react-router";

export default function ThreadCard({
  threadData,
  messageData,
  isGroup,
}: {
  threadData: Thread;
  messageData: Message;
  isGroup?: boolean;
}) {
  const userId = localStorage.getItem("user_id");

  const route = isGroup ? `/chats/groups/${threadData.id}` : `/chats/${threadData.id}`;
  const otherUser = !isGroup && threadData.users ? threadData.users.find((u) => u.id !== userId) : null;

  const imageUrl = isGroup
    ? `https://img.icons8.com/?size=100&id=87221&format=png&color=000000`
    : otherUser?.profile_image || messageData.user.profile_image;

  const title = isGroup ? `Group ${threadData.id.slice(0, 8)}` : otherUser?.name || messageData.user.name;

  return (
    <Link to={route}>
      <div className="flex items-center p-6 border-b border-gray-300 hover:bg-gray-100 cursor-pointer gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-[60px] h-[60px] shrink-0">
            <img
              src={imageUrl}
              alt="Thread Avatar"
              className="w-full h-full object-cover rounded-full border border-gray-300 overflow-hidden"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-600 line-clamp-1">{messageData.content || "No messages yet"}</p>
          </div>
        </div>

        <div>
          {messageData.created ? (
            <p>{new Date(messageData.created).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
}
