import { useEffect, useState } from "react";

interface ForYouProps {
  query: string;
}

export default function ForYou({ query }: ForYouProps) {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults(null);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/search?query=${encodeURIComponent(query)}&category=all`);
        const json = await response.json();
        setResults(json.data);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  if (loading) return <div>Loading...</div>; // Use custom loader instead
  if (!results) return null;

  return (
    <div className="flex flex-col gap-6">
      {results.people?.length > 0 && (
        <section className="flex flex-col gap-3">
          <p className="font-medium text-xs text-neutral-grey">People</p>
          <div className="flex flex-col gap-3">
            {results.people.map((person: any) => (
              <div key={person.id} className="flex items-center gap-1.5">
                <img
                  src={person.profile_image || "placeholder.jpg"}
                  alt={person.name}
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div className="flex flex-col gap-1.5">
                  <p className="text-(--darkgrey-text) font-medium text-sm">{person.name}</p>
                  <p className="text-(--lightgrey-text) text-xs">{person.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {results.collaborations?.length > 0 && (
        <section className="flex flex-col gap-3">
          <p className="font-medium text-xs text-neutral-grey">Collaboration requests</p>
          <div className="flex flex-col gap-3">
            {results.collaborations.map((collab: any) => (
              <div key={collab.id} className="rounded-3xl border border-black/15 p-3.5">
                <h4>{collab.title}</h4>
                <p className="text-md text-(--lightgrey-text)">{collab.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {results.services?.length > 0 && (
        <section>
          <p className="font-medium text-xs text-neutral-grey">Services</p>
          <div>
            {results.services.map((service: any) => (
              <div key={service.id}>
                <p>{service.title}</p>
                <p>{service.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {results.tags?.length > 0 && (
        <section>
          <p className="font-medium text-xs text-neutral-grey">Tags</p>
          <div>
            {results.tags.map((tag: any) => (
              <div key={tag.id}>
                <p>{tag.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {results.posts?.length > 0 && (
        <section>
          <p className="font-medium text-xs text-neutral-grey">Posts</p>
          <div>
            {results.posts.map((post: any) => (
              <div key={post.id}>
                <p>{post.title}</p>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
