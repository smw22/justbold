import { useLoaderData, Link } from "react-router";
import Badge from "~/components/Badge";
import Icon from "~/components/icon";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { apiFetch } from "~/lib/apiFetch";

dayjs.extend(relativeTime);

export async function clientLoader({ params }: { params: { collaborationId: string } }): Promise<{}> {
  const collabResponse = await apiFetch(`/collaborations/${params.collaborationId}`);

  if (!collabResponse.ok) {
    throw new Error(`Failed to fetch collaborations: ${collabResponse.status}`);
  }

  const collaboration = await collabResponse.json();

  return { collaboration };
}

function CollabHeader({
  userName,
  userImage,
  tag,
  created,
}: {
  userName: string;
  userImage: string;
  tag: string;
  created: string;
}) {
  const tagText = typeof tag === "string" ? tag : tag?.title || "";
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 ">
        <div className="flex items-center gap-1">
          <img className="size-10 rounded-full" src={userImage} alt={userName} />
          <span className="">{userName.split(" ")[0]}</span>
        </div>
        <span className="text-gray-400">looking for a</span>
        <span className="text-gray-400">#{tagText}</span>
      </div>
      <span className="text-gray-400">{dayjs(created).fromNow()}</span>
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
      <Link
        className="text-sm flex items-center justify-center gap-1 bg-primary-yellow rounded-full px-4 py-2 border border-black/10"
        to={`/collaborations/${collabId}`}
      >
        <Icon name="ChatBubble" size={16} />
        Start chat
      </Link>
    </div>
  );
}

function CollabGenres({ genres }: { genres: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3>Genre</h3>
      <div className="flex items-center gap-2 flex-wrap">
        {genres.map((genre) => (
          <Badge key={genre} color="header-bg-1" text={typeof genre === "string" ? genre : genre?.title || ""} />
        ))}
      </div>
    </div>
  );
}

function CollabSkills() {
  return (
    <div className="flex flex-col gap-4">
      <h3>Skills</h3>
      <div className="flex items-center gap-2 flex-wrap  bg-red-400 p-8 rounded">Mangler data</div>
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
        tag={collab.tags[0]}
        created={collab.created}
      />
      <CollabTags tags={collab.tags} />
      <CollabTitle title={collab.title} />
      <CollabImage imageUrl={collab.media} />
      <CollabContent content={collab.content} />
      <CollabChat collabId={collab.id} />
      <CollabGenres genres={collab.genres} />
      <CollabSkills />
    </div>
  );
}
