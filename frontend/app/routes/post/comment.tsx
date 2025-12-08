import type { CommentType } from "~/types/comment";
import { Link } from "react-router";
import Icon from "~/components/icon";
import { apiFetch } from "~/lib/apiFetch";

import { useState } from "react";

export default function Comment({ comment }: { comment: CommentType }) {
  const [likes, setLikes] = useState(comment.likeCount);
  const [likedByUser, setLikedByUser] = useState(comment.likedByCurrentUser);

  const handleLike = async () => {
    try {
      const response = await apiFetch(`/posts/${comment.id}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setLikes(data.totalLikes);
        setLikedByUser(true);
      } else {
        alert("Failed to like comment.");
      }
    } catch {
      alert("Error liking comment.");
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await apiFetch(`/posts/${comment.id}/likes`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setLikes(data.totalLikes);
        setLikedByUser(false);
      } else {
        alert("Failed to unlike comment.");
      }
    } catch {
      alert("Error unliking comment.");
    }
  };

  return (
    <div key={comment.id} className="mb-4 flex flex-col gap-1">
      <Link
        to={`/profile/${comment.user.id}`}
        className="flex flex-row gap-2 items-center hover:opacity-40 transition-opacity duration-400 ease-in-out"
      >
        <img src={comment.user.profile_image} className="w-6 h-6 rounded-full bg-gray-200" alt="profile picture" />
        <p className="text-sm text-neutral-grey">{comment.user.name}</p>
      </Link>
      {comment.content}
      <div className="flex justify-end gap-2">
        <div className="flex items-center gap-1">
          <button
            className="cursor-pointer hover:bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full transition-colors duration-200 ease-in-out"
            onClick={likedByUser ? () => handleUnlike() : () => handleLike()}
          >
            <Icon name={likedByUser ? "HeartFilled" : "Heart"} size={24} className="text-neutral-grey" />
          </button>
          <p className="text-sm text-neutral-grey">{likes}</p>
        </div>
        <button
          className="cursor-pointer hover:bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full transition-colors duration-200 ease-in-out"
          onClick={() => alert("Tilføj funktionalitet")}
        >
          <Icon name="Reply" size={24} className="text-neutral-grey" />
        </button>
      </div>
    </div>
  );
}
