import Icon from "~/components/icon";

export default function ChatFooter() {
  return (
    <footer>
      <button className="bg-neutral-grey opacity-80 text-white rounded-full p-3 fixed bottom-6 left-1/2 -translate-x-1/2 hover:opacity-100 focus:opacity-100 cursor-pointer transition-opacity duration-400 ease-in-out">
        <Icon name="Plus" size={24} />
      </button>
    </footer>
  );
}
