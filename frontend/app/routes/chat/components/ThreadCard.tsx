import Link from "~/assets/icons/Link";
import type { Message } from "~/types/messages";
import type { Thread } from "~/types/threads";

export default function ThreadCard({ threadData, messagesData }: { threadData: Thread; messagesData: Message }) {
  return (
    <Link to={`/chats/${threadData.id}`}>
      <div className="flex items-center p-6 border-b border-gray-300 hover:bg-gray-100 cursor-pointer gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-[60px] h-[60px]">
            <img src={messagesData.user.profile_image} alt="Thread Avatar" className="w-full" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{messagesData.user.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-1">{messagesData.content}</p>
          </div>
        </div>

        <div>
          <p>{new Date(messagesData.created).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} </p>
        </div>
      </div>
    </Link>
  );
}
