import { useState } from "react";
import { Form } from "react-router";
import Button from "~/components/Button";
import ContextMenu from "~/components/ContextMenu";
import Icon from "~/components/icon";

export default function ChatFooter() {
  const [showContextMenu, setShowContextMenu] = useState(false);

  // TODO: trigger data revalidation on message send (to show the new messages in the chat) - also needed on chatDetail and groupChatDetail

  return (
    <footer className="outer-wrapper fixed bg-white bottom-0 left-0 right-0 w-full flex items-center justify-center p-6">
      <div className="flex gap-3 w-full max-w-full">
        <div className="relative">
          <button
            onClick={() => setShowContextMenu(!showContextMenu)}
            className="relative opacity-80 text-white flex items-center justify-center w-12 h-12 hover:opacity-100 focus:opacity-100 cursor-pointer transition-opacity duration-200 ease-in-out shrink-0 after:content-[''] after:absolute after:inset-0 after:bg-neutral-grey after:rounded-full after:-z-10"
          >
            <Icon name="Plus" size={20} />
          </button>
          <ContextMenu show={showContextMenu} setShow={(e) => setShowContextMenu(e)} className="-top-40! left-12">
            <>
              <Button
                text="Attach a picture"
                icon="Camera"
                variant="context-menu"
                fullWidth={true}
                onClick={() => alert("Add functionality")}
              />
              <div className="bg-white h-px mx-2"></div>
              <Button
                text="Attach a file"
                icon="Attachment"
                variant="context-menu"
                fullWidth={true}
                onClick={() => alert("Add functionality")}
              />
              <Button
                text="Share location"
                icon="PinAlt"
                variant="context-menu"
                fullWidth={true}
                onClick={() => alert("Add functionality")}
              />
              <Button
                text="Survey"
                icon="StatsUpSquare"
                variant="context-menu"
                fullWidth={true}
                onClick={() => alert("Add functionality")}
              />
            </>
          </ContextMenu>
        </div>

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
