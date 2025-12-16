import { Outlet, useLoaderData, useRouteError, isRouteErrorResponse, redirect } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUser } from "~/lib/data/userData";
import ErrorMessage from "~/components/ErrorMessage";

export function ErrorBoundary() {
  const error = useRouteError();
  const { userId } = useLoaderData();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <>
      <Header />
      <main className="pb-28">
        <div className="outer-wrapper">
          <ErrorMessage error={`${message}: ${details}`} />
        </div>
      </main>
      <Footer userId={userId} />
    </>
  );
}

export async function clientLoader() {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return redirect("/onboarding");
    }
    const user = await getUser();
    return {
      userId: user.data.id,
    };
  } catch (error) {
    return {
      userId: undefined,
    };
  }
}

export default function AppLayout() {
  const { userId } = useLoaderData();

  return (
    <>
      <Header />
      <main className="pb-28">
        <Outlet context={{ userId }} />
      </main>
      <Footer userId={userId} />
    </>
  );
}
