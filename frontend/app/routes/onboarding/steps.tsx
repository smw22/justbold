import "./onboarding.css";
import { useState } from "react";
import { useNavigate, Form } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";
import Step5 from "./steps/step5";
import { redirect } from "react-router";

export async function clientAction({ request }: { request: Request }) {
  const formData = await request.formData();

  // Extract form data
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const isMusician = formData.get("isMusician") === "true";
  const name = formData.get("name") as string;
  const business = formData.get("business") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const yearOfBirth = formData.get("yearOfBirth") as string;
  const city = formData.get("city") as string;
  const isRemote = formData.get("isRemote") === "true";
  const subscription = formData.get("subscription") as string;

  // Prepare data for backend according to CreateUserDto
  const userData = {
    name: isMusician ? name : business,
    email,
    password,
    phone: phoneNumber,
    year_of_birth: yearOfBirth ? parseInt(yearOfBirth) : 0,
    location: isRemote ? "Remote" : city,
    subscription: subscription || "free",
    user_type: isMusician ? "musician" : "service_provider",
  };

  try {
    console.log("Submitting user data:", userData);
    const apiUrl = import.meta.env.VITE_API_URL as string;

    // Step 1: Create the user
    const response = await fetch(`${apiUrl}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("User created successfully:", result);

      // Step 2: Automatically log in the user to get access token
      try {
        const loginResponse = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
          }),
        });

        if (loginResponse.ok) {
          const loginResult = await loginResponse.json();
          console.log("User logged in successfully:", loginResult);

          // Step 3: Store the access token in localStorage
          if (loginResult.access_token) {
            localStorage.setItem("access_token", loginResult.access_token);
          }

          return redirect("../");
        } else {
          // User created but login failed - redirect to login page
          console.error("Auto-login failed, redirecting to login");
          return redirect("/login");
        }
      } catch (loginError) {
        console.error("Error during auto-login:", loginError);
        // User created but auto-login failed - redirect to login page
        return redirect("/login");
      }
    } else {
      const error = await response.json();
      console.error("Error creating user:", error);
      return { error: "Failed to create user. Please try again." };
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "An error occurred. Please try again." };
  }
}

const totalSteps = 5;

export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  isMusician: boolean;
  name: string;
  phoneNumber: string;
  yearOfBirth: string;
  city: string;
  business: string;
  isRemote: boolean;
  lookingFor: string;
  subscription: string;
}

export default function Steps() {
  const navigate = useNavigate();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    isMusician: true,
    name: "",
    phoneNumber: "",
    yearOfBirth: "",
    city: "",
    business: "",
    isRemote: false,
    lookingFor: "",
    subscription: "",
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  const handleStep2Next = (musicianRole: boolean) => {
    updateFormData({ isMusician: musicianRole });
    swiperInstance?.slideNext();
  };

  const handleSkip = () => {
    navigate("../");
  };

  return (
    <Form
      method="post"
      className="min-h-dvh w-full flex flex-col items-center relative pt-[50px] pb-10"
      suppressHydrationWarning
    >
      {/* Hidden inputs to preserve form state */}
      <input type="hidden" name="email" value={formData.email} />
      <input type="hidden" name="password" value={formData.password} />
      <input type="hidden" name="isMusician" value={String(formData.isMusician)} />
      <input type="hidden" name="name" value={formData.name} />
      <input type="hidden" name="business" value={formData.business} />
      <input type="hidden" name="phoneNumber" value={formData.phoneNumber} />
      <input type="hidden" name="yearOfBirth" value={formData.yearOfBirth} />
      <input type="hidden" name="city" value={formData.city} />
      <input type="hidden" name="isRemote" value={String(formData.isRemote)} />
      <input type="hidden" name="subscription" value={formData.subscription} />

      <div className="w-[300px] relative">
        <div className="h-1.5 bg-black opacity-8 rounded-3xl absolute w-full top-0 left-0"></div>
        <div
          className="h-1.5 bg-primary-yellow rounded-3xl z-1 absolute top-0 left-0 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / totalSteps) * 300}px` }}
        ></div>
      </div>
      <Swiper
        slidesPerView={1}
        speed={0}
        allowTouchMove={false}
        autoHeight={true}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setCurrentStep(swiper.activeIndex)}
        className="w-full flex-1"
      >
        <SwiperSlide>
          <Step1
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onSkip={handleSkip}
            onLogin={() => navigate("/login")}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Step2 formData={formData} updateFormData={updateFormData} onNext={handleStep2Next} />
        </SwiperSlide>
        <SwiperSlide>
          <Step3 formData={formData} updateFormData={updateFormData} onNext={handleNext} />
        </SwiperSlide>
        <SwiperSlide>
          <Step4 formData={formData} updateFormData={updateFormData} onNext={handleNext} onSkip={handleSkip} />
        </SwiperSlide>
        <SwiperSlide>
          <Step5 formData={formData} updateFormData={updateFormData} onSkip={handleSkip} />
        </SwiperSlide>
      </Swiper>
    </Form>
  );
}
