import { useState } from "react";
import { useLoaderData } from "react-router";
import ProfileHeader from "./components/ProfileHeader";
import Tabs from "~/components/Tabs";
import About from "./components/About";
import Posts from "./components/Posts";
import { apiFetch } from "~/lib/apiFetch";

export async function clientLoader({ params }: { params: { profileId: string } }) {
  const profileResponse = await apiFetch(`/users/${params.profileId}`);
  const postsResponse = await apiFetch(`/users/${params.profileId}/posts`);
  const reviewsResponse = await apiFetch(`/users/${params.profileId}/reviews`);
  const questionsResponse = await apiFetch(`/users/${params.profileId}/questions`);
  if (!profileResponse.ok || !postsResponse.ok || !reviewsResponse.ok || !questionsResponse.ok) {
    throw new Error("Unknown error.");
  }

  if (profileResponse.status === 404) {
    throw new Response("Profile not found", { status: 404 });
  }

  const profile = await profileResponse.json();
  const user_posts = await postsResponse.json();
  const reviews = await reviewsResponse.json();
  const questions = await questionsResponse.json();

  return {
    profile,
    user_posts,
    reviews,
    questions,
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
    const response = await fetch(`${apiUrl}/questions`, {
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
  const [tab, setTab] = useState(0);

  return (
    <div className="outer-wrapper">
      <div className="px-4">
        {/* // The profile header component */}
        <ProfileHeader
          name={profile.data.name}
          bio={profile.data.bio}
          connection_count={profile.data.connections.length}
          post_count={user_posts.total_posts}
          image={profile.data.profile_image}
          theme={profile.data.theme}
        />
      </div>
      {/* // Tabs component, "About" and "Posts" - the current tab is held as a number in a state. */}
      <Tabs tabs={["About", "Posts"]} currentTab={tab} setTab={(e) => setTab(e)} />
      {/* // if tab is 0 we show about - otherwise we show posts. */}
      {tab === 0 ? (
        <About profile={profile.data} reviews={reviews.data} questions={questions.data} avg_user_rating={reviews.avg_rating} />
      ) : (
        <Posts posts={user_posts.data} />
      )}
    </div>
  );
}
