import { useState } from "react";
import type { PostType } from "~/types/post";
import { Link } from "react-router";
import Icon from "./icon";
import ContextMenu from "./ContextMenu";
import Button from "./Button";
import CardMedia from "./CardMedia";

export default function Post({ post }: { post: PostType }) {
  const [showContextMenu, setShowContextMenu] = useState(false);

  console.log(post);
  return (
    <div className="bg-white flex flex-col gap-4 w-full items-start overflow-hidden p-4 md:p-8">
      <div className={`flex flex-row items-center w-full px-2 gap-2`}>
        <div className={`${post.tags.length > 1 ? "flex flex-col flex-1 gap-2" : "flex flex-row items-center gap-2 w-full"}`}>
          <Link
            to={`/profile/${post.user.id}`}
            className="flex flex-row gap-2 items-center hover:opacity-40 transition-opacity duration-400 ease-in-out"
          >
            <div
              style={{ backgroundImage: `url('${post.user.profile_image}')` }}
              className="w-8 h-8 bg-black bg-cover rounded-full min-w-8"
            ></div>
            <p className="text-sm">{post.user.name}</p>
          </Link>
          <div className="flex flex-1 gap-2 text-neutral-grey flex-wrap">
            {post.tags.map((tag) => (
              <div className="border border-neutral-grey py-0 px-2 rounded-full text-sm ">#{tag.title}</div>
            ))}
          </div>
        </div>
        <div className="relative">
          <button
            className="cursor-pointer hover:bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full transition-colors duration-200 ease-in-out"
            onClick={() => setShowContextMenu(!showContextMenu)}
          >
            <Icon name="More" size={24} />
          </button>
          <ContextMenu show={showContextMenu} setShow={(e) => setShowContextMenu(e)}>
            <Button
              text="Save post"
              icon="BookmarkEmpty"
              variant="context-menu"
              fullWidth={true}
              onClick={() => alert("Indsæt funktionalitet")}
            />
            <div className="bg-white h-px mx-2"></div>
            <Button
              text="Share post"
              icon="ShareIos"
              variant="context-menu"
              fullWidth={true}
              onClick={() => alert("Indsæt funktionalitet")}
            />
            <div className="bg-white h-px mx-2"></div>
            <Button
              text="Hide posts from this user"
              icon="EyeEmpty"
              variant="context-menu"
              fullWidth={true}
              onClick={() => alert("Indsæt funktionalitet")}
            />
            <div className="bg-white h-px mx-2"></div>
            <Button
              text="Report post"
              icon="ChatBubbleWarning"
              variant="context-menu"
              fullWidth={true}
              onClick={() => alert("Indsæt funktionalitet")}
            />
          </ContextMenu>
        </div>
      </div>
      <h2 className="px-2">{post.title}</h2>
      <CardMedia variant="image" url={post.media} />
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
