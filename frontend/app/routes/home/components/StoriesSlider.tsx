import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type StoriesSliderProps = {
  stories: Array<{ id: number; userName: string; imageUrl: string }>;
};

export default function StoriesSlider({ stories }: StoriesSliderProps) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  return (
    <div className="overflow-hidden outer-wrapper">
      <div className="relative">
        {!atStart && (
          <div
            className="absolute z-1000 left-0 top-0 bottom-0 w-3 bg-linear-to-r from-neutral-grey/15 to-transparent"
            style={{
              WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)",
              maskImage: "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)",
            }}
          ></div>
        )}
        {!atEnd && (
          <div
            className="absolute z-1000 right-0 top-0 bottom-0 w-3 bg-linear-to-l from-neutral-grey/15 to-transparent"
            style={{
              WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)",
              maskImage: "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)",
            }}
          ></div>
        )}
        <Swiper
          className="pl-4! pr-4! overflow-visible!"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 4.5 },
            640: { slidesPerView: 6.5 },
          }}
          onSwiper={(swiper) => {
            setAtStart(swiper.isBeginning);
            setAtEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setAtStart(swiper.isBeginning);
            setAtEnd(swiper.isEnd);
          }}
        >
          {stories.map((story) => (
            <SwiperSlide className="" key={story.id}>
              <div className="flex flex-col gap-2 items-center justify-center">
                <img
                  className="w-full h-full object-cover rounded-full aspect-square border-2 border-primary-yellow"
                  src={story.imageUrl}
                  alt={story.userName}
                />
                <span className="text-xs">{story.userName}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
