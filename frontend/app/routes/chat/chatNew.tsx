import { useLoaderData, useSearchParams } from "react-router";
import type { MetaFunction } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import MessagesHeader from "./components/MessagesHeader";

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

export default function ChatNew() {
  const { otherUser } = useLoaderData<typeof clientLoader>();

  return (
    <main className="outer-wrapper pb-28">
      <MessagesHeader otherUser={otherUser} isGroup={false} />
      <p className="text-sm text-neutral-grey p-2">Write a message to start a conversation!</p>
    </main>
  );
}
