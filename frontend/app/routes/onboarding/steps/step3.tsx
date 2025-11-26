import Button from "~/components/Button";

interface Step3Props {
  onNext: () => void;
}

export default function Step3({ onNext }: Step3Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <Button text="Continue" variant="primary" onClick={onNext} />
    </div>
  );
}
