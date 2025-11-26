import "./onboarding.css";
import Logo from "~/assets/icons/artwork/Logo";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router";
import "swiper/css";
import "swiper/css/pagination";
import Button from "~/components/Button";
import ArrowRight from "~/assets/icons/ArrowRight";

function CustomNavigation() {
  const swiper = useSwiper();
  return (
    <>
      <button
        onClick={() => swiper.slidePrev()}
        className="absolute left-6 top-1/2 -translate-y-1/2 rotate-180 rounded-full border text-darkgrey z-10 cursor-pointer p-0.5"
      >
        <ArrowRight />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border text-darkgrey z-10 cursor-pointer p-0.5"
      >
        <ArrowRight />
      </button>
    </>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <>
      <div className="onboarding-yellow-bg bg-primary-yellow w-dvw h-dvh flex items-center justify-center z-2 absolute">
        <Logo variant="purple" className="onboarding-logo" />
      </div>
      <div className="h-dvh w-screen flex flex-col items-center justify-center">
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          className="flex! flex-col items-center w-dvw onboarding-swiper relative max-w-[393px]"
        >
          <CustomNavigation />
          <SwiperSlide>
            <div className="flex flex-col items-center gap-2 p-6">
              <img
                src="/images/iphone-15.png"
                alt="iPhone 15"
                className="h-[201px] max-w-[200px]] object-contain"
              />
              <h2 className="max-w-[280px] text-center">
                Make connections with musicians
              </h2>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col items-center gap-4 p-6">
              <img
                src="/images/iphone-12-pro.png"
                alt="iPhone 12 Pro"
                className="h-[201px] max-w-[221px]] object-contain"
              />
              <h2 className="max-w-[280px] text-center">Post requests</h2>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col items-center gap-4 p-6">
              <img
                src="/images/iphone-15-pro.png"
                alt="iPhone 15 Pro"
                className="h-[201px] max-w-[268px]] object-contain"
              />
              <h2 className="max-w-[280px] text-center">
                Find the right service for you
              </h2>
            </div>
          </SwiperSlide>
        </Swiper>
        <Button
          text={"Get started!"}
          variant={"primary"}
          className="z-1 my-14"
          onClick={() => navigate("/onboarding/steps")}
        />
      </div>
    </>
  );
}
