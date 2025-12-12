import fromNowDate from "~/lib/fromNowDate";
import { Link } from "react-router";
import type { Collaboration } from "~/types/collaborations";

export default function CollaborationsSliderCard({ collab }: { collab: Collaboration }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col gap-1 p-4 h-full">
      <div className="flex items-center gap-1 border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center gap-1">
          <img className="size-8 rounded-full" src={collab.user.profile_image} alt={collab.user.name} />
          <span className="text-xs">{collab.user.name.split(" ")[0]}</span>
        </div>
        <span className="text-xs text-gray-400">looking for a</span>
        {collab.tags && collab.tags.length > 0 && (
          <span className="text-xs text-gray-400">
            #{typeof collab.tags[0] === "string" ? collab.tags[0] : collab.tags[0]?.title}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h5>{collab.title}</h5>
        <p className="text-sm text-gray-500">
          {collab.content.split(" ").length > 15 ? collab.content.split(" ").slice(0, 15).join(" ") + "..." : collab.content}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-4">
        <Link className="text-gray-600 font-bold text-sm" to={`/collaborations/${collab.id}`}>
          Read more
        </Link>
        <div className="text-xs text-gray-400">
          <span>{collab.location}</span>
          <span> - </span>
          <span>{fromNowDate({ date: collab.created })}</span>
        </div>
      </div>
    </div>
  );
}
