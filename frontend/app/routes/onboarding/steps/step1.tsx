import { Link } from "react-router";
import Button from "~/components/Button";
import Input from "~/components/Input";
import type { FormData } from "../steps";

interface Step1Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onSkip: () => void;
  onLogin: () => void;
}

export default function Step1({ formData, updateFormData, onNext, onSkip, onLogin }: Step1Props) {
  const handleContinue = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onNext();
  };

  return (
    <div className="m-auto flex flex-col items-center justify-center gap-6 w-[263px] pt-14">
      <h1 className="text-primary-purple!">Sign up</h1>
      <div className="text-center">
        <p>By continuing you agree to LineUp!</p>
        <p>Terms of use and Privacy Policy</p>
      </div>
      <div className="flex flex-col gap-3.5">
        <Input
          variant="onboarding"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          name="email"
          required
        />
        <Input
          variant="onboarding"
          placeholder="Enter your password"
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData({ password: e.target.value })}
          name="password"
          required
        />
        <Input
          variant="onboarding"
          placeholder="Repeat your password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
          name="confirmPassword"
          required
        />
        <Button text="Continue" variant="primary" type="button" onClick={handleContinue} className="mt-1.5 w-fit self-center" />
      </div>
      <p>or</p>
      <Button text="Sign up with Google" variant="secondary" type="button" className="font-bold" />
      <Button text="Sign up with AppleID" variant="secondary" type="button" className="font-bold" />
      <div>
        <span>Already have an account? </span>
        <Link to={"/login"} onClick={onLogin} className="cursor-pointer text-[#007AFF]">
          Log In
        </Link>
      </div>
      <button type="button" onClick={onSkip} className="cursor-pointer underline">
        Skip for now
      </button>
    </div>
  );
}
