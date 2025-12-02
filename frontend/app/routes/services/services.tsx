import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import ServicesCard from "./components/ServicesCard";
import type { Service } from "~/types/services/servicesProps";
import Button from "~/components/Button";

export async function clientLoader({ request }: { request: Request }): Promise<{}> {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const limit = "10"; // Services per page

  const response = await fetch(`${import.meta.env.VITE_API_URL}/services?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error(`Failed to load services: ${response.status}`);
  }

  const result = await response.json();

  return {
    services: result.data.services,
    total: result.data.total,
    currentPage: result.data.page,
    totalPages: result.data.totalPages,
  };
}

export default function Services() {
  const { services, currentPage, totalPages } = useLoaderData();
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    navigate(`/services?page=${newPage}`);
  };

  return (
    <div className="flex flex-col gap-8 outer-wrapper">
      {services.map((service: Service) => (
        <ServicesCard key={service.id} servicesData={service} />
      ))}

      {/* Pagination Controls */}
      {/* NOTE - Add disabled to button component  */}
      <div className="flex justify-center items-center gap-4 my-8">
        <Button
          variant="secondary"
          text="Previous"
          onClick={() => handlePageChange(currentPage - 1)}
          // disabled={currentPage === 1}
        />

        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="secondary"
          text="Next"
          onClick={() => handlePageChange(currentPage + 1)}
          // disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
}
