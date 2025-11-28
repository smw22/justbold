import { useState } from "react";
import Button from "~/components/Button";
import OptionButton from "~/components/OptionButton";

interface Step4Props {
  onNext: () => void;
  onSkip: () => void;
}

export default function Step4({ onNext, onSkip }: Step4Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    { id: "connect", text: "Connect to follow musicians" },
    { id: "promote", text: "Promote my music" },
    { id: "band", text: "Find a band to play with" },
    { id: "services", text: "Find services for my music" },
  ];

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
        <Button
          text="Continue"
          variant="primary"
          onClick={onNext}
          className="mt-2"
        />
        <button onClick={onSkip} className="cursor-pointer underline">
          Skip for now
        </button>
      </div>
    </div>
  );
}
