import { useLoaderData } from "react-router";
import ServicesCard from "./components/ServicesCard";
import type { Service } from "~/types/services/servicesProps";

export async function clientLoader(): Promise<{}> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/services`);

  if (!response.ok) {
    throw new Error(`Failed to load service: ${response.status}`);
  }

  const services = await response.json();

  return { services };
}

export default function Services() {
  const { services } = useLoaderData();

  return (
    <>
      Services Page
      <div className="flex flex-col gap-8">
        {services.data.map((service: Service) => (
          <ServicesCard key={service.id} servicesData={service} />
        ))}
      </div>
    </>
  );
}
