import Button from "./Button";
import Icon from "./icon";

export default function ProfileHeader({
  name,
  bio,
  connection_count,
  post_count,
  image,
  theme,
}: {
  name: string;
  bio: string;
  connection_count: number;
  post_count: number;
  image: string;
  theme: string;
}) {
  return (
    <article className={`p-5 md:p-8 rounded-4xl mx-4 mb-12 mt-4 bg-${theme} text-white flex flex-col md:flex-row justify-center gap-3 items-center`}>
      <section className="flex justify-center gap-1 items-center">
        <div className="flex flex-col items-center w-24 gap-1 md:hidden">
          <p className="text-lg">{connection_count}</p>
          <p className="text-xs">{connection_count === 1 ? "Connection" : "Connections"}</p>
        </div>

        <div style={{ backgroundImage: `url('${image}')` }} className={`w-36 h-36 md:z-20 rounded-full bg-cover bg-gray-400  border-2 border-white`}></div>

        <div className="flex flex-col items-center w-24 gap-1 md:hidden">
          <p className="text-lg">{post_count}</p>
          <p className="text-xs">{post_count === 1 ? "Post" : "Posts"}</p>
        </div>
      </section>
      <section className="flex flex-col items-center md:items-start gap-2 flex-1">
        <div className="flex items-center gap-1">
          <h4 className="text-white font-normal md:text-2xl!">{name}</h4>
          <Icon name="TwitterVerifiedBadge" size={20} />
        </div>
        <p className="text-xs">{bio}</p>
        <div className="hidden md:flex gap-2 text-sm mt-2">
          <p>
            {connection_count} {connection_count === 1 ? "Connection" : "Connections"}
          </p>
          <p>|</p>
          <p>
            {post_count} {post_count === 1 ? "Post" : "Posts"}
          </p>
        </div>
      </section>
      <section className="flex flex-row md:flex-col md:max-w-48 gap-4 w-full mt-1">
        <Button variant="primary-glass" text="Connect" icon="AddCircle" fullWidth={true} />
        <Button variant="primary-glass" text="Message" fullWidth={true} />
      </section>
    </article>
  );
}
