import { redirect, useLoaderData } from "react-router";
import type { MetaFunction } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import MessagesHeader from "./components/MessagesHeader";
import ChatFooter from "./components/ChatFooter";

export const meta: MetaFunction = () => {
  return [{ title: "New conversation | LineUp" }, { property: "og:title", content: "New conversation | LineUp" }];
};

export async function clientLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    throw new Error("User ID is required");
  }

  // Fetch user data to get fresh profile info
  const userResponse = await apiFetch(`/user/${userId}`);
  if (!userResponse.ok) {
    throw new Error("Failed to load user");
  }

  const userData = await userResponse.json();
  return { otherUser: userData.data };
}

export async function clientAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const content = formData.get("message") as string;

  if (!content || content.trim().length === 0) {
    return { error: "Message cannot be empty" };
  }

  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Create new thread
  const threadResponse = await apiFetch("/threads", {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      content: content,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (!threadResponse.ok) {
    throw new Error("Failed to create thread");
  }

  const threadData = await threadResponse.json();
  if (!threadData.success) {
    return { error: threadData.message || "Failed to create thread" };
  }

  return redirect(`/chats/${threadData.data.id}`);
}

export default function ChatNew() {
  const { otherUser } = useLoaderData<typeof clientLoader>();

  return (
    <main className="outer-wrapper pb-28">
      <MessagesHeader otherUser={otherUser} isGroup={false} />
      <p className="text-sm text-neutral-grey p-2 text-center mx-auto">Write a message to start a conversation!</p>
      <ChatFooter />
    </main>
  );
}
