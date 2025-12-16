import { Outlet, useLoaderData } from "react-router";
import { NavLink } from "react-router";
import { getUser } from "~/lib/data/userData";
import { getTags } from "~/lib/data/tagsData";
import { getGenres } from "~/lib/data/genresData";
import { getSkills } from "~/lib/data/skillsData";

export async function clientLoader(): Promise<{}> {
  try {
    const [user, tags, genres, skills] = await Promise.all([getUser(), getTags(), getGenres(), getSkills()]);
    return { user: user.data, tags: tags.data, genres: genres.data, error: null, skills: skills.data };
  } catch (error) {
    return { user: null, tags: [], genres: [], skills: [], error: "Failed to fetch data" };
  }
}

export default function Create() {
  const { user, tags, genres, skills } = useLoaderData();

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
        <Outlet context={{ tags, genres, skills, user }} />
      </div>
    </div>
  );
}
