import { useLoaderData } from "react-router";
import ServicesCard from "./components/ServicesCard";
import type { Service } from "~/types/services/servicesProps";
import { apiFetch } from "~/lib/apiFetch";

export async function clientLoader(): Promise<{}> {
  const response = await apiFetch(`/services`);

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
      <div className="flex flex-col gap-8 outer-wrapper">
        {services.data.map((service: Service) => (
          <ServicesCard key={service.id} servicesData={service} />
        ))}
      </div>
    </>
  );
}
