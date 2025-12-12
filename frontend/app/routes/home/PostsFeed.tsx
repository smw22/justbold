import ErrorMessage from "~/components/ErrorMessage";
import PostRedacted from "~/components/PostRedacted";
import Post from "~/components/Post";
import type { PostType } from "~/types/post";

export default function PostsFeed({ posts, error }: { posts: PostType[]; error: string }) {
  return (
    <div className="outer-wrapper">
      <ErrorMessage error={error} />
      {posts ? posts?.map((post: PostType) => <Post post={post} key={post.id} />) : <PostRedacted />}
    </div>
  );
}
