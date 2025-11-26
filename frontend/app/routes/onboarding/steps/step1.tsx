import Button from "~/components/Button";

interface Step1Props {
  onNext: () => void;
  onSkip: () => void;
  onLogin: () => void;
}

export default function Step1({ onNext, onSkip, onLogin }: Step1Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <Button text="Continue" variant="primary" onClick={onNext} />
      <Button text="Log In" variant="primary" onClick={onLogin} />
      <Button text="Skip for now" variant="primary" onClick={onSkip} />
    </div>
  );
}
