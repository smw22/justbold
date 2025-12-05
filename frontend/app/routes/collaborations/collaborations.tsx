import { useLoaderData } from "react-router";

import CollaborationsFeed from "./components/CollaborationsFeed";
import CollaborationsFilter from "./components/CollaborationsFilter";
import { apiFetch } from "~/lib/apiFetch";

export async function clientLoader(): Promise<{}> {
  const collabResponse = await apiFetch(`/collaborations`);

  if (!collabResponse.ok) {
    throw new Error(`Failed to fetch collaborations: ${collabResponse.status}`);
  }

  const collaborations = await collabResponse.json();

  return { collaborations };
}

export default function Collaborations() {
  const { collaborations } = useLoaderData();

  return (
    <div className="flex flex-col gap-4 px-4 outer-wrapper">
      <CollaborationsFilter />
      <CollaborationsFeed collaborations={collaborations} />
    </div>
  );
}
