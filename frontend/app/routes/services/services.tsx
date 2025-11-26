import ServicesCard from "./components/ServicesCard";
import type { Params } from "react-router";

// export async function clientLoader({ params }: { params: Params }) {
//   const response = await fetch(
//     `${import.meta.env.VITE_API_URL}/services/${params.serviceId}`
//   );

//   if (response.status === 404) {
//     throw new Response("Service Not Found", { status: 404 });
//   }

//   if (!response.ok) {
//     throw new Error(`Failed to load service: ${response.status}`);
//   }

//   const service = await response.json();
//   return { service };
// }

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
