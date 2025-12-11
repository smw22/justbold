import { useEffect, useState } from "react";
import { apiFetch } from "~/lib/apiFetch";
import fromNowDate from "~/lib/fromNowDate";

interface TagsProps {
  query: string;
}

export default function Tags({ query }: TagsProps) {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const searchParams = query ? `query=${encodeURIComponent(query)}&category=tags` : `category=tags`;
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

  // Interleave posts and collaborations
  const interleavedResults: Array<{ type: "post" | "collab"; data: any }> = [];
  const posts = results.posts || [];
  const collabs = results.collaborations || [];

  let postIndex = 0;
  let collabIndex = 0;

  while (postIndex < posts.length || collabIndex < collabs.length) {
    if (postIndex < posts.length) interleavedResults.push({ type: "post", data: posts[postIndex++] });
    if (collabIndex < collabs.length) interleavedResults.push({ type: "collab", data: collabs[collabIndex++] });
  }

  return (
    <div className="flex flex-col gap-6">
      {interleavedResults.length > 0 && (
        <section className="flex flex-col gap-3 max-w-[331px]">
          <p className="font-medium text-xs text-neutral-grey">
            {query ? "Posts and collaborations including your tag" : "Recent posts and collaborations"}
          </p>
          <div className="flex flex-col gap-3">
            {interleavedResults.map((item) => {
              if (item.type === "post") {
                const post = item.data;
                return (
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
                        <p>{fromNowDate({ date: post.created })}</p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                const collab = item.data;
                return (
                  <div key={collab.id} className="rounded-3xl border border-black/15 p-3.5 flex flex-col gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={collab.user.profile_image}
                        alt={collab.user.name}
                        className="h-5 w-5 object-cover rounded-full"
                      />
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
                          {collab.location} - {fromNowDate({ date: collab.created })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </section>
      )}
    </div>
  );
}
