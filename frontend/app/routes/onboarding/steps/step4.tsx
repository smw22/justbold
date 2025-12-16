import { useState } from "react";
import Button from "~/components/Button";
import OptionButton from "~/components/OptionButton";
import type { FormData } from "../steps";

interface Step4Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onSkip: () => void;
}

export default function Step4({ formData, updateFormData, onNext, onSkip }: Step4Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(formData.lookingFor || null);

  const options = [
    { id: "connect", text: "Connect to follow musicians" },
    { id: "promote", text: "Promote my music" },
    { id: "band", text: "Find a band to play with" },
    { id: "services", text: "Find services for my music" },
  ];

  const handleContinue = () => {
    if (selectedOption) {
      updateFormData({ lookingFor: selectedOption });
    }
    onNext();
  };

  return (
    <div className="m-auto flex flex-col items-center justify-center gap-14 w-[273px] py-14">
      <h3 className="self-start">I am looking to</h3>
      <div className="flex flex-col gap-4 w-full">
        {options.map((option) => (
          <OptionButton
            key={option.id}
            text={option.text}
            isSelected={selectedOption === option.id}
            onClick={() => setSelectedOption(option.id)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <Button text="Continue" variant="primary" type="button" onClick={handleContinue} className="mt-2" />
        <button type="button" onClick={onSkip} className="cursor-pointer underline">
          Skip for now
        </button>
      </div>
    </div>
  );
}
