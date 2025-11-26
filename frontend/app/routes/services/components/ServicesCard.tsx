import Icon from "~/components/icon";
import { Link } from "react-router";
import AvatarHeader from "./AvatarHeader";
import type { Service } from "~/types/services/servicesProps";

type ServicesCardProps = {
  servicesData: Service;
};

function timeAgo(dateString: string | Date): string {
  const now = new Date();
  const createdDate = new Date(dateString);
  const diffMs = now.getTime() - createdDate.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 31) {
    return `${diffDays}d ago`;
  } else {
    return "+1 month ago";
  }
}

export default function ServicesCard({ servicesData }: ServicesCardProps) {
  return (
    <div className="flex flex-col gap-4 p-4 m-auto w-[90%] max-w-md border border-gray-300 rounded-3xl shadow-lg">
      <div className="flex items-center justify-between border-b border-gray-300 pb-2">
        <AvatarHeader
          imageUrl={servicesData.user.profile_image}
          imageSize={25}
          title={servicesData.user.name}
        />

        <span className="text-lightgrey">#{servicesData.tag.title}</span>
        <div>
          <Icon name="BookmarkEmpty" size={24}></Icon>
        </div>
      </div>

      <Link to={`${servicesData.id}`} className="flex flex-col gap-2">
        <div>
          <h2>{servicesData.title}</h2>
        </div>
        <div className="relative">
          <Icon
            name="Mic"
            size={24}
            className="absolute top-4 right-4 bg-neutral-grey rounded-md text-white p-1"
          />
          <img
            src={servicesData.media}
            alt="user avatar"
            className="w-full rounded-2xl"
          />
        </div>
        <p className="line-clamp-3">{servicesData.content}</p>
        <div className="flex justify-between">
          <span className="font-bold underline">Read more...</span>
          <span className="text-lightgrey">
            {servicesData.location} - {timeAgo(servicesData.created)}
          </span>
        </div>
      </Link>
    </div>
  );
}
