import Button from "~/components/Button";
import Icon from "~/components/icon";
import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import Post from "~/components/Post";
import type { CommentType } from "~/types/comment";
import { apiFetch } from "~/lib/apiFetch";
import type { MetaFunction } from "react-router";
import Comment from "./comment";

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

  return { post: result.data };
}

export default function PostDetail() {
  const { post } = useLoaderData();

  return (
    <article className="outer-wrapper">
      <Post post={post} clickable={false} />
      <div className="p-10">
        {post?.comments.map((comment: CommentType) => (
          <Comment comment={comment} />
        ))}
      </div>
    </article>
  );
}
