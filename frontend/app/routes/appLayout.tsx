import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppLayout() {
  return (
    <>
      <Header />

      <main className="pb-[7rem]">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
