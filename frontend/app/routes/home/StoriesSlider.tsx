import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type StoriesSliderProps = {
  stories: Array<{ id: number; userName: string; imageUrl: string }>;
};

export default function StoriesSlider({ stories }: StoriesSliderProps) {
  return (
    <div className="overflow-hidden">
      <div className="outer-wrapper">
        <Swiper
          className="pl-4! overflow-visible!"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 4.5 },
            640: { slidesPerView: 6.5 },
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
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
