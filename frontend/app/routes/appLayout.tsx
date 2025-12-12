import { Outlet, useLoaderData } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUser } from "~/lib/data/userData";

export async function clientLoader() {
  try {
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
        <Outlet />
      </main>
      <Footer userId={userId} />
    </>
  );
}
