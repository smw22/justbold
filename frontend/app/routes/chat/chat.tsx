import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Chat with [INSERT USER NAME HERE] | LineUp" },
    {
      property: "og:title",
      content: "Chat [INSERT USER NAME HERE] | LineUp",
    },
  ];
};

type Message = {
  id: number;
  text: string;
  from: "me" | "friend";
};

const messages: Message[] = [
  { id: 1, text: "ok, so that was cool!", from: "me" },
  { id: 2, text: "yo that jam was fire 🔥", from: "friend" },
  { id: 3, text: "omg i know right? crazy vibes", from: "me" },
  { id: 4, text: "we def gotta record that version", from: "friend" },
  { id: 5, text: "the one after the second chorus", from: "friend" },
  { id: 6, text: "yep! I’ll clean up the synth line tonight and send you the file", from: "me" },
  { id: 7, text: "perfect. I’ll layer some guitar over it and see if we can make it a full track", from: "friend" },
];

export default function Chat() {
  return (
    <main className="outer-wrapper min-h-screen bg-white text-darkgrey px-5 py-6">
      <div className="flex m-auto mb-4">
        <p className="text-xs m-auto">Thu, 22 Jun</p>
      </div>
      <div className="flex flex-col space-y-3">
        {messages.slice(0, 7).map((message) => (
          <Bubble key={message.id} message={message} />
        ))}
      </div>
    </main>
  );
}

function Bubble({ message }: { message: Message }) {
  const isMe = message.from === "me";

  if (isMe) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-header-bg-4 px-4 py-3 text-white text-sm leading-snug shadow-sm">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-3">
      <img
        src="https://avatar.iran.liara.run/public"
        alt="user avatar"
        className="w-[28px] h-[28px] rounded-full object-cover"
      />
      <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-light-grey px-4 py-3 text-black text-sm leading-snug shadow-sm">
        {message.text}
      </div>
    </div>
  );
}
