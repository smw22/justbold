import { useState } from "react";
import { useLoaderData, useSearchParams, useNavigate, Link } from "react-router";
import ProfileHeader from "./components/ProfileHeader";
import Tabs from "~/components/Tabs";
import About from "./components/About";
import Posts from "./components/Posts";
import { apiFetch } from "~/lib/apiFetch";
import type { MetaFunction } from "react-router";
import Button from "~/components/Button";
import ErrorMessage from "~/components/ErrorMessage";
import PostRedacted from "~/components/PostRedacted";

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

export async function clientLoader({ params }: { params: { profileId: string } }) {
  const profileResponse = await apiFetch(`/user/${params.profileId}`);
  let profileError = null;
  let postsError = null;
  let reviewsError = null;
  let questionsError = null;

  if (profileResponse.status === 404) {
    profileError = profileResponse.statusText;
    // throw new Response("Profile not found", { status: 404 });
  }
  const profile = await profileResponse.json();
  const postsResponse = await apiFetch(`/user/${params.profileId}/posts`);
  const reviewsResponse = await apiFetch(`/user/${params.profileId}/reviews`);
  const questionsResponse = await apiFetch(`/user/${params.profileId}/questions`);
  if (!profileResponse.ok) {
    profileError = "Error: Couldn't get profile.";
    // throw new Error("Unknown error.");
  }
  if (!reviewsResponse.ok) {
    reviewsError = "Error: Couldn't get reviews.";
    // throw new Error("Unknown error.");
  }
  if (!questionsResponse.ok) {
    questionsError = "Error: Couldn't get questions.";
    // throw new Error("Unknown error.");
  }
  if (!postsResponse.ok) {
    postsError = "Error: Couldn't get posts.";
  }

  const user_posts = await postsResponse?.json();
  const reviews = await reviewsResponse?.json();
  const questions = await questionsResponse?.json();

  return {
    profile,
    user_posts,
    reviews,
    questions,
    profileError,
    postsError,
    reviewsError,
    questionsError,
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
  const { profile, user_posts, reviews, questions, profileError, postsError, reviewsError, questionsError } = useLoaderData();
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
      {profileError || !profile ? (
        <>
          <ErrorMessage error={profileError} />
          <div className="flex flex-col">
            <img src="/images/monke.svg" className="max-w-40 w-full m-auto" />
            <h2>Something went wrong.</h2>

            <p>
              Looks like something went wrong on our end. Maybe the user doesn't exist?
              <br />
              In the meantime, you can check out some of our artists'&nbsp;
              <Link
                className="text-primary-yellow"
                target="_blank"
                to="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1&pp=ygULcmljayBhc3RsZXmgBwE%3D"
              >
                newest music
              </Link>
              .
            </p>
            <Button className="mt-4" variant="primary" text="Go back" onClick={() => navigate(-1)}></Button>
          </div>
        </>
      ) : (
        <>
          <div className="px-4">
            {/* // The profile header component */}
            <ProfileHeader
              name={profile.data.name}
              bio={profile.data.bio}
              //   connection_count={profile.data.connections.length}
              post_count={user_posts.total_posts}
              image={profile.data.profile_image}
              theme={profile.data.theme}
              currentUsersProfile={false}
            />
          </div>
          {/* // Tabs component, "About" and "Posts" - the current tab is held as a number in a state. */}
          <Tabs tabs={["About", "Posts"]} currentTab={tab} setTab={handleTabChange} />
          {/* // if tab is 0 we show about - otherwise we show posts. */}
          {tab === 0 ? (
            <About
              profile={profile.data}
              reviews={reviews.data}
              questions={questions.data}
              avg_user_rating={reviews.avg_rating}
              reviewsError={reviewsError}
              questionsError={questionsError}
            />
          ) : postsError ? (
            <div className="bg-white py-4 rounded-bl-3xl rounded-br-3xl">
              <ErrorMessage error={postsError} />
              <PostRedacted />
            </div>
          ) : (
            <Posts posts={user_posts.data} />
          )}
        </>
      )}
    </div>
  );
}
