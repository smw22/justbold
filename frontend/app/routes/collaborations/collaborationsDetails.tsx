import { useLoaderData, Link, Await } from "react-router";
import Badge from "~/components/Badge";
import Icon from "~/components/icon";
import { apiFetch } from "~/lib/apiFetch";
import Button from "~/components/Button";

import type { MetaFunction } from "react-router";
import fromNowDate from "~/lib/fromNowDate";
import { getCollaboration } from "~/lib/data/collaborationData";
import { Suspense } from "react";

export const meta: MetaFunction = ({ matches }) => {
  const routeData = matches.find((match: any) => match.id === "routes/collaborations/collaborationsDetails")?.loaderData as any;
  const collabTitle = routeData?.collaboration?.data?.title ?? "Collaboration";

  return [
    { title: `${collabTitle} | LineUp` },
    {
      property: "og:title",
      content: `${collabTitle} | LineUp`,
    },
  ];
};

export async function clientLoader({ params }: { params: { collaborationId: string } }): Promise<{}> {
  const collaboration = await getCollaboration(params.collaborationId);

  return { collaboration };
}

function CollabHeader({
  userName,
  userImage,
  role,
  created,
}: {
  userName: string;
  userImage: string;
  role: string;
  created: Date;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 flex-wrap">
        <div className="flex items-center gap-1">
          <img className="size-10 rounded-full" src={userImage} alt={userName} />
          <span className="">{userName.split(" ")[0]}</span>
        </div>
        <span className="text-gray-400">looking for a</span>
        <span className="text-gray-400">#{role}</span>
      </div>
      <span className="text-gray-400">{fromNowDate({ date: created })}</span>
    </div>
  );
}

function CollabTags({ tags }: { tags: any[] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => {
        const tagText = typeof tag === "string" ? tag : tag?.title || "";
        return <Badge key={tagText} text={tagText} Variant="outline" color="neutral-grey" />;
      })}
    </div>
  );
}

function CollabTitle({ title }: { title: string }) {
  return <h1 className="">{title}</h1>;
}

function CollabImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full h-64 bg-gray-200 rounded-3xl overflow-hidden">
      <img src={imageUrl} alt="Collaboration" className="w-full h-full object-cover" />
    </div>
  );
}

function CollabContent({ content }: { content: string }) {
  return <p className="text-gray-700">{content}</p>;
}

function CollabChat({ collabId }: { collabId: string }) {
  return (
    <div className="mt-auto flex items-center justify-between gap-4">
      <Link to={`/collaborations/${collabId}`}>
        <Button text="Start Chat" variant="primary" icon="ChatBubble" />
      </Link>
    </div>
  );
}

function CollabGenres({ genres }: { genres: { title: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3>Genre</h3>
      <div className="flex items-center gap-2 flex-wrap">
        {genres.map((genre) => (
          <Badge key={genre.title} color="header-bg-1" text={genre.title} />
        ))}
      </div>
    </div>
  );
}

function CollabSkills({ skills }: { skills: { title: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3>Must have skills</h3>
      <div className="flex items-center gap-2 flex-wrap">
        {skills.map((skill) => (
          <Badge key={skill.title} color="header-bg-1" text={skill.title} />
        ))}
      </div>
    </div>
  );
}

export default function CollaborationDetails() {
  const { collaboration } = useLoaderData();

  const collab = collaboration.data;

  return (
    <div className="px-4 flex flex-col gap-4 outer-wrapper">
      <CollabHeader
        userName={collab.user.name}
        userImage={collab.user.profile_image}
        role={collab.role}
        created={collab.created}
      />
      <CollabTags tags={collab.tags} />
      <CollabTitle title={collab.title} />
      <CollabImage imageUrl={collab.media} />
      <CollabContent content={collab.content} />
      <CollabChat collabId={collab.id} />
      <CollabGenres genres={collab.genres} />
      <CollabSkills skills={collab.skills} />
    </div>
  );
}
