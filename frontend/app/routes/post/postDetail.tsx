import Button from "~/components/Button";
import Icon from "~/components/icon";
import { useEffect, useRef, useState } from "react";
import { Form, Link, useLoaderData, useFetcher, useBlocker } from "react-router";
import Post from "~/components/Post";
import type { CommentType } from "~/types/comment";
import { apiFetch } from "~/lib/apiFetch";
import type { MetaFunction } from "react-router";
import Comment from "./comment";
import Input from "~/components/Input";

export const meta: MetaFunction = ({ matches }) => {
  const routeData = matches.find((match: any) => match.id === "routes/post/postDetail")?.loaderData as any;
  const postAuthor = routeData?.post?.user?.name ?? "Post";

  return [
    { title: `Post by ${postAuthor} | LineUp` },
    {
      property: "og:title",
      content: `Post by ${postAuthor} | LineUp`,
    },
  ];
};

export async function clientLoader({ params }: { params: { postId: string } }): Promise<{}> {
  const response = await apiFetch(`/posts/${params.postId}`);

  if (response.status === 404) {
    throw new Response("Post not Found", { status: 404 });
  }

  if (!response.ok) {
    throw new Error(`Failed to load post: ${response.status}`);
  }

  const result = await response.json();
  // Sort comments by "created" date (descending: newest first)
  if (result.data?.comments) {
    result.data.comments = result.data.comments.sort(
      (a: { created: string }, b: { created: string }) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );
  }

  return { post: result.data };
}

export async function clientAction({ request, params }: { request: Request; params: { postId: string } }) {
  const currentUser = localStorage.getItem("user_id");
  // Extract form data
  const formData = await request.formData();

  const content = formData.get("comment")?.toString();
  const parentId = formData.get("parentId")?.toString();

  try {
    const response = await apiFetch(`/posts/${params.postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content?.trim(),
        parentId: parentId,
      }),
    });

    // Check for validation errors (400)
    if (response.status === 400) {
      const error = await response.json();
      return { error: error.error || "Invalid data" };
    }

    // Check for other errors
    if (!response.ok) {
      return { error: `Failed to submit comment: ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export default function PostDetail() {
  const { post } = useLoaderData();
  const fetcher = useFetcher();
  const [replyTo, setReplyTo] = useState("");

  let formRef = useRef<HTMLFormElement>(null);
  const parentId = formRef.current?.elements?.namedItem("parentId");

  useEffect(() => {
    if (fetcher.data?.success) {
      formRef.current?.reset();
    }
  }, [fetcher.data]);

  const handleReply = (commentId: string, userName: string) => {
    const parentIdInput = formRef.current?.elements.namedItem("parentId") as HTMLInputElement;
    if (parentIdInput) {
      parentIdInput.value = commentId;
    }
    setReplyTo(userName);
  };

  const cancelReply = () => {
    const parentIdInput = formRef.current?.elements.namedItem("parentId") as HTMLInputElement;
    if (parentIdInput) {
      parentIdInput.value = "";
    }
    setReplyTo("");
  };

  return (
    <article className="outer-wrapper">
      <Post post={post} clickable={false} />
      <div className="px-8">
        <div className="flex border border-neutral-200 items-center rounded-lg px-1">
          {replyTo && replyTo.length > 0 && (
            <div className="bg-neutral-200 p-1.5 pl-2.5 rounded-full text-xs flex items-center gap-2">
              <p>@{replyTo}</p>
              <button
                className="cursor-pointer size-6 flex items-center justify-center rounded-full bg-neutral-300 hover:bg-neutral-100 transition-colors duration-200 ease-in-out"
                onClick={() => cancelReply()}
              >
                <Icon name="Close" size={16} />
              </button>
            </div>
          )}
          <fetcher.Form ref={formRef} method="post" className="flex items-center flex-1">
            <Input type="hidden" variant="comment" name="parentId" className="flex-1" />
            <Input variant="comment" name="comment" placeholder="Leave a comment..." className="flex-1" />
            <button
              type="submit"
              className="bg-primary-yellow w-8 h-8 rounded-lg flex items-center justify-center hover:bg-primary-yellow-hover focus:bg-primary-yellow-pressed cursor-pointer transition-colors duration-200 ease-in-out"
            >
              <Icon name="ArrowRight" />
            </button>
          </fetcher.Form>
        </div>
      </div>
      <div className="p-10 flex flex-col gap-6">
        {post?.comments.map((comment: CommentType) => (
          <Comment comment={comment} key={comment.id} onReply={() => handleReply(comment.id, comment.user.name)} />
        ))}
      </div>
    </article>
  );
}
