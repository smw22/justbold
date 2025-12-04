import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "~/components/Button";
import { apiFetch } from "~/lib/apiFetch";

dayjs.extend(relativeTime);

interface PeopleProps {
  query: string;
}

export default function People({ query }: PeopleProps) {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResults(null);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFetch(`/search?query=${encodeURIComponent(query)}&category=people`);
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
  if (!results) return null;

  const isEmpty =
    !results.people?.length && !results.collaborations?.length && !results.services?.length && !results.posts?.length;
  if (isEmpty) return <div className="text-xs text-(--lightgrey-text)">No results found</div>;

  return (
    <div className="flex flex-col gap-6">
      {results.people?.length > 0 && (
        <section className="flex flex-col gap-3">
          <p className="font-medium text-xs text-neutral-grey">People</p>
          <div className="flex flex-col gap-3">
            {results.people.map((person: any) => (
              <div key={person.id} className="flex items-center gap-1.5 w-full justify-between">
                <div className="flex gap-1.5">
                  <img
                    src={person.profile_image || "placeholder.jpg"}
                    alt={person.name}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  <div className="flex flex-col gap-1.5">
                    <p className="text-neutral-grey font-medium text-sm">{person.name}</p>
                    <p className="text-(--lightgrey-text) text-xs">{person.location}</p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  text="Connect"
                  icon="AddCircle"
                  className="flex flex-row-reverse text-sm font-medium"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
