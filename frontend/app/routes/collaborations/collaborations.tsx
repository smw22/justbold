import { useLoaderData } from "react-router";

import CollaborationsFeed from "./components/CollaborationsFeed";
import CollaborationsFilter from "./components/CollaborationsFilter";
import CollaborationsCardRedacted from "./components/CollaborationsCardRedacted";
import { apiFetch } from "~/lib/apiFetch";

import type { MetaFunction } from "react-router";
import ErrorMessage from "~/components/ErrorMessage";

export const meta: MetaFunction = () => {
  return [
    { title: "Collaborations | LineUp" },
    {
      property: "og:title",
      content: "Collaborations | LineUp",
    },
    // {
    //   name: "description",
    //   content: "This app is the best",
    // },
  ];
};

export async function clientLoader(): Promise<{}> {
  const collabResponse = await apiFetch(`/collaboration`);
  let collaborationsError = null;

  if (!collabResponse.ok) {
    collaborationsError = `Failed to load collaborations: ${collabResponse.statusText}`;
    // throw new Error(`Failed to fetch collaborations: ${collabResponse.status}`);
  }

  const collaborations = await collabResponse?.json();

  return { collaborations, collaborationsError };
}

export default function Collaborations() {
  const { collaborations, collaborationsError } = useLoaderData();

  return (
    <div className="flex flex-col gap-4 px-4 outer-wrapper">
      <ErrorMessage error={collaborationsError} />
      {collaborations && collaborations.data ? (
        <>
          <CollaborationsFilter />
          <CollaborationsFeed collaborations={collaborations} />
        </>
      ) : (
        <>
          <CollaborationsCardRedacted />
          <CollaborationsCardRedacted />
          <CollaborationsCardRedacted />
        </>
      )}
    </div>
  );
}
