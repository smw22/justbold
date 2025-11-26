import { Link } from "react-router";
import Button from "~/components/Button";

interface Step1Props {
  onNext: () => void;
  onSkip: () => void;
  onLogin: () => void;
}

export default function Step1({ onNext, onSkip, onLogin }: Step1Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <h1 className="text-primary-purple!">Sign up</h1>
      <div className="text-center">
        <p>By continuing you agree to LineUp!</p>
        <p>Terms of use and Privacy Policy</p>
      </div>
      <Button text="Continue" variant="primary" onClick={onNext} />
      <p>or</p>
      <Button text="Sign up with Google" variant="secondary" />
      <Button text="Sign up with AppleID" variant="secondary" />
      <div>
        <span>Already have an account? </span>
        <Link
          to={"/login"}
          onClick={onLogin}
          className="cursor-pointer text-[#007AFF]"
        >
          Log In
        </Link>
      </div>
      <button onClick={onSkip} className="cursor-pointer underline">
        Skip for now
      </button>
    </div>
  );
}
