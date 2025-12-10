import { Outlet, useLoaderData } from "react-router";
import { NavLink } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import AvatarHeader from "../../components/AvatarHeader";

export async function clientLoader(): Promise<{}> {
  const userResponse = await apiFetch(`/user/`);

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
      <div className="flex items-center justify-center gap-2">
        <NavLink
          to="/create/service"
          className={({ isActive }) => ` px-2 py-1 rounded-full ${isActive ? "bg-primary-yellow" : ""}`}
        >
          Service
        </NavLink>
        <NavLink
          to="/create/collaboration"
          className={({ isActive }) => `px-2 py-1 rounded-full ${isActive ? "bg-primary-yellow" : ""}`}
        >
          Collaboration
        </NavLink>
        <NavLink
          to="/create/post"
          className={({ isActive }) => `px-2 py-1 rounded-full ${isActive ? "bg-primary-yellow" : ""}`}
        >
          Post
        </NavLink>
        <NavLink
          to="/create/story"
          className={({ isActive }) => `px-2 py-1 rounded-full ${isActive ? "bg-primary-yellow" : ""}`}
        >
          Story
        </NavLink>
      </div>
      <div className="flex flex-col gap-4">
        <AvatarHeader imageUrl={user.profile_image} imageSize={40} title={user.name} color="black" />
        <Outlet context={{ tags, genres }} />
      </div>
    </div>
  );
}
