import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router";
import Collaborations from "../collaborations/collaborations";
import Button from "~/components/Button";
import fromNowDate from "~/lib/fromNowDate";
import ErrorMessage from "~/components/ErrorMessage";

type Collaboration = {
  id: string;
  user: {
    name: string;
    profile_image: string;
  };
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

export default function CollaborationsSlider({
  collaborations,
  error,
}: {
  collaborations: CollaborationsSliderProps;
  error: string;
}) {
  return (
    <div className="bg-light-grey py-6 overflow-hidden">
      <div className="outer-wrapper">
        <h2 className="px-4 font-semibold text-lg mb-4">Collaborations requests</h2>
        <ErrorMessage error={error} />
        <Swiper
          className="pl-4! overflow-visible!"
          spaceBetween={12}
          slidesPerView={1.25}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {collaborations && collaborations.data
            ? collaborations?.data?.map((collab: Collaboration) => (
                <SwiperSlide className="h-auto!" key={collab.id}>
                  <div className="bg-white rounded-xl overflow-hidden flex flex-col gap-1 p-4 h-full">
                    <div className="flex items-center gap-1 border-b border-gray-200 pb-4 mb-4">
                      <div className="flex items-center gap-1">
                        <img className="size-8 rounded-full" src={collab.user.profile_image} alt={collab.user.name} />
                        <span className="text-xs">{collab.user.name.split(" ")[0]}</span>
                      </div>
                      <span className="text-xs text-gray-400">looking for a</span>
                      {collab.tags && collab.tags.length > 0 && (
                        <span className="text-xs text-gray-400">
                          #{typeof collab.tags[0] === "string" ? collab.tags[0] : collab.tags[0]?.title}
                        </span>
                      )}
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
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <SwiperSlide className="h-auto!" key={i}>
                  <div className="bg-white rounded-xl overflow-hidden flex flex-col gap-1 p-4 h-full">
                    <div className="flex items-center gap-1 border-b border-gray-200 pb-4 mb-4">
                      <div className="flex items-center gap-1 w-full">
                        <div className="size-8 rounded-full bg-neutral-100" />
                        <div className="h-4 w-4/12 bg-neutral-100 rounded-lg"></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="h-6 w-6/12 bg-neutral-100 rounded-lg"></div>
                      <div className="h-4 w-10/12 bg-neutral-100 rounded-lg"></div>
                      <div className="h-4 w-7/12 bg-neutral-100 rounded-lg"></div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="h-4 w-2/12 bg-neutral-100 rounded-lg"></div>
                      <div className="h-4 w-3/12 bg-neutral-100 rounded-lg"></div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
        <div className="px-4 mt-4 flex itenms-center">
          <Link to="/collaborations" className="">
            <Button variant="primary" text="See all collaborations" />
          </Link>
        </div>
      </div>
    </div>
  );
}
