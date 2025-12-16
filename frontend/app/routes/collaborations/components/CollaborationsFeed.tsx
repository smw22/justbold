import { Link, useLoaderData } from "react-router";
import Badge from "~/components/Badge";
import Icon from "~/components/icon";
import Button from "~/components/Button";
import fromNowDate from "~/lib/fromNowDate";
import { InfiniteScroll } from "~/components/InfiniteScroll";
import { getAllCollaborations } from "~/lib/data/collaborationData";
import CollaborationsCardRedacted from "./CollaborationsCardRedacted";

type Collaboration = {
  id: string;
  media: string;
  user: {
    id: string;
    name: string;
    profile_image: string;
  };
  title: string;
  content: string;
  tags: string[];
  location: string;
  created: Date;
  role: string;
};

function CollabCard({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white border border-black/10 p-4 rounded-3xl overflow-hidden flex flex-col gap-4 h-full">{children}</div>
  );
}

function CollabCardHeader({
  userId,
  userName,
  userImage,
  role,
}: {
  userId: string;
  userName: string;
  userImage: string;
  role: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-gray-200 pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 flex-wrap">
          <Link to={`/profile/${userId}`} className="flex items-center gap-2">
            <img className="size-10 rounded-full" src={userImage} alt={userName} />
            <span className="">{userName.split(" ")[0]}</span>
          </Link>
          <span className="text-gray-400">looking for a</span>
          <span className="text-gray-400 lowercase">#{role}</span>
        </div>

        <button aria-label="Bookmark service" type="button" className="bg-transparent border-none p-0 m-0 cursor-pointer">
          <Icon name="BookmarkEmpty" size={24}></Icon>
        </button>
      </div>
    </div>
  );
}

function CollabCardTitle({ title }: { title: string }) {
  return <h3 className="text-lg font-bold leading-tight text-gray-900">{title}</h3>;
}

function CollabCardMeta({ location, created, tags }: { location: string; created: Date; tags: string[] }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        {tags.map((tag: string, idx: number) => (
          <Badge key={idx} Variant="outline" color="neutral-grey" text={typeof tag === "string" ? tag : (tag as any)?.title} />
        ))}
      </div>
      <div className="text-xs text-gray-400">
        <span>{location}</span>
        <span> - </span>
        <span>{fromNowDate({ date: created })}</span>
      </div>
    </div>
  );
}

function CollabCardImage({ media, alt }: { media: string; alt: string }) {
  return media ? (
    <img className="rounded-3xl aspect-post md:aspect-video w-full" src={media} alt={alt} />
  ) : (
    <div className="rounded-3xl bg-light-grey aspect-post md:aspect-video w-full" />
  );
}

function CollabCardContent({ content }: { content: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {content.split(" ").length > 15 ? content.split(" ").slice(0, 15).join(" ") + "..." : content}
      </p>
    </div>
  );
}

function CollabCardActions({ collabId, userId }: { collabId: string; userId: string }) {
  return (
    <div className="mt-auto flex items-center justify-between gap-4">
      <Link className="text-gray-600 font-bold text-sm" to={`/collaborations/${collabId}`}>
        Read more
      </Link>

      {/*NOTE - The collaboration id is added as a param for future reference if we add group chats or specific collaboration chats. */}
      <Link to={`/chats/new?collaborationId=${collabId}&userId=${userId}`}>
        <Button variant="primary" text="Start Chat" icon="ChatBubble" />
      </Link>
    </div>
  );
}

function CollaborationsCard({ collab }: { collab: Collaboration }) {
  return (
    <CollabCard>
      <CollabCardHeader
        userId={collab.user.id}
        userName={collab.user.name}
        userImage={collab.user.profile_image}
        role={collab.role}
      />
      <CollabCardTitle title={collab.title} />
      <CollabCardMeta location={collab.location} created={collab.created} tags={collab.tags} />
      <CollabCardImage media={collab.media} alt={collab.title} />
      <CollabCardContent content={collab.content} />
      <CollabCardActions collabId={collab.id} userId={collab.user.id} />
    </CollabCard>
  );
}

export default function CollaborationsFeed({ collaborations }: { collaborations: Collaboration[] }) {
  return (
    <InfiniteScroll<Collaboration>
      fetchPage={getAllCollaborations}
      initialData={collaborations}
      pageSize={10}
      loader={<CollaborationsCardRedacted />}
      className="flex flex-col gap-4"
      renderItem={(collab) => <CollaborationsCard key={collab.id} collab={collab} />}
    />
  );
}
