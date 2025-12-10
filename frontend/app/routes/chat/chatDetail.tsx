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

export default function Chat() {
  const { messages } = useLoaderData();
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
          <Bubble key={message.id} message={message} />
        ))}
      </div>
    </main>
  );
}

function Bubble({ message }: { message: Message }) {
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
    <div className="flex items-end gap-3">
      <img src={message.user.profile_image} alt="user avatar" className="w-7 h-7 rounded-full object-cover" />
      <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-light-grey px-4 py-3 text-black text-sm leading-snug shadow-sm">
        {message.content}
      </div>
    </div>
  );
}
