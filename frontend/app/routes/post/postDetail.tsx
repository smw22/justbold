import Button from "~/components/Button";
import Icon from "~/components/icon";
import { Link, useLoaderData } from "react-router";
import Post from "~/components/Post";
import type { CommentType } from "~/types/comment";
import { apiFetch } from "~/lib/apiFetch";

export async function clientLoader({ params }: { params: { postId: string } }): Promise<{}> {
  const response = await apiFetch(`/posts/${params.postId}`);

  if (response.status === 404) {
    throw new Response("Post not Found", { status: 404 });
  }

  if (!response.ok) {
    throw new Error(`Failed to load post: ${response.status}`);
  }

  const result = await response.json();

  return { post: result.data };
}

export default function PostDetail() {
  const { post } = useLoaderData();

  return (
    <article className="outer-wrapper">
      <Post post={post} clickable={false} />
      <div className="p-10">
        {post?.comments.map((comment: CommentType) => (
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
                  onClick={() => alert("Tilføj funktionalitet")}
                >
                  <Icon name="Heart" size={24} className="text-neutral-grey" />
                </button>
                <p className="text-sm text-neutral-grey">{comment.likes.length}</p>
              </div>
              <button
                className="cursor-pointer hover:bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full transition-colors duration-200 ease-in-out"
                onClick={() => alert("Tilføj funktionalitet")}
              >
                <Icon name="Reply" size={24} className="text-neutral-grey" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
