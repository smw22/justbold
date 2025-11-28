import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppLayout() {
  return (
    <>
      <Header />

      <main className="pb-28">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
