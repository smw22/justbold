import ErrorMessage from "~/components/ErrorMessage";
import PostRedacted from "~/components/PostRedacted";
import Post from "~/components/Post";
import type { PostType } from "~/types/post";
import { InfiniteScroll } from "~/components/InfiniteScroll";
import { getAllPosts } from "~/lib/data/postsData";

const pageSize = 10;

export default function PostsFeed({ posts: initialPosts, error }: { posts: PostType[]; error: string }) {
  return (
    <div className="outer-wrapper">
      <ErrorMessage error={error} />
      <InfiniteScroll<PostType>
        fetchPage={getAllPosts}
        initialData={initialPosts}
        pageSize={pageSize}
        loader={<PostRedacted />}
        renderItem={(post) => <Post post={post} key={post.id} />}
      />
    </div>
  );
}
