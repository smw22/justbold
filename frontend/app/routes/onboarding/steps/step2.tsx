import Button from "~/components/Button";

interface Step2Props {
  onNext: () => void;
}

export default function Step2({ onNext }: Step2Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <Button text="Continue" variant="primary" onClick={onNext} />
    </div>
  );
}
