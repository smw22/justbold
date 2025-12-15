import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router";
import Collaborations from "../collaborations/collaborations";
import Button from "~/components/Button";
import fromNowDate from "~/lib/fromNowDate";
import ErrorMessage from "~/components/ErrorMessage";
import CollaborationsSliderCardRedacted from "./components/CollaborationsSliderCardRedacted";

type Collaboration = {
  id: string;
  user: {
    name: string;
    profile_image: string;
  };
  role: string;
  title: string;
  content: string;
  tags: [
    {
      id: string;
      title: string;
    },
  ];
  location: string;
  created: Date;
};

type CollaborationsSliderProps = {
  data: Collaboration[];
};

export default function CollaborationsSlider({ collaborations }: { collaborations: CollaborationsSliderProps }) {
  return (
    <Swiper
      className="pl-4 overflow-visible"
      spaceBetween={12}
      slidesPerView={1.25}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {collaborations?.data?.map((collab: Collaboration) => (
        <SwiperSlide key={collab.id}>
          <div className="bg-white rounded-xl overflow-hidden flex flex-col gap-1 p-4 h-full">
            <div className="flex items-center gap-1 border-b border-gray-200 pb-4 mb-4">
              <div className="flex items-center gap-1">
                <img className="size-8 rounded-full" src={collab.user.profile_image} alt={collab.user.name} />
                <span className="text-xs">{collab.user.name.split(" ")[0]}</span>
              </div>
              <span className="text-xs text-gray-400">looking for a</span>
              {collab.tags && collab.tags.length > 0 && <span className="text-xs text-gray-400">#{collab.role}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <h5>{collab.title}</h5>
              <p className="text-sm text-gray-500">
                {collab.content.split(" ").length > 15
                  ? collab.content.split(" ").slice(0, 15).join(" ") + "..."
                  : collab.content}
              </p>
            </div>
            <div className="mt-auto flex items-center justify-between gap-4">
              <Link className="text-gray-600 font-bold text-sm" to={`/collaborations/${collab.id}`}>
                Read more
              </Link>
              <div className="text-xs text-gray-400">
                <span>{collab.location}</span>
                <span> - </span>
                <span>{fromNowDate({ date: collab.created })}</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
