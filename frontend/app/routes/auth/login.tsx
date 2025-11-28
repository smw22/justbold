import { Link } from "react-router";
import { useState } from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";

interface LoginProps {
  onNext: () => void;
  onLogin: () => void;
}

export default function Login({ onNext, onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="h-dvh w-screen flex flex-col items-center relative py-[50px]">
      <div className="m-auto flex flex-col items-center justify-center h-full gap-6 w-[263px]">
        <h1 className="text-primary-purple!">Login</h1>
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
          <Button
            text="Continue"
            variant="primary"
            onClick={onNext}
            className="mt-1.5 w-fit self-center"
          />
        </form>
        <p>or</p>
        <Button
          text="Login with Google"
          variant="secondary"
          className="text-bold"
        />
        <Button
          text="Login with AppleID"
          variant="secondary"
          className="text-bold"
        />
        <div>
          <span>Don't have an account? </span>
          <Link
            to={"/onboarding/steps"}
            onClick={onLogin}
            className="cursor-pointer text-[#007AFF]"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
