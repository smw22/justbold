import { useParams, useLoaderData, useActionData, useNavigation, useRouteError, Link, href, Outlet } from "react-router";
import ProfileHeader from "~/components/ProfileHeader";

export async function clientLoader({ params }: { params: { profileId: string } }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/users/${params.profileId}`);
  if (!response.ok) {
    throw new Error("Unknown error.");
  }

  if (response.status === 404) {
    throw new Response("Thread not found", { status: 404 });
  }

  // Check for other errors
  if (!response.ok) {
    throw new Error(`Failed to fetch thread: ${response.status}`);
  }

  const profile = await response.json();

  return {
    profile,
  };
}

export default function Users() {
  // Access the profile from the loader
  const { profile } = useLoaderData();

  return (
    <div>
      <ProfileHeader
        name={profile.data.name}
        bio={profile.data.bio}
        connection_count={profile.data.connections.length}
        post_count={0}
        image={profile.data.profile_image}
        theme={profile.data.theme}
      />
    </div>
  );
}
