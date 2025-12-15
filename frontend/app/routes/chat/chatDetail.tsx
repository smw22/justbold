import { useLoaderData, useActionData } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import type { Message } from "~/types/messages";
import MessagesHeader from "./components/MessagesHeader";
import type { MetaFunction } from "react-router";
import ChatFooter from "./components/ChatFooter";
import ErrorMessage from "~/components/ErrorMessage";

export const meta: MetaFunction = () => {
  return [
    { title: "Chat Detail | LineUp" },
    {
      property: "og:title",
      content: "Chat Detail | LineUp",
    },
  ];
};

export async function clientLoader({ params }: { params: { threadId: string } }) {
  const threadId = params.threadId;
  let messagesError = null;

  if (!threadId) throw new Error("Thread ID is required");

  // To get userId, fetch current user
  const userResponse = await apiFetch(`/user`);
  if (!userResponse.ok) throw new Error(`Failed to load user: ${userResponse.status}`);
  const userResult = await userResponse.json();

  const userId = userResult.data.id;

  // To get the list of messages, fetch messages for the thread
  const messagesResponse = await apiFetch(`/messages?threadId=${threadId}&userId=${userId}`);

  if (!messagesResponse.ok) {
    throw new Error(`Failed to load messages: ${messagesResponse.status}`);
  }

  const messagesResult = await messagesResponse.json();
  if (!messagesResult.success || !messagesResult.data) {
    throw new Error(messagesResult.message || "Failed to load messages");
  }

  // To get thread information, fetch thread details
  const threadResponse = await apiFetch(`/threads/${threadId}`);
  if (!threadResponse.ok) {
    throw new Error(`Failed to load thread: ${threadResponse.status}`);
  }
  const threadResult = await threadResponse.json();
  if (!threadResult.success || !threadResult.data) {
    throw new Error(threadResult.message || "Failed to load thread");
  }

  // Get the other user from the first message (or any message)
  const thread = threadResult.data;
  const otherUser = thread.users.find((user: any) => user.id !== userId);

  return {
    messages: messagesResult.data,
    otherUser,
    isGroup: false,
    userId,
    messagesError,
  };
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

export default function ChatDetail() {
  const { messages, otherUser, isGroup, messagesError } = useLoaderData();
  const actionData = useActionData<typeof clientAction>();

  const firstMessage = messages ? messages[0] : null;
  const dateStr = firstMessage
    ? new Date(firstMessage.created).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    : "";

  return (
    <>
      <MessagesHeader otherUser={otherUser} isGroup={isGroup} />
      <main className="outer-wrapper pb-28 min-h-screen bg-white text-darkgrey px-5 py-6">
        <div className="flex m-auto mb-4">
          <p className="text-xs m-auto">{dateStr}</p>
        </div>
        <div className="flex flex-col space-y-3">
          <ErrorMessage error={messagesError} />
          {messages?.map((message: Message) => (
            <Bubble key={message.id} message={message} />
          ))}
          {actionData?.success === false && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              <strong>Error:</strong> {actionData.message || "Failed to send message"}
            </div>
          )}
        </div>
      </main>
      <ChatFooter />
    </>
  );
}

function Bubble({ message }: { message: Message }) {
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
    <div className="flex items-end gap-3">
      <img src={message.user.profile_image} alt="user avatar" className="w-7 h-7 rounded-full object-cover" />
      <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-light-grey px-4 py-3 text-black text-sm leading-snug shadow-sm">
        {message.content}
      </div>
    </div>
  );
}
