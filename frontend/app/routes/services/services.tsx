import { useLoaderData, useSearchParams } from "react-router";
import ServicesCard from "./components/ServicesCard";
import type { Service } from "~/types/services/servicesProps";
import Pagination from "~/components/Pagination";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";
import { apiFetch } from "~/lib/apiFetch";

export async function clientLoader({ request }: { request: Request }): Promise<{}> {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const search = url.searchParams.get("search") || "";
  const limit = "10"; // Services per page

  // Use search endpoint if query exists, otherwise use findAll
  const endpoint = search
    ? `/services/search?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
    : `/services?page=${page}&limit=${limit}`;

  const response = await apiFetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to load services: ${response.status}`);
  }

  const result = await response.json();

  return {
    services: result.data.services,
    total: result.data.total,
    currentPage: result.data.page,
    totalPages: result.data.totalPages,
    query: search,
  };
}

export default function Services() {
  const { services, currentPage, totalPages, query: initialQuery } = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialQuery || "");

  // Debounced search - waits 300ms after user stops typing
  useEffect(() => {
    const debounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (searchQuery) {
        params.set("search", searchQuery);
      } else {
        params.delete("search");
      }

      // Reset to page 1 on new search
      params.delete("page");

      setSearchParams(params);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery, setSearchParams, searchParams.toString()]);

  return (
    <div className="flex flex-col gap-4 outer-wrapper">
      {/* Search Input */}
      <div className="sticky top-0 bg-light-grey z-10 pb-4 px-4 pt-4 mx-4">
        <Input
          variant="onboarding"
          placeholder="Search services by title..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-start"
        />
        {searchQuery && (
          <p className="text-xs text-neutral-grey mt-2">
            {services.length > 0 ? `Found ${services.length} results for "${searchQuery}"` : `No results for "${searchQuery}"`}
          </p>
        )}
      </div>

      {/* Services List */}
      <div className="px-4">
        {services.length > 0 ? (
          <div className="flex flex-col gap-8">
            {services.map((service: Service) => (
              <ServicesCard key={service.id} servicesData={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            {searchQuery ? (
              <div className="flex flex-col gap-4 items-center">
                <p className="text-neutral-grey">No services found for "{searchQuery}"</p>
                <Button variant="secondary" text="Clear search" onClick={() => setSearchQuery("")} />
              </div>
            ) : (
              <p className="text-neutral-grey">No services available</p>
            )}
          </div>
        )}
      </div>

      {/* Pagination - only show if there are results */}
      {services.length > 0 && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} redirectRoute="/services" />
      )}
    </div>
  );
}
