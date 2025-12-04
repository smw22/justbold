import { Outlet, useLoaderData } from "react-router";
import { Link } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import AvatarHeader from "../services/components/AvatarHeader";

export async function clientLoader(): Promise<{}> {
  const userId = localStorage.getItem("user_id");

  const userResponse = await apiFetch(`/users/${userId}`);

  if (!userResponse.ok) {
    throw new Error(`Failed to load user: ${userResponse.status}`);
  }

  const user = await userResponse.json();

  const tagResponse = await apiFetch(`/tags`);

  if (!tagResponse.ok) {
    throw new Error(`Failed to load tags: ${tagResponse.status}`);
  }

  const tags = await tagResponse.json();

  const genreResponse = await apiFetch(`/genres`);

  if (!genreResponse.ok) {
    throw new Error(`Failed to load genres: ${genreResponse.status}`);
  }

  const genre = await genreResponse.json();

  return { user: user.data, tags: tags.data, genres: genre.data };
}

export default function Create() {
  const { user, tags, genres } = useLoaderData();
  return (
    <div className="outer-wrapper px-4 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link to="/create/service" className="bg-primary-yellow underline">
          Service
        </Link>
        <Link to="/create/collaboration" className="bg-primary-yellow underline">
          Collaboration
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <AvatarHeader imageUrl={user.profile_image} imageSize={40} title={user.name} />
        <Outlet context={{ tags, genres }} />
      </div>
    </div>
  );
}
