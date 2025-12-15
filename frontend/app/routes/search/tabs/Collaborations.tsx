import { useEffect, useState } from "react";
import { Link } from "react-router";
import { apiFetch } from "~/lib/apiFetch";
import fromNowDate from "~/lib/fromNowDate";

interface CollaborationsProps {
  query: string;
}

export default function Collaborations({ query }: CollaborationsProps) {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
            {results.collaborations.map((collab: any) => (
              <div key={collab.id} className="rounded-3xl border border-black/15 p-3.5 flex flex-col gap-2.5">
                <Link to={`/profile/${collab.user.id}`} className="flex items-center gap-1.5">
                  <img src={collab.user.profile_image} alt={collab.user.name} className="h-5 w-5 object-cover rounded-full" />
                  <p className="text-xs text-(--lightgrey-text)">
                    <span className="text-neutral-grey">{collab.user.name}</span> looking for
                    {collab.user.looking_for.map((looking_for: any) => (
                      <span key={looking_for}> #{looking_for}</span>
                    ))}
                  </p>
                </Link>
                <div className="h-px bg-black/15 mx-9 my-2"></div>
                <h4>{collab.title}</h4>
                <img src={collab.media} alt={collab.title} className="rounded-3xl h-[222px] w-[333px] object-cover" />
                <p className="text-md text-(--lightgrey-text)">{collab.content}</p>
                <div className="flex justify-between text-xs">
                  <button className="font-bold text-neutral-grey cursor-pointer">Read more</button>
                  <div className="text-(--lightgrey-text)">
                    <p>
                      {collab.location} - {fromNowDate({ date: collab.created })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
