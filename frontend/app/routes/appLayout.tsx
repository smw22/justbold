import { Outlet, useLoaderData } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export async function clientLoader() {
  const token = localStorage.getItem("access_token");
  const user = {
    data: {
      id: token,
    },
  };

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
