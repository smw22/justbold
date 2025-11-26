import "./onboarding.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";
import Step5 from "./steps/step5";

const totalSteps = 5;

export default function Steps() {
  const navigate = useNavigate();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  const handleSkip = () => {
    navigate("../");
  };

  return (
    <div className="h-dvh w-screen flex flex-col items-center relative py-[50px]">
      <div className="w-[300px] relative">
        <div className="h-1.5 bg-black opacity-16 rounded-3xl absolute w-full top-0 left-0"></div>
        <div
          className="h-1.5 bg-primary-yellow rounded-3xl z-1 absolute top-0 left-0 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / totalSteps) * 300}px` }}
        ></div>
      </div>
      <Swiper
        slidesPerView={1}
        allowTouchMove={false}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setCurrentStep(swiper.activeIndex)}
        className="w-full h-full"
      >
        <SwiperSlide>
          <Step1
            onNext={handleNext}
            onSkip={handleSkip}
            onLogin={() => navigate("/login")}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Step2 onNext={handleNext} />
        </SwiperSlide>
        <SwiperSlide>
          <Step3 onNext={handleNext} />
        </SwiperSlide>
        <SwiperSlide>
          <Step4 onNext={handleNext} onSkip={handleSkip} />
        </SwiperSlide>
        <SwiperSlide>
          <Step5 onSkip={handleSkip} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
