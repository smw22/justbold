import fromNowDate from "~/lib/fromNowDate";
import { Link } from "react-router";
import type { Collaboration } from "~/types/collaborations";

export default function CollaborationsSliderCard({ collab }: { collab: Collaboration }) {
  const extraUsers = (collab.users ?? []).filter((u: any) => u.id !== collab.user.id);
  const allUsers = [collab.user, ...extraUsers];

  const formatNames = (names: string[]) => {
    const firstNames = names.map((n) => n.split(" ")[0]);
    if (firstNames.length === 0) return "";
    if (firstNames.length === 1) return firstNames[0];
    if (firstNames.length === 2) return `${firstNames[0]} and ${firstNames[1]}`;
    return `${firstNames.slice(0, -1).join(", ")} and ${firstNames[firstNames.length - 1]}`;
  };

  const allNames = allUsers.map((u) => u.name);

  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col gap-1 p-4 h-full">
      <div className="flex items-center gap-1 border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center gap-1">
          <div className={`flex ${allUsers.length > 1 ? "-space-x-2" : ""}`}>
            {allUsers.slice(0, 3).map((user, i) => (
              <img
                key={user.id}
                className="relative size-8 rounded-full ring-2 ring-white"
                src={user.profile_image}
                alt={user.name}
                style={{ zIndex: 100 - i }}
              />
            ))}
            {allUsers.length > 3 && (
              <div
                className="relative size-8 rounded-full bg-neutral-200 text-xs flex items-center justify-center ring-2 ring-white"
                style={{ zIndex: 97 }}
              >
                +{allUsers.length - 3}
              </div>
            )}
          </div>
          <span className="text-xs">{formatNames(allNames)}</span>
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
