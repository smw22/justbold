import { Await, Outlet, useLoaderData } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUser } from "~/lib/data/userData";
import { Suspense } from "react";

export async function clientLoader() {
  const user = await getUser();

  return {
    userId: user.data.id,
  };
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
