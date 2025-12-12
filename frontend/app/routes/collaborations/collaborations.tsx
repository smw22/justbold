import { useLoaderData, Await } from "react-router";
import { Suspense } from "react";
import CollaborationsFeed from "./components/CollaborationsFeed";
import CollaborationsFilter from "./components/CollaborationsFilter";
import CollaborationsCardRedacted from "./components/CollaborationsCardRedacted";

import type { MetaFunction } from "react-router";
import ErrorMessage from "~/components/ErrorMessage";
import { getAllCollaborations } from "~/lib/data/collaborationData";

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

export async function clientLoader() {
  const collaborations = getAllCollaborations();

  return {
    collaborations,
  };
}

export default function Collaborations() {
  const { collaborations } = useLoaderData();

  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-4 px-4 outer-wrapper">
          <CollaborationsCardRedacted />
          <CollaborationsCardRedacted />
          <CollaborationsCardRedacted />
        </div>
      }
    >
      <Await resolve={collaborations} errorElement={<ErrorMessage error="Failed to load collaborations." />}>
        <div className="flex flex-col gap-4 px-4 outer-wrapper">
          <CollaborationsFilter />
          {(collaborations) => <CollaborationsFeed collaborations={collaborations} />}
        </div>
      </Await>
    </Suspense>
  );
}
