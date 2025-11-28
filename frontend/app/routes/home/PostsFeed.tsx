import Post from "~/components/Post";
import type { PostType } from "~/types/post";

export default function PostsFeed({ posts }: { posts: PostType[] }) {
  return (
    <div className="outer-wrapper">
      {posts.map((post: PostType) => (
        <Post post={post} />
      ))}
    </div>
  );
}
