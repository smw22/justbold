import { Link } from "react-router";
import { useState } from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";

interface Step1Props {
  onNext: () => void;
  onSkip: () => void;
  onLogin: () => void;
}

export default function Step1({ onNext, onSkip, onLogin }: Step1Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Pass data
    onNext();
  };

  return (
    <div className="m-auto flex flex-col items-center justify-center gap-6 w-[263px] pt-14">
      <h1 className="text-primary-purple!">Sign up</h1>
      <div className="text-center">
        <p>By continuing you agree to LineUp!</p>
        <p>Terms of use and Privacy Policy</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <Input
          variant="onboarding"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <Input
          variant="onboarding"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        <Input
          variant="onboarding"
          placeholder="Repeat your password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          name="confirmPassword"
        />
        <Button
          text="Continue"
          variant="primary"
          onClick={onNext}
          className="mt-1.5 w-fit self-center"
        />
      </form>
      <p>or</p>
      <Button
        text="Sign up with Google"
        variant="secondary"
        className="text-bold"
      />
      <Button
        text="Sign up with AppleID"
        variant="secondary"
        className="text-bold"
      />
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
