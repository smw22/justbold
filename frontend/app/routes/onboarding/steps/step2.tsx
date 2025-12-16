import { useState } from "react";
import Icon from "~/components/icon";
import Button from "~/components/Button";
import SmallLogo from "~/assets/icons/artwork/SmallLogo";
import type { FormData } from "../steps";

interface Step2Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: (isMusician: boolean) => void;
}

export default function Step2({ formData, updateFormData, onNext }: Step2Props) {
  const [selectedRole, setSelectedRole] = useState<boolean | null>(formData.isMusician);

  const handleContinue = () => {
    if (selectedRole === null) {
      alert("Please select a role to continue");
      return;
    }
    updateFormData({ isMusician: selectedRole });
    onNext(selectedRole);
  };

  return (
    <div className="m-auto flex flex-col items-center justify-evenly h-full w-[223px] gap-14 pt-14">
      <SmallLogo />
      <div className="flex flex-col gap-8">
        <button
          type="button"
          onClick={() => setSelectedRole(true)}
          className={`${
            selectedRole === true ? "border-black/50" : "border-black/10"
          } border rounded-3xl flex flex-col items-center justify-center text-center p-5 gap-5 cursor-pointer  transition-all duration-300`}
        >
          <h2 className="text-neutral-grey!">I am a musician</h2>
          <p className="text-neutral-grey!">I am a musician looking for collaborations and services</p>
          <div
            className={`${
              selectedRole === true ? "bg-primary-yellow border-transparent" : "bg-transparent border-black/10"
            } rounded-full h-6 w-6 border flex items-center justify-center transition-none`}
          >
            {selectedRole === true && <Icon name="Check" size={20} className="text-white" />}
          </div>
        </button>
        <button
          type="button"
          onClick={() => setSelectedRole(false)}
          className={`${
            selectedRole === false ? "border-black/50" : "border-black/10"
          } border rounded-3xl flex flex-col items-center justify-center text-center p-5 gap-5 cursor-pointer  transition-all duration-300`}
        >
          <h2 className="text-neutral-grey!">Not a musician</h2>
          <p className="text-neutral-grey!">I want to provide services for musicians</p>
          <div
            className={`${
              selectedRole === false ? "bg-primary-yellow border-transparent" : "bg-transparent border-black/10"
            } rounded-full h-6 w-6 border flex items-center justify-center transition-none`}
          >
            {selectedRole === false && <Icon name="Check" size={20} className="text-white" />}
          </div>
        </button>
      </div>
      <Button text="Continue" variant="primary" type="button" onClick={handleContinue} />
    </div>
  );
}
