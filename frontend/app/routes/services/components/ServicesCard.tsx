import Icon from "~/components/icon";
import { Link } from "react-router";
import AvatarHeader from "../../../components/AvatarHeader";
import type { Service } from "~/types/services/servicesProps";
import fromNowDate from "~/lib/fromNowDate";

type ServicesCardProps = {
  servicesData: Service;
};

export default function ServicesCard({ servicesData }: ServicesCardProps) {
  const formatCategory = (category: string) =>
    category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="bg-white border border-black/10 p-4 rounded-3xl overflow-hidden flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-2 border-b border-gray-300 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 flex-wrap">
            <Link to={`/profile/${servicesData.user.id}`}>
              <AvatarHeader
                imageUrl={servicesData.user.profile_image}
                imageSize={30}
                title={servicesData.user.name}
                color="black"
              />
            </Link>
            <span className="text-gray-400">offers</span>
            <span className="text-gray-400">#{formatCategory(servicesData.category)}</span>
          </div>

          <button
            aria-label="Bookmark service"
            type="button"
            className="bg-transparent border-none p-0 m-0 cursor-pointer flex-shrink-0 ml-2"
          >
            <Icon name="BookmarkEmpty" size={24}></Icon>
          </button>
        </div>
      </div>

      <Link to={`${servicesData.id}`} className="flex flex-col gap-2">
        <div>
          <h2>{servicesData.title}</h2>
        </div>
        <div className="relative">
          {/* Note - add Icon logic in the future to showcase a custom icon in relation with the tags */}
          {/* <Icon
            name="Mic"
            size={24}
            className="absolute top-4 right-4 bg-neutral-grey rounded-md text-white p-1"
          /> */}
          {servicesData.media && <img src={servicesData.media} alt="service image" className="w-full rounded-2xl" />}
        </div>
        <p className="line-clamp-3">{servicesData.content}</p>
        <div className="flex justify-between mt-2">
          <span className="font-bold underline">Read more...</span>
          <span className="text-lightgrey">
            {servicesData.location} - {fromNowDate({ date: servicesData.created })}
          </span>
        </div>
      </Link>
    </div>
  );
}
