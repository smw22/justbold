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
    <article className={`p-5 rounded-4xl m-4 bg-${theme} text-white flex flex-col justify-center gap-3 items-center`}>
      <section className="flex justify-center gap-1 items-center">
        <div className="flex flex-col items-center w-24 gap-1">
          <p className="text-lg">{connection_count}</p>
          <p className="text-xs">Connections</p>
        </div>

        <div className={`w-36 h-36 rounded-full bg-gray-400 bg-[url('${image}')] border-2 border-white`}></div>
        <div className="flex flex-col items-center w-24 gap-1">
          <p className="text-lg">{post_count}</p>
          <p className="text-xs">Posts</p>
        </div>
      </section>
      <section className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1">
          <h4 className="text-white font-normal">{name}</h4>
          <Icon name="TwitterVerifiedBadge" size={20} />
        </div>
        <p className="text-xs">{bio}</p>
      </section>
      <section className="flex gap-4 w-full mt-1">
        <Button variant="primary-glass" text="Connect" icon="AddCircle" fullWidth={true} />
        <Button variant="primary-glass" text="Message" fullWidth={true} />
      </section>
    </article>
  );
}
