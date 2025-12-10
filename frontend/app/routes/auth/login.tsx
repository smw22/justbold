import { Link, Form, redirect, useActionData, useNavigation } from "react-router";
import Button from "~/components/Button";
import Input from "~/components/Input";
import { apiFetch } from "~/lib/apiFetch";

import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Login | LineUp" },
    {
      property: "og:title",
      content: "Login | LineUp",
    },
    // {
    //   name: "description",
    //   content: "This app is the best",
    // },
  ];
};

interface LoginProps {
  onNext: () => void;
  onLogin: () => void;
}

export async function clientAction({ params, request }: { params: any; request: any }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email || !password) {
    return { error: "Email and password are required" };
  }
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const getAccessToken = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (getAccessToken.status === 401) {
    return { error: "Invalid email or password" };
  }

  const result = await getAccessToken.json();

  if (result.access_token) {
    console.log("Login successful! User:", email);

    localStorage.setItem("access_token", result.access_token);

    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirectTo") || "/";
    return redirect(redirectTo);
  }

  return { error: result.error || "Login failed" };
}

export default function Login({ onNext, onLogin }: LoginProps) {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="h-dvh w-screen flex flex-col items-center relative py-[50px]">
      <div className="m-auto flex flex-col items-center justify-center h-full gap-6 w-[263px]">
        <h1 className="text-primary-purple!">Login</h1>
        <Form method="POST" className="flex flex-col gap-3.5">
          <Input
            variant="onboarding"
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />

          <Input
            variant="onboarding"
            type="password"
            id="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="Your password"
          />

          {isSubmitting ? (
            <Button text="Logging in..." variant="primary" className="mt-1.5 w-fit self-center" type="submit" />
          ) : (
            <Button text="Log in" variant="primary" className="mt-1.5 w-fit self-center" type="submit" />
          )}

          {actionData?.error && (
            <div className="bg-red-300 border border-red-600 text-red-600 rounded-lg px-6 py-4">{actionData.error}</div>
          )}
        </Form>
        <p>or</p>
        <Button text="Login with Google" variant="secondary" className="text-bold" />
        <Button text="Login with AppleID" variant="secondary" className="text-bold" />
        <div>
          <span>Don't have an account? </span>
          <Link to={"/onboarding/steps"} onClick={onLogin} className="cursor-pointer text-[#007AFF]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
