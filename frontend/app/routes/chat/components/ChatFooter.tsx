import { Form } from "react-router";
import Icon from "~/components/icon";

export default function ChatFooter() {
  return (
    <footer className="outer-wrapper fixed bg-white bottom-0 left-0 right-0 w-full flex items-center justify-center p-6">
      <div className="flex gap-3 w-full max-w-full">
        <button className="relative opacity-80 text-white flex items-center justify-center w-12 h-12 hover:opacity-100 focus:opacity-100 cursor-pointer transition-opacity duration-200 ease-in-out shrink-0 after:content-[''] after:absolute after:inset-0 after:bg-neutral-grey after:rounded-full after:-z-10">
          <Icon name="Plus" size={20} />
        </button>
        <Form method="post" className="flex gap-3 flex-1">
          <input
            type="text"
            name="message"
            placeholder="Aa"
            className="bg-light-grey p-3 rounded-xl border border-neutral-grey flex-1 px-4"
          />
          <button
            type="submit"
            className="relative text-black flex items-center justify-center w-12 h-12 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 after:content-[''] after:absolute after:inset-0 after:bg-primary-yellow after:rounded-full after:-z-10 hover:after:bg-primary-yellow-hover focus:after:bg-primary-yellow-pressed"
          >
            <Icon name="SendDiagonal" size={20} />
          </button>
        </Form>
      </div>
    </footer>
  );
}
