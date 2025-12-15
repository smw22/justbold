import StoriesSlider from "./StoriesSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useLoaderData, useRouteError, Await, Link } from "react-router";
import { Suspense } from "react";
import PostsFeed from "./PostsFeed";
import type { MetaFunction } from "react-router";
import ErrorMessage from "~/components/ErrorMessage";
import Button from "~/components/Button";
import type { Collaboration } from "~/types/collaborations";

import { getAllCollaborations } from "~/lib/data/collaborationData";
import { getAllPosts } from "~/lib/data/postsData";
import CollaborationsSliderCard from "./components/CollaborationsSliderCard";
import CollaborationsSliderCardRedacted from "./components/CollaborationsSliderCardRedacted";
import PostRedacted from "~/components/PostRedacted";

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
      <div className="bg-light-grey">
        <div className="outer-wrapper py-6 overflow-hidden">
          <h2 className="px-4 font-semibold text-lg mb-4">Collaborations requests</h2>
          <Suspense
            fallback={
              <Swiper className="pl-4! overflow-visible!" spaceBetween={12} slidesPerView={1.25}>
                <SwiperSlide>
                  <CollaborationsSliderCardRedacted />
                </SwiperSlide>
                <SwiperSlide>
                  <CollaborationsSliderCardRedacted />
                </SwiperSlide>
                <SwiperSlide>
                  <CollaborationsSliderCardRedacted />
                </SwiperSlide>
              </Swiper>
            }
          >
            <Await resolve={collaborations} errorElement={<ErrorMessage error="Failed to load collaborations." />}>
              {(collaborations) => (
                <Swiper className="pl-4! overflow-visible!" spaceBetween={12} slidesPerView={1.25}>
                  {collaborations.data.map((collab: Collaboration) => (
                    <SwiperSlide key={collab.id} className="h-auto!">
                      <CollaborationsSliderCard collab={collab} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </Await>
          </Suspense>

          <div className="px-4 mt-4 flex itenms-center">
            <Link to="/collaborations" className="">
              <Button variant="primary" text="See all collaborations" />
            </Link>
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="flex flex-col gap-4 outer-wrapper">
            <PostRedacted />
            <PostRedacted />
            <PostRedacted />
          </div>
        }
      >
        <Await resolve={posts} errorElement={<ErrorMessage error="Failed to load posts." />}>
          {(posts) => <PostsFeed posts={posts.data} error="" />}
        </Await>
      </Suspense>
    </div>
  );
}
