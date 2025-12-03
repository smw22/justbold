import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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
                  <p className="text-neutral-grey font-medium text-sm">{person.name}</p>
                  <p className="text-(--lightgrey-text) text-xs">{person.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {results.collaborations?.length > 0 && (
        <section className="flex flex-col gap-3 max-w-[331px]">
          <p className="font-medium text-xs text-neutral-grey">Collaboration requests</p>
          <div className="flex flex-col gap-3">
            {results.collaborations.map((collab: any) => (
              <div key={collab.id} className="rounded-3xl border border-black/15 p-3.5 flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5">
                  <img src={collab.user.profile_image} alt={collab.user.name} className="h-5 w-5 object-cover rounded-full" />
                  <p className="text-xs text-(--lightgrey-text)">
                    <span className="text-neutral-grey">{collab.user.name}</span> looking for
                    {collab.user.looking_for.map((looking_for: any) => (
                      <span key={looking_for}> #{looking_for}</span>
                    ))}
                  </p>
                </div>
                <div className="h-px bg-black/15 mx-9 my-2"></div>
                <h4>{collab.title}</h4>
                <p className="text-md text-(--lightgrey-text)">{collab.content}</p>
                <div className="flex justify-between text-xs">
                  <button className="font-bold text-neutral-grey cursor-pointer">Read more</button>
                  <div className="text-(--lightgrey-text)">
                    <p>
                      {collab.location} - {dayjs(collab.created).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {results.services?.length > 0 && (
        <section className="flex flex-col gap-3 max-w-[331px]">
          <p className="font-medium text-xs text-neutral-grey">Services</p>
          <div className="flex flex-col gap-3">
            {results.services.map((service: any) => (
              <div key={service.id} className="rounded-3xl border border-black/15 p-3.5 flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5">
                  <img src={service.user.profile_image} alt={service.user.name} className="h-5 w-5 object-cover rounded-full" />
                  <p className="text-xs text-(--lightgrey-text)">
                    <span className="text-neutral-grey">{service.user.name}</span> looking for
                    {service.user.looking_for.map((looking_for: any) => (
                      <span key={looking_for}> #{looking_for}</span>
                    ))}
                  </p>
                </div>
                <div className="h-px bg-black/15 mx-9 my-2"></div>
                <h4>{service.title}</h4>
                <p className="text-md text-(--lightgrey-text)">{service.content}</p>
                <div className="flex justify-between text-xs">
                  <button className="font-bold text-neutral-grey cursor-pointer">Read more</button>
                  <div className="text-(--lightgrey-text)">
                    <p>
                      {service.location} - {dayjs(service.created).fromNow()}
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
