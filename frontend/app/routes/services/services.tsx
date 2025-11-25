import ServicesCard from "./components/ServicesCard";

export default function Services() {
  return (
    <>
      Services Page
      <div className="flex flex-col gap-8">
        <ServicesCard />
        <ServicesCard />
      </div>
    </>
  );
}
