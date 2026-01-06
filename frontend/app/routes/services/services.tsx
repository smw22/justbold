import { useLoaderData } from "react-router";
import ServicesCard from "./components/ServicesCard";
import ServicesCardRedacted from "./components/ServicesCardRedacted";
import type { Service } from "~/types/services/servicesProps";
import Pagination from "~/components/Pagination";
import Button from "~/components/Button";
import { apiFetch } from "~/lib/apiFetch";

import type { MetaFunction } from "react-router";
import ErrorMessage from "~/components/ErrorMessage";
import ServicesSearch from "./components/ServicesSearch";

export const meta: MetaFunction = () => {
  return [
    { title: "Services | LineUp" },
    {
      property: "og:title",
      content: "Services | LineUp",
    },
    // {
    //   name: "description",
    //   content: "This app is the best",
    // },
  ];
};

export async function clientLoader({ request }: { request: Request }): Promise<{}> {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const search = url.searchParams.get("search") || "";
  const limit = "10"; // Services per page
  let servicesError = null;

  // Use search endpoint if query exists, otherwise use findAll
  const endpoint = search
    ? `/services/search?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
    : `/services?page=${page}&limit=${limit}`;

  try {
    const response = await apiFetch(endpoint);

    if (!response.ok) {
      servicesError = `Failed to load services: ${response.statusText}`;
      // throw new Error(`Failed to load services: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      servicesError = `Failed to load services: ${response.statusText}`;
      // throw new Error(result.message || "Failed to load services");
    }

    return {
      services: result.data?.services,
      total: result.data?.total,
      currentPage: result.data?.page,
      totalPages: result.data?.totalPages,
      query: search,
      servicesError: servicesError,
    };
  } catch (error) {
    return { servicesError: `Network error: ${(error as Error).message}` };
  }
}

export default function Services() {
  const { services, currentPage, totalPages, total, query: initialQuery, servicesError } = useLoaderData();

  if (!services) {
    return (
      <div className="flex flex-col gap-4 outer-wrapper px-4">
        <ErrorMessage error={servicesError} />
        <ServicesCardRedacted />
        <ServicesCardRedacted />
        <ServicesCardRedacted />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 outer-wrapper px-4">
      {/* Search Input */}
      <ServicesSearch total={total} initialQuery={initialQuery} />

      <ErrorMessage error={servicesError} />

      {/* Services List */}
      {services?.length > 0 ? (
        <div className="flex flex-col gap-8">
          {services.map((service: Service) => (
            <ServicesCard key={service.id} servicesData={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          {initialQuery ? (
            <div className="flex flex-col gap-4 items-center">
              <p className="text-neutral-grey">No services found for "{initialQuery}"</p>
              <Button variant="secondary" text="Clear search" onClick={() => (window.location.href = "/services")} />
            </div>
          ) : (
            <p className="text-neutral-grey">No services available</p>
          )}
        </div>
      )}

      {/* Pagination - only show if there are results */}
      {services?.length > 0 && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} redirectRoute="/services" />
      )}
    </div>
  );
}
