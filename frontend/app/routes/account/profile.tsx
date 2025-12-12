import { useState, Suspense } from "react";
import { useLoaderData, useSearchParams, useNavigate, Link, Await, useRouteError, isRouteErrorResponse } from "react-router";
import ProfileHeader from "./components/ProfileHeader";
import Tabs from "~/components/Tabs";
import About from "./components/About";
import Posts from "./components/Posts";
import { apiFetch } from "~/lib/apiFetch";
import type { MetaFunction } from "react-router";
import Button from "~/components/Button";
import PostRedacted from "~/components/PostRedacted";
import { getUserById, getUserPosts, getUserQuestions, getUserReviews } from "~/lib/data/userData";
import ErrorMessage from "~/components/ErrorMessage";
import ProfileHeaderRedacted from "./components/ProfileHeaderRedacted";

export const meta: MetaFunction = ({ matches }: { matches: any }) => {
  const routeData = matches.find((match: any) => match.id === "routes/account/profile")?.data as any;
  const profileName = routeData?.profile?.data?.name ?? "Profile";
  return [
    { title: `${profileName} | LineUp` },
    {
      property: "og:title",
      content: `${profileName} | LineUp`,
    },
  ];
};

export function ErrorBoundary() {
  const error = useRouteError();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="outer-wrapper">
      <ProfileHeaderRedacted />
      <ErrorMessage error="This is an error" />
    </div>
  );
}

export async function clientLoader({ params }: { params: { profileId: string } }) {
  const user = await getUserById(params.profileId);
  const userPosts = await getUserPosts(params.profileId);
  const userReviews = await getUserReviews(params.profileId);
  const userQuestions = await getUserQuestions(params.profileId);
  return {
    profile: user,
    user_posts: userPosts,
    reviews: userReviews,
    questions: userQuestions,
  };
}

export async function clientAction({ request, params }: { request: Request; params: { profileId: string } }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  // Extract form data
  const formData = await request.formData();
  const question = formData.get("question")?.toString();

  // Validate question content
  if (!question || !question.trim()) {
    return { error: "Question cannot be empty" };
  }

  try {
    const response = await apiFetch(`/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question.trim(),
        user_id: params.profileId,
      }),
    });

    // Check for validation errors (400)
    if (response.status === 400) {
      const error = await response.json();
      return { error: error.error || "Invalid question data" };
    }

    // Check for other errors
    if (!response.ok) {
      return { error: `Failed to submit question: ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export default function Profile() {
  // Access the profile from the loader
  const { profile, user_posts, reviews, questions } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(searchParams.get("show") === "posts" ? 1 : 0);

  const handleTabChange = (newTab: number) => {
    setTab(newTab);
    if (newTab === 1) {
      setSearchParams({ show: "posts" });
    } else {
      setSearchParams({ show: "about" });
    }
  };

  return (
    <div className="outer-wrapper">
      <Suspense fallback={<div className="flex flex-col gap-4 outer-wrapper">Profile Header</div>}>
        <Await resolve={profile} errorElement={<div>Profile Error</div>}>
          {(profile) => (
            <ProfileHeader
              name={profile.data.name}
              bio={profile.data.bio}
              // connection_count={profile.data.connections.length}
              post_count={user_posts.total_posts}
              image={profile.data.profile_image}
              theme={profile.data.theme}
              currentUsersProfile={false}
            />
          )}
        </Await>
      </Suspense>
      {/* // Tabs component, "About" and "Posts" - the current tab is held as a number in a state. */}
      <Tabs tabs={["About", "Posts"]} currentTab={tab} setTab={handleTabChange} />
      {/* // if tab is 0 we show about - otherwise we show posts. */}
      {tab === 0 ? (
        <About profile={profile.data} reviews={reviews.data} questions={questions.data} avg_user_rating={reviews.avg_rating} />
      ) : (
        <Posts posts={user_posts.data} />
      )}
    </div>
  );
}
