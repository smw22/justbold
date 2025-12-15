import Button from "~/components/Button";
import Input from "~/components/Input";
import Toggle from "~/components/Switch";
import type { FormData } from "../steps";

interface Step3Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
}

export default function Step3({ formData, updateFormData, onNext }: Step3Props) {
  return (
    <div className="m-auto flex flex-col items-center justify-center min-h-full gap-14 w-[263px] pt-14">
      {formData.isMusician ? (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3>First & last name</h3>
            <Input
              variant="onboarding"
              placeholder="Enter your name & last name"
              type="text"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              name="name"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3>Phone number</h3>
            <div className="flex gap-4">
              <div className="h-[45.6px] w-[45.6px] rounded-lg border border-black/20 flex items-center justify-center">
                <img src="/images/dk.png" alt="DK" className="h-5 object-cover" />
              </div>
              <Input
                variant="onboarding"
                placeholder="Phone number"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
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
              value={formData.yearOfBirth}
              onChange={(e) => updateFormData({ yearOfBirth: e.target.value })}
              name="yearOfBirth"
              className=""
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3>Where do you live?</h3>
            <Input
              variant="onboarding"
              placeholder="Enter your city"
              type="text"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
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
              value={formData.business}
              onChange={(e) => updateFormData({ business: e.target.value })}
              name="business"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3>Phone number</h3>
            <div className="flex gap-4">
              <div className="h-[45.6px] w-[45.6px] rounded-lg border border-black/20 flex items-center justify-center">
                <img src="/images/dk.png" alt="DK" className="h-5 object-cover" />
              </div>
              <Input
                variant="onboarding"
                placeholder="Phone number"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
                name="phoneNumber"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3>Where are you located</h3>
            <div className="flex gap-2.5 items-center">
              <Toggle
                value={formData.isRemote}
                onClick={() => updateFormData({ isRemote: !formData.isRemote })}
                className="[&_.toggle-switch]:outline-black/20! [&_input:checked+.toggle-switch]:outline-primary-yellow! [&_.toggle-switch:before]:outline-black/20! [&_input:checked+.toggle-switch:before]:outline-primary-yellow!"
              />
              <span>Remote</span>
            </div>
            {!formData.isRemote && (
              <Input
                variant="onboarding"
                placeholder="Enter your city"
                type="text"
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                name="city"
              />
            )}
          </div>
        </div>
      )}
      <Button text="Continue" variant="primary" type="button" onClick={onNext} />
    </div>
  );
}
