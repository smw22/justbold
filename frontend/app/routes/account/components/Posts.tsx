import type { PostType } from "~/types/post";
import Post from "~/components/Post";
export default function Posts({ posts }: { posts: PostType[] }) {
  return (
    <>
      {posts.map((post: PostType) => (
        <Post post={post} />
      ))}
    </>
  );
}
