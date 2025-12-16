import { useEffect, useState } from "react";
import { Link } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import fromNowDate from "~/lib/fromNowDate";
import type { Collaboration } from "~/types/collaborations";

interface CollaborationsProps {
  query: string;
}

export default function Collaborations({ query }: CollaborationsProps) {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper: format names like "Jean and Guy" or "Jean, Guy and Anna"
  const formatNames = (names: string[]) => {
    if (names.length === 0) return "";
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;
    return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const searchParams = query ? `query=${encodeURIComponent(query)}&category=collaborations` : `category=collaborations`;
        const response = await apiFetch(`/search?${searchParams}`);
        if (!response.ok) throw new Error("Search failed");
        const json = await response.json();
        setResults(json.data);
      } catch (error) {
        console.error("Search failed:", error);
        setError("Failed to load results");
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  if (loading) return <div className="text-xs text-(--lightgrey-text)">Loading...</div>;
  if (error) return <div className="text-xs text-red-500">{error}</div>;
  if (!results) return <div className="text-xs text-(--lightgrey-text)">Loading...</div>;

  const isEmpty =
    !results.people?.length && !results.collaborations?.length && !results.services?.length && !results.posts?.length;
  if (isEmpty) return <div className="text-xs text-(--lightgrey-text)">No results found</div>;

  return (
    <div className="flex flex-col gap-6">
      {results.collaborations?.length > 0 && (
        <section className="flex flex-col gap-3 max-w-[331px]">
          <p className="font-medium text-xs text-neutral-grey">
            {query ? "Collaboration requests" : "Recent collaboration requests"}
          </p>
          <div className="flex flex-col gap-3">
            {results.collaborations.map((collab: any) => {
              // Prefer members/users array if present, else fall back to the single creator
              const extraUsers = (collab.users ?? collab.members ?? []).filter((u: any) => u.id !== collab.user.id);
              const allDisplayUsers = [collab.user, ...extraUsers];
              const allNames = allDisplayUsers.map((u: any) => u.name);

              return (
                <div key={collab.id} className="rounded-3xl border border-black/15 p-3.5 flex flex-col gap-2.5">
                  <div className="flex items-center gap-1.5">
                    {/* Stacked avatars */}
                    <div className={`flex ${allDisplayUsers.length > 1 ? "-space-x-1 mr-1" : "min-w-5"}`}>
                      {allDisplayUsers.slice(0, 4).map((user: any, i: number) => (
                        <Link to={`/profile/${collab.user.id}`}>
                          <img
                            key={user.id}
                            src={user.profile_image}
                            alt={user.name}
                            className="relative h-5 w-5 object-cover rounded-full ring-1 ring-white"
                            style={{ zIndex: 100 - i }}
                          />
                        </Link>
                      ))}
                      {allDisplayUsers.length > 4 && (
                        <div
                          className="relative h-5 w-5 rounded-full bg-neutral-200 text-[10px] flex items-center justify-center ring-1 ring-white"
                          style={{ zIndex: 100 - 4 }}
                        >
                          +{allDisplayUsers.length - 4}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-(--lightgrey-text)">
                      <span className="text-neutral-grey">{formatNames(allNames)}</span>
                      {collab.user?.looking_for?.length > 0 && (
                        <>
                          {" looking for"}
                          {collab.user.looking_for.map((looking_for: any) => (
                            <span key={looking_for}> #{looking_for}</span>
                          ))}
                        </>
                      )}
                    </p>
                  </div>
                  <div className="h-px bg-black/15 mx-9 my-2"></div>
                  <h4>{collab.title}</h4>
                  {collab.media && (
                    <img src={collab.media} alt={collab.title} className="rounded-3xl h-[222px] w-[333px] object-cover" />
                  )}
                  <p className="text-md text-(--lightgrey-text)">{collab.content}</p>
                  <div className="flex justify-between text-xs">
                    <Link to={`/collaborations/${collab.id}`} className="font-bold text-neutral-grey cursor-pointer">
                      Read more
                    </Link>
                    <div className="text-(--lightgrey-text)">
                      <p>
                        {collab.location} - {fromNowDate({ date: collab.created })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
