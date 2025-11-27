import { useLoaderData } from "react-router";

import CollaborationsFeed from "./components/CollaborationsFeed";
import CollaborationsFilter from "./components/CollaborationsFilter";

export async function clientLoader(): Promise<{}> {
  const collabResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/collaborations`
  );

  if (!collabResponse.ok) {
    throw new Error(`Failed to fetch collaborations: ${collabResponse.status}`);
  }

  const collaborations = await collabResponse.json();

  return { collaborations };
}

export default function Collaborations() {
  const { collaborations } = useLoaderData();

  return (
    <div className="flex flex-col gap-4 px-4 bg-light-grey">
      <CollaborationsFilter />
      <CollaborationsFeed collaborations={collaborations} />
    </div>
  );
}
