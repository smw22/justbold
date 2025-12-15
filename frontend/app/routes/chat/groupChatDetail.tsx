import { useActionData, useLoaderData } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import type { Message } from "~/types/messages";
import MessagesHeader from "./components/MessagesHeader";
import type { MetaFunction } from "react-router";
import ChatFooter from "./components/ChatFooter";
import ErrorMessage from "~/components/ErrorMessage";

export const meta: MetaFunction = () => {
  return [
    { title: "Group Chat Detail | LineUp" },
    {
      property: "og:title",
      content: "Group Chat Detail | LineUp",
    },
  ];
};

export async function clientLoader({ params }: { params: { threadId: string } }) {
  const threadId = params.threadId;

  let messagesError = null;

  if (!threadId) throw new Error("Thread ID is required");

  const userResponse = await apiFetch(`/user`);
  if (!userResponse.ok) throw new Error(`Failed to load user: ${userResponse.status}`);
  const userResult = await userResponse.json();

  const userId = userResult.data.id;

  const response = await apiFetch(`/messages?threadId=${threadId}&userId=${userId}`);

  if (!response.ok) {
    messagesError = `Failed to load messages: ${response.status}`;
    // throw new Error(`Failed to load messages: ${response.status}`);
  }

  const result = await response.json();
  if (!result.success || !result.data) {
    messagesError = result.message || "Failed to load messages";
    // throw new Error(result.message || "Failed to load messages");
  }

  return { messages: result.data, threadId, isGroup: true, userId, messagesError };
}

export async function clientAction({ params, request }: { params: { threadId: string }; request: Request }) {
  const threadId = params.threadId;
  const formData = await request.formData();
  const message = formData.get("message");

  if (!message || typeof message !== "string" || message.trim() === "") {
    return { success: false, message: "Message cannot be empty" };
  }

  const messageResponse = await apiFetch(`/messages?threadId=${threadId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: message }),
  });

  if (!messageResponse.ok) {
    const error = await messageResponse.json();
    return { success: false, message: error.message || "Failed to send message" };
  }

  const messageData = await messageResponse.json();
  return { success: true, message: messageData.data };
}

export default function GroupChatDetail() {
  const { messages, threadId, isGroup, messagesError } = useLoaderData<typeof clientLoader>();
  const actionData = useActionData<typeof clientAction>();

  const firstMessage = messages ? messages[0] : null;
  const dateStr = firstMessage
    ? new Date(firstMessage.created).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    : "";

  return (
    <>
      <MessagesHeader threadId={threadId} isGroup={isGroup} />
      <main className="outer-wrapper pb-28 min-h-screen bg-white text-darkgrey px-5 py-6">
        <div className="flex m-auto mb-4">
          <p className="text-xs m-auto">{dateStr}</p>
        </div>
        <div className="flex flex-col space-y-3">
          <ErrorMessage error={messagesError} />
          {actionData?.success === false && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              <strong>Error:</strong> {actionData.message || "Failed to send message"}
            </div>
          )}
          {messages?.map((message: Message) => (
            <GroupBubble key={message.id} message={message} />
          ))}
        </div>
      </main>
      <ChatFooter />
    </>
  );
}

function GroupBubble({ message }: { message: Message }) {
  const { userId } = useLoaderData<typeof clientLoader>();
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
