import type { PostType } from "~/types/post";
import Post from "~/components/Post";
export default function Posts({ posts }: { posts: PostType[] }) {
  return (
    <article className="bg-white flex flex-col gap-4 rounded-bl-3xl rounded-br-3xl pb-4">
      {posts && posts.length > 0 ? (
        posts.map((post: PostType) => <Post post={post} />)
      ) : (
        <div className="text-center p-4 flex flex-col gap-2">
          <h3>It's looking a little empty in here.</h3>
          <p className="text-sm text-neutral-grey">This user doesn't have any posts.</p>
        </div>
      )}
    </article>
  );
}
