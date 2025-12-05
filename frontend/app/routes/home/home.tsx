import StoriesSlider from "./StoriesSlider";
import { useLoaderData } from "react-router";
import CollaborationsSlider from "./CollaborationsSlider";
import PostsFeed from "./PostsFeed";
import { apiFetch } from "~/lib/apiFetch";
import type { MetaFunction } from "react-router";

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

export async function clientLoader(): Promise<{}> {
  // Get Collaborations
  const collabResponse = await apiFetch(`/collaborations`);

  if (!collabResponse.ok) {
    throw new Error(`Failed to fetch collaborations: ${collabResponse.status}`);
  }

  const collaborations = await collabResponse.json();

  // Get Posts
  const postsResponse = await apiFetch(`/posts`);

  if (!postsResponse.ok) {
    throw new Error(`Failed to fetch posts: ${postsResponse.status}`);
  }

  const posts = await postsResponse.json();

  return { collaborations, posts };
}

export default function Home() {
  const { collaborations, posts } = useLoaderData();

  return (
    <div className="flex flex-col gap-4">
      <StoriesSlider stories={stories} />
      <CollaborationsSlider collaborations={collaborations} />
      <PostsFeed posts={posts.data} />
    </div>
  );
}
