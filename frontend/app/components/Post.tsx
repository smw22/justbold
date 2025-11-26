import { useState } from "react";
import type { PostType } from "~/types/post";
import { Link } from "react-router";
import Icon from "./icon";
import ContextMenu from "./ContextMenu";
import Button from "./Button";

export default function Post({ post }: { post: PostType }) {
  const [showContextMenu, setShowContextMenu] = useState(false);

  return (
    <div className="bg-white flex flex-col gap-4 w-full items-start overflow-hidden p-4 md:p-8">
      <div className="flex flex-row w-full items-center px-2 gap-2">
        <Link to={`/profile/${post?.user_id}`} className="flex flex-row gap-2 items-center">
          <div className="w-8 h-8 bg-black rounded-full min-w-8"></div>
          <p className="text-sm">Placeholder Name</p>
        </Link>
        <div className="flex flex-1 gap-2 text-neutral-grey">
          {post.tags.map((tag) => (
            <div className="border border-neutral-grey py-0 px-2 rounded-full text-sm">#{tag}</div>
          ))}
        </div>
        <div className="relative">
          <button
            className="cursor-pointer hover:bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full transition-colors duration-200 ease-in-out"
            onClick={() => setShowContextMenu(!showContextMenu)}
          >
            <Icon name="More" size={24} />
          </button>
          <ContextMenu show={showContextMenu} setShow={(e) => setShowContextMenu(e)}>
            <Button text="Save post" icon="BookmarkEmpty" variant="context-menu" fullWidth={true} onClick={() => alert("Indsæt funktionalitet")} />
            <div className="bg-white h-px mx-2"></div>
            <Button text="Share post" icon="ShareIos" variant="context-menu" fullWidth={true} onClick={() => alert("Indsæt funktionalitet")} />
            <div className="bg-white h-px mx-2"></div>
            <Button text="Hide posts from this user" icon="EyeEmpty" variant="context-menu" fullWidth={true} onClick={() => alert("Indsæt funktionalitet")} />
            <div className="bg-white h-px mx-2"></div>
            <Button text="Report post" icon="ChatBubbleWarning" variant="context-menu" fullWidth={true} onClick={() => alert("Indsæt funktionalitet")} />
          </ContextMenu>
        </div>
      </div>
      <h2 className="px-2">{post.title}</h2>
      <div className="w-full bg-cover aspect-video rounded-3xl" style={{ backgroundImage: `url('${post.media}')` }}></div>
      <p className="text-sm px-2">{post.content}</p>
      <div className="px-2 flex gap-4">
        <div className="flex items-center gap-1">
          <button
            className="cursor-pointer hover:bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full transition-colors duration-200 ease-in-out"
            onClick={() => alert("Tilføj funktionalitet")}
          >
            <Icon name="Heart" size={24} className="text-neutral-grey" />
          </button>
          <p className="text-sm text-neutral-grey">X</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="cursor-pointer hover:bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full transition-colors duration-200 ease-in-out"
            onClick={() => alert("Tilføj funktionalitet")}
          >
            <Icon name="MultiBubble" size={24} className="text-neutral-grey" />
          </button>
          <p className="text-sm text-neutral-grey">X</p>
        </div>
        <button
          className="cursor-pointer hover:bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full transition-colors duration-200 ease-in-out"
          onClick={() => alert("Tilføj funktionalitet")}
        >
          <Icon name="ArrowEmailForward" size={24} className="text-neutral-grey" />
        </button>
      </div>
    </div>
  );
}
