import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Icon from "~/components/icon";
import Button from "~/components/Button";
import { apiFetch } from "~/lib/apiFetch";

dayjs.extend(relativeTime);

interface ForYouProps {
  query: string;
}

export default function ForYou({ query }: ForYouProps) {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connections, setConnections] = useState<Record<string, "pending" | "accepted">>({});

  // Fetch connections on mount
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await apiFetch("/connections");
        if (res.ok) {
          const data = await res.json();

          // Creates an empty object that will store connection statuses
          const map: Record<string, "pending" | "accepted"> = {};

          // Loop through each connection
          for (const connection of data.accepted ?? []) {
            // Figure out who the other user is
            // If "you" are the requester, the other person is the addressee or vice versa
            const otherId = connection.requester.id === data.me ? connection.addressee.id : connection.requester.id;

            // Store connection
            map[otherId] = "accepted";
          }

          // Same as above, but for pending connections
          for (const connection of data.pending ?? []) {
            const otherId = connection.requester.id === data.me ? connection.addressee.id : connection.requester.id;
            map[otherId] = "pending";
          }

          // Save the map to state so the component can render it
          setConnections(map);
        }
      } catch (error) {
        console.error("Failed to fetch connections:", error);
      }
    };
    fetchConnections();
  }, []); // Run only once

  // Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const searchParams = query ? `query=${encodeURIComponent(query)}&category=all` : `category=all`;
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

  const handleConnect = async (userId: string) => {
    try {
      const res = await apiFetch("/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: userId }),
      });
      if (res.ok) {
        setConnections((prev) => ({ ...prev, [userId]: "pending" }));
      }
    } catch (error) {
      console.error("Failed to send connection request:", error);
    }
  };

  if (loading) return <div className="text-xs text-(--lightgrey-text)">Loading...</div>;
  if (error) return <div className="text-xs text-red-500">{error}</div>;
  if (!results) return <div className="text-xs text-(--lightgrey-text)">Loading...</div>;

  const isEmpty =
    !results.people?.length && !results.collaborations?.length && !results.services?.length && !results.posts?.length;
  if (isEmpty) return <div className="text-xs text-(--lightgrey-text)">No results found</div>;

  return (
    <div className="flex flex-col gap-6">
      {results.people?.length > 0 && (
        <section className="flex flex-col gap-3">
          <p className="font-medium text-xs text-neutral-grey">People</p>
          <div className="flex flex-col gap-3">
            {results.people.map((person: any) => {
              const status = connections[person.id];
              const hideButton = status === "accepted";
              const isPending = status === "pending";

              return (
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
                  {!hideButton && (
                    <Button
                      variant="primary"
                      text={isPending ? "Pending" : "Connect"}
                      disabled={isPending}
                      onClick={() => handleConnect(person.id)}
                      icon="AddCircle"
                      className="flex flex-row-reverse text-sm font-medium"
                    />
                  )}
                </div>
              );
            })}
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
                <img src={collab.media} alt={collab.title} className="rounded-3xl h-[222px] w-[333px] object-cover" />
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
                <div className="flex items-center gap-1.5 w-full justify-between">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={service.user.profile_image}
                      alt={service.user.name}
                      className="h-5 w-5 object-cover rounded-full"
                    />
                    <p className="text-xs text-(--lightgrey-text)">
                      <span className="text-neutral-grey">{service.user.name}</span> looking for
                      {service.user.looking_for.map((looking_for: any) => (
                        <span key={looking_for}> #{looking_for}</span>
                      ))}
                    </p>
                  </div>
                  <Icon name="HomeSale" size={24} className="min-h-6 min-w-6" />
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

      {results.posts?.length > 0 && (
        <section className="flex flex-col gap-3 max-w-[331px]">
          <p className="font-medium text-xs text-neutral-grey">Posts</p>
          <div className="flex flex-col gap-3">
            {results.posts.map((post: any) => (
              <div key={post.id} className="rounded-3xl border border-black/15 p-3.5 flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5">
                  <img src={post.user.profile_image} alt={post.user.name} className="h-5 w-5 object-cover rounded-full" />
                  <p className="text-xs text-(--lightgrey-text)">
                    <span className="text-neutral-grey">{post.user.name}</span>
                    {post.tags?.length > 0 && (
                      <>
                        {" tagged "}
                        {post.tags.map((tag: any, index: number) => (
                          <span key={tag.id}>
                            #{tag.title}
                            {index < post.tags.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </>
                    )}
                  </p>
                </div>
                <div className="h-px bg-black/15 mx-9 my-2"></div>
                <h4>{post.title}</h4>
                <img src={post.media} alt={post.media} className="rounded-3xl h-[222px] w-[333px] object-cover" />
                <p className="text-md text-(--lightgrey-text)">{post.content}</p>
                <div className="flex justify-between text-xs">
                  <button className="font-bold text-neutral-grey cursor-pointer">Read more</button>
                  <div className="text-(--lightgrey-text)">
                    <p>{dayjs(post.created).fromNow()}</p>
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
