import type { PostType } from "~/types/post";
import { Link } from "react-router";
import Icon from "./icon";

export default function Post({ post }: { post: PostType }) {
  return (
    <div className="bg-white flex flex-col gap-4 w-full items-start rounded-tl-3xl rounded-tr-3xl -mt-6 overflow-hidden p-8">
      <div className="flex flex-row w-full">
        <Link to={`/profile/${post.user_id}`} className="flex-1">
          USER NAME HERE!!
        </Link>
        <button>
          HER SKAL DER KUNNE ÅBNES CONTEXT MENU!
          <Icon name="More" />
        </button>
      </div>
      <h1>{post.title}</h1>
      <div className="w-full bg-cover aspect-video rounded-3xl" style={{ backgroundImage: `url('${post.media}')` }}></div>
      <p>{post.content}</p>
      <div>
        <p>Her skal der være like, comment og share icon</p>
      </div>
    </div>
  );
}
