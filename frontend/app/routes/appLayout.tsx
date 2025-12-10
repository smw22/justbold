import { Outlet, useLoaderData } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { apiFetch } from "~/lib/apiFetch";

export async function clientLoader() {
  const userResponse = await apiFetch(`/user`);

  if (!userResponse.ok) {
    throw new Error(`Failed to load user: ${userResponse.status}`);
  }

  const user = await userResponse.json();
  const userId = user.data.id;

  return { userId };
}

export default function AppLayout() {
  const { userId } = useLoaderData();

  return (
    <>
      <Header />

      <main className="pb-28">
        <Outlet />
      </main>

      <Footer userId={userId} />
    </>
  );
}
