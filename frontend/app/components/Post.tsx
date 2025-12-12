import { useState, useEffect } from "react";
import type { PostType } from "~/types/post";
import { Link } from "react-router";
import Icon from "./icon";
import ContextMenu from "./ContextMenu";
import Button from "./Button";
import CardMedia from "./CardMedia";
import { apiFetch } from "~/lib/apiFetch";

export default function Post({ post, clickable = true }: { post: PostType; clickable?: boolean }) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [likes, setLikes] = useState(post.totalLikes);
  const [likedByUser, setLikedByUser] = useState(post.likedByCurrentUser);

  const handleLike = async () => {
    try {
      const response = await apiFetch(`/posts/${post.id}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setLikes(data.totalLikes);
        setLikedByUser(true);
      } else {
        alert("Failed to like post.");
      }
    } catch {
      alert("Error liking post.");
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await apiFetch(`/posts/${post.id}/likes`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setLikes(data.totalLikes);
        setLikedByUser(false);
      } else {
        alert("Failed to like post.");
      }
    } catch {
      alert("Error liking post.");
    }
  };

  // Helper: format names like "Jean and Guy" or "Jean, Guy and Anna"
  const formatNames = (names: string[]) => {
    if (names.length === 0) return "";
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;
    return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
  };

  // Prefer members/users array if present, else fall back to the single author
  const extraUsers = (post.users ?? []).filter((user: { id: string }) => user.id !== post.user.id);
  const allDisplayUsers = [post.user, ...extraUsers];
  const allNames = allDisplayUsers.map((u) => u.name);

  return (
    <div
      className="bg-white flex flex-col gap-4 w-full items-start overflow-hidden p-4 md:p-8"
      style={{ viewTransitionName: `post-${post.id}` }}
    >
      <div className={`flex flex-row items-center w-full px-2 gap-2`}>
        <div className={`${post.tags.length > 1 ? "flex flex-col flex-1 gap-2" : "flex flex-row items-center gap-2 w-full"}`}>
          <Link
            to={`/profile/${post.user.id}`}
            className="flex flex-row gap-2 items-center hover:opacity-40 transition-opacity duration-400 ease-in-out"
          >
            {/* Stacked avatars */}
            <div className="flex -space-x-2">
              {allDisplayUsers.slice(0, 4).map((user) => (
                <img
                  key={user.id}
                  src={user.profile_image}
                  className="w-8 h-8 bg-black object-cover rounded-full ring-2 ring-white"
                  alt=""
                />
              ))}
              {allDisplayUsers.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-neutral-200 text-xs flex items-center justify-center ring-2 ring-white">
                  +{allDisplayUsers.length - 4}
                </div>
              )}
            </div>
            <p className="text-sm">{formatNames(allNames)}</p>
          </Link>
          <div className="flex flex-1 gap-2 text-neutral-grey flex-wrap">
            {post.tags.map((tag) => (
              <div className="border border-neutral-grey py-0 px-2 rounded-full text-sm " key={tag.title}>
                #{tag.title}
              </div>
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
      {clickable ? (
        // if the post is clickable. and therefore can take the user to the details page of the post.
        <Link to={`/posts/${post.id}`} className="gap-4 flex flex-col w-full" viewTransition>
          <h2 className="px-2">{post.title}</h2>
          <CardMedia variant="image" url={post.media} />
          <p className="text-sm px-2">{post.content}</p>
        </Link>
      ) : (
        <>
          <h2 className="px-2">{post.title}</h2>
          <CardMedia variant="image" url={post.media} />
          <p className="text-sm px-2">{post.content}</p>
        </>
      )}

      <div className="px-2 flex gap-4">
        <div className="flex items-center gap-1">
          <button
            className="cursor-pointer hover:bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full transition-colors duration-200 ease-in-out"
            onClick={likedByUser ? () => handleUnlike() : () => handleLike()}
          >
            <Icon name={likedByUser ? "HeartFilled" : "Heart"} size={24} className="text-neutral-grey" />
          </button>
          <p className="text-sm text-neutral-grey">{likes}</p>
        </div>
        <div className="flex items-center gap-1">
          {clickable ? (
            <Link to={`/posts/${post.id}`}>
              <button className="cursor-pointer hover:bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full transition-colors duration-200 ease-in-out">
                <Icon name="MultiBubble" size={24} className="text-neutral-grey" />
              </button>
            </Link>
          ) : (
            <button className="cursor-pointer hover:bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full transition-colors duration-200 ease-in-out">
              <Icon name="MultiBubble" size={24} className="text-neutral-grey" />
            </button>
          )}
          <p className="text-sm text-neutral-grey">{post.comments.length}</p>
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
