import Button from "~/components/Button";

interface Step4Props {
  onNext: () => void;
  onSkip: () => void;
}

export default function Step4({ onNext, onSkip }: Step4Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <Button text="Continue" variant="primary" onClick={onNext} />
      <Button text="Skip for now" variant="primary" onClick={onSkip} />
    </div>
  );
}
