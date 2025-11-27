import { useState } from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Toggle from "~/components/Switch";

interface Step3Props {
  isMusician: boolean;
  onNext: () => void;
}

export default function Step3({ isMusician, onNext }: Step3Props) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [business, setBusiness] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  return (
    <div className="m-auto flex flex-col items-center justify-center min-h-full gap-14 w-[263px] pt-14">
      {isMusician ? (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3>First & last name</h3>
            <Input
              variant="onboarding"
              placeholder="Enter your name & last name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3>Phone number</h3>
            <div className="flex gap-4">
              <div className="h-[45.6px] w-[45.6px] rounded-lg border border-black/20 flex items-center justify-center">
                <img
                  src="/images/dk.png"
                  alt="DK"
                  className="h-5 object-cover"
                />
              </div>
              <Input
                variant="onboarding"
                placeholder="Phone number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                name="phoneNumber"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3>Year of birth</h3>
            <Input
              variant="onboarding"
              placeholder="Enter your year of birth"
              type="number"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              name="date"
              className=""
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3>Where do you live?</h3>
            <Input
              variant="onboarding"
              placeholder="Enter your city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              name="city"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3>Name of your Business</h3>
            <Input
              variant="onboarding"
              placeholder="Enter the name of business"
              type="text"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              name="business"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3>Phone number</h3>
            <div className="flex gap-4">
              <div className="h-[45.6px] w-[45.6px] rounded-lg border border-black/20 flex items-center justify-center">
                <img
                  src="/images/dk.png"
                  alt="DK"
                  className="h-5 object-cover"
                />
              </div>
              <Input
                variant="onboarding"
                placeholder="Phone number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                name="phoneNumber"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3>Where are you located</h3>
            <div className="flex gap-2.5 items-center">
              <Toggle
                value={isRemote}
                onClick={() => setIsRemote(!isRemote)}
                className="[&_.toggle-switch]:outline-black/20! [&_input:checked+.toggle-switch]:outline-primary-yellow! [&_.toggle-switch:before]:outline-black/20! [&_input:checked+.toggle-switch:before]:outline-primary-yellow!"
              />
              <span>Remote</span>
            </div>
            {!isRemote && (
              <Input
                variant="onboarding"
                placeholder="Enter your city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                name="city"
              />
            )}
          </div>
        </div>
      )}
      <Button text="Continue" variant="primary" onClick={onNext} />
    </div>
  );
}
