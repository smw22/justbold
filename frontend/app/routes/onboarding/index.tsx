import "./onboarding.css";
import Logo from "~/assets/icons/artwork/Logo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "~/components/Button";

export default function Onboarding() {
  return (
    <>
      <div className="onboarding-yellow-bg bg-primary-yellow w-dvw h-dvh flex items-center justify-center z-2 absolute">
        <Logo variant="purple" className="onboarding-logo" />
      </div>
      <div className="h-dvh w-screen flex flex-col items-center justify-center">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="flex! flex-col items-center w-dvw"
        >
          <SwiperSlide>
            <div className="flex flex-col items-center gap-4 p-6">
              <img
                src="/images/slide1.jpg"
                alt="Slide 1"
                className="w-full h-48"
              />
              <h3 className="text-xl">Make connections with musicians</h3>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col items-center gap-4 p-6">
              <img
                src="/images/slide2.jpg"
                alt="Slide 2"
                className="w-full h-48"
              />
              <h3 className="text-xl">Post requests</h3>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col items-center gap-4 p-6">
              <img
                src="/images/slide3.jpg"
                alt="Slide 3"
                className="w-full h-48"
              />
              <h3 className="text-xl">Find the right service for you</h3>
            </div>
          </SwiperSlide>
        </Swiper>
        <Button text={"Get started!"} variant={"primary"} />
      </div>
    </>
  );
}
