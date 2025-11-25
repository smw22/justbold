import { Link } from "react-router";
import Badge from "~/components/Badge";
import Icon from "~/components/icon";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type Collaboration = {
  id: string;
  media: string;
  user: {
    name: string;
    profile_image: string;
  };
  title: string;
  content: string;
  tags: string[];
  location: string;
  created: string;
};

type CollaborationsSliderProps = {
  collaborations: {
    data: Collaboration[];
  };
};

function CollabCard({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className=" bg-white border border-black/10 p-4 rounded-3xl overflow-hidden flex flex-col gap-4 h-full">
      {children}
    </div>
  );
}

function CollabCardHeader({
  userName,
  userImage,
  tag,
}: {
  userName: string;
  userImage: string;
  tag: string;
}) {
  const tagText = typeof tag === "string" ? tag : tag?.title || "";
  return (
    <div className="flex items-center gap-1 border-b border-gray-200 pb-4 ">
      <div className="flex items-center gap-1">
        <img className="size-10 rounded-full" src={userImage} alt={userName} />
        <span className="">{userName.split(" ")[0]}</span>
      </div>
      <span className="text-gray-400">looking for a</span>
      <span className="text-gray-400">#{tagText}</span>
    </div>
  );
}

function CollabCardTitle({ title }: { title: string }) {
  return (
    <h3 className="text-lg font-bold leading-tight text-gray-900">{title}</h3>
  );
}

function CollabCardMeta({
  location,
  created,
  tags,
}: {
  location: string;
  created: string;
  tags: string[];
}) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        {tags.map((tag: string, idx: number) => (
          <Badge
            key={idx}
            Variant="outline"
            color="neutral-grey"
            text={typeof tag === "string" ? tag : (tag as any)?.title}
          />
        ))}
      </div>
      <div className="text-xs text-gray-400">
        <span>{location}</span>
        <span> - </span>
        <span>{dayjs(created).fromNow()}</span>
      </div>
    </div>
  );
}

function CollabCardImage({ media, alt }: { media: string; alt: string }) {
  return <img className="rounded-3xl" src={media} alt={alt} />;
}

function CollabCardContent({ content }: { content: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {content.split(" ").length > 15
          ? content.split(" ").slice(0, 15).join(" ") + "..."
          : content}
      </p>
    </div>
  );
}

function CollabCardActions({ collabId }: { collabId: string }) {
  return (
    <div className="mt-auto flex items-center justify-between gap-4">
      <Link
        className="text-gray-600 font-bold text-sm"
        to={`/collaborations/${collabId}`}
      >
        Read more
      </Link>
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

export default function CollaborationsFeed({
  collaborations,
}: CollaborationsSliderProps) {
  return (
    <div className="flex flex-col gap-6">
      {collaborations.data.map((collab: Collaboration) => (
        <CollabCard key={collab.id}>
          <CollabCardHeader
            userName={collab.user.name}
            userImage={collab.user.profile_image}
            tag={collab.tags[0] || ""}
          />
          <CollabCardTitle title={collab.title} />
          <CollabCardMeta
            location={collab.location}
            created={collab.created}
            tags={collab.tags}
          />
          <CollabCardImage media={collab.media} alt={collab.title} />
          <CollabCardContent content={collab.content} />
          <CollabCardActions collabId={collab.id} />
        </CollabCard>
      ))}
    </div>
  );
}
