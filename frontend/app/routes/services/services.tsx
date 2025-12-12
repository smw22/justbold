import { useLoaderData, useNavigation, useSearchParams } from "react-router";
import ServicesCard from "./components/ServicesCard";
import ServicesCardRedacted from "./components/ServicesCardRedacted";
import type { Service } from "~/types/services/servicesProps";
import Pagination from "~/components/Pagination";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";
import { apiFetch } from "~/lib/apiFetch";

import type { MetaFunction } from "react-router";
import ErrorMessage from "~/components/ErrorMessage";

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
      if (searchQuery !== initialQuery) {
        params.delete("page");
      }

      setSearchParams(params);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery, setSearchParams, initialQuery]);

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
      <div className="sticky top-0 bg-light-grey z-10 pb-4 pt-4">
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
            {total > 0
              ? `Found ${total} result${total !== 1 ? "s" : ""} for "${searchQuery}"`
              : `No results for "${searchQuery}"`}
          </p>
        )}
      </div>

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

      {/* Pagination - only show if there are results */}
      {services?.length > 0 && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} redirectRoute="/services" />
      )}
    </div>
  );
}
