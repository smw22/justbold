import type { Message } from "~/types/messages";
import type { Thread } from "~/types/threads";
import { Link } from "react-router";

export default function ThreadCard({ threadData, messageData }: { threadData: Thread; messageData: Message }) {
  return (
    <Link to={`/chats/${threadData.id}`}>
      <div className="flex items-center p-6 border-b border-gray-300 hover:bg-gray-100 cursor-pointer gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-[60px] h-[60px] flex-shrink-0">
            <img src={messageData.user.profile_image} alt="Thread Avatar" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{messageData.user.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-1">{messageData.content}</p>
          </div>
        </div>

        <div>
          <p>{new Date(messageData.created).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
      </div>
    </Link>
  );
}
