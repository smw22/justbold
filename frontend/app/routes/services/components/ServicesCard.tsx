import Icon from "~/components/icon";
import { Link } from "react-router";
import AvatarHeader from "./AvatarHeader";
import type { Service } from "~/types/services/servicesProps";

type ServicesCardProps = {
  servicesData: Service;
};

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
            {servicesData.location} - 4h ago
          </span>
        </div>
      </Link>
    </div>
  );
}
