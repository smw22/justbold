import StoriesSlider from "./StoriesSlider";
import { useLoaderData, useRouteError, Await } from "react-router";
import { Suspense } from "react";
import CollaborationsSlider from "./CollaborationsSlider";
import PostsFeed from "./PostsFeed";
import type { MetaFunction } from "react-router";
import ErrorMessage from "~/components/ErrorMessage";

import { getAllCollaborations } from "~/lib/data/collaborationData";
import { getAllPosts } from "~/lib/data/postsData";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | LineUp" },
    {
      property: "og:title",
      content: "Home | LineUp",
    },
    // {
    //   name: "description",
    //   content: "This app is the best",
    // },
  ];
};

export function ErrorBoundary() {
  const error = useRouteError();

  const isNotFound = error?.status === 404;

  return (
    <div className="bg-red-500">
      <h2>{isNotFound ? "Thread Not Found" : "Something Went Wrong"}</h2>
      <p>
        {isNotFound
          ? "This conversation may have been deleted or never existed."
          : error?.message || "An unexpected error occurred."}
      </p>
    </div>
  );
}

const stories = [
  { id: 1, userName: "Alice", imageUrl: "https://unsplash.it/640/425?1" },
  { id: 2, userName: "Bob", imageUrl: "https://unsplash.it/640/425?2" },
  { id: 3, userName: "Charlie", imageUrl: "https://unsplash.it/640/425?3" },
  { id: 4, userName: "Diana", imageUrl: "https://unsplash.it/640/425?4" },
  { id: 5, userName: "Eve", imageUrl: "https://unsplash.it/640/425?5" },
  { id: 6, userName: "Frank", imageUrl: "https://unsplash.it/640/425?6" },
  { id: 7, userName: "Grace", imageUrl: "https://unsplash.it/640/425?7" },
  { id: 8, userName: "Heidi", imageUrl: "https://unsplash.it/640/425?8" },
  { id: 9, userName: "Ivan", imageUrl: "https://unsplash.it/640/425?9" },
  { id: 10, userName: "Judy", imageUrl: "https://unsplash.it/640/425?10" },
];

export async function clientLoader() {
  const collaborations = getAllCollaborations();
  const posts = getAllPosts();

  return {
    collaborations,
    posts,
  };
}

export default function Home() {
  const { collaborations, posts } = useLoaderData();

  return (
    <div className="flex flex-col gap-4">
      <StoriesSlider stories={stories} />
      <Suspense fallback={<div className="h-32">Loading collaborations...</div>}>
        <Await resolve={collaborations} errorElement={<ErrorMessage error="Failed to load collaborations." />}>
          {(collaborations) => <CollaborationsSlider collaborations={collaborations} error="" />}
        </Await>
      </Suspense>
      <Suspense fallback={<div className="h-32">Loading posts...</div>}>
        <Await resolve={posts} errorElement={<ErrorMessage error="Failed to load posts." />}>
          {(posts) => <PostsFeed posts={posts.data} error="" />}
        </Await>
      </Suspense>
    </div>
  );
}
