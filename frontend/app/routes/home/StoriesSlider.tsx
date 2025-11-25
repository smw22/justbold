import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type StoriesSliderProps = {
  stories: Array<{ id: number; userName: string; imageUrl: string }>;
};

export default function StoriesSlider({ stories }: StoriesSliderProps) {
  return (
    <div>
      <Swiper
        className="pl-4!"
        spaceBetween={12}
        slidesPerView={4.5}
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
  );
}
