import { useEffect, useState } from "react";
import { Link } from "react-router";
import Button from "~/components/Button";
import { apiFetch } from "~/lib/apiFetch";
import type { ProfileType } from "~/types/profile";

interface PeopleProps {
  query: string;
}

export default function People({ query }: PeopleProps) {
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
  }, []);

  // Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const searchParams = query ? `query=${encodeURIComponent(query)}&category=people` : `category=people`;
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
          <p className="font-medium text-xs text-neutral-grey">{query ? "Users" : "Recently created users"}</p>
          <div className="flex flex-col gap-3">
            {results.people.map((person: ProfileType) => {
              const status = connections[person.id];
              const hideButton = status === "accepted";
              const isPending = status === "pending";

              return (
                <div key={person.id} className="flex items-center gap-1.5 w-full justify-between">
                  <Link to={`/profile/${person.id}`} className="flex gap-1.5">
                    <img
                      src={person.profile_image || "placeholder.jpg"}
                      alt={person.name}
                      className="rounded-full w-12 h-12 object-cover"
                    />
                    <div className="flex flex-col gap-1.5">
                      <p className="text-neutral-grey font-medium text-sm">{person.name}</p>
                      <p className="text-(--lightgrey-text) text-xs">{person.location}</p>
                    </div>
                  </Link>
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
    </div>
  );
}
