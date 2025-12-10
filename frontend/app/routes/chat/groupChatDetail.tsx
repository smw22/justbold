import { useLoaderData } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import type { Message } from "~/types/messages";

export async function clientLoader({ params }: { params: { threadId: string } }) {
  const threadId = params.threadId;
  if (!threadId) throw new Error("Thread ID is required");

  const response = await apiFetch(`/messages?threadId=${threadId}`);

  if (!response.ok) {
    throw new Error(`Failed to load messages: ${response.status}`);
  }

  const result = await response.json();
  if (!result.success || !result.data) {
    throw new Error(result.message || "Failed to load messages");
  }

  return { messages: result.data };
}

export default function GroupChat() {
  const { messages } = useLoaderData<typeof clientLoader>();
  const firstMessage = messages[0];
  const dateStr = firstMessage
    ? new Date(firstMessage.created).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    : "";

  return (
    <main className="outer-wrapper min-h-screen bg-white text-darkgrey px-5 py-6">
      <div className="flex m-auto mb-4">
        <p className="text-xs m-auto">{dateStr}</p>
      </div>
      <div className="flex flex-col space-y-3">
        {messages.map((message: Message) => (
          <GroupBubble key={message.id} message={message} />
        ))}
      </div>
    </main>
  );
}

function GroupBubble({ message }: { message: Message }) {
  const userId = localStorage.getItem("user_id");
  const isMe = message.user.id === userId;

  if (isMe) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-header-bg-4 px-4 py-3 text-white text-sm leading-snug shadow-sm">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <img src={message.user.profile_image} alt={message.user.name} className="w-7 h-7 rounded-full object-cover" />
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold text-gray-600">{message.user.name}</p>
        <div className="max-w-[78%] rounded-2xl rounded-tl-sm bg-light-grey px-4 py-3 text-black text-sm leading-snug shadow-sm">
          {message.content}
        </div>
      </div>
    </div>
  );
}
