import Button from "~/components/Button";

interface Step5Props {
  onSkip: () => void;
}

export default function Step5({ onSkip }: Step5Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <Button
        text="Start my free 7-day trial"
        variant="primary"
        onClick={onSkip}
      />
      <Button text="Skip for now" variant="primary" onClick={onSkip} />
    </div>
  );
}
