import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Icon from "~/components/icon";
import Input from "~/components/Input";

export default function ServicesSearch({ total, initialQuery }: { total: number; initialQuery: string }) {
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

  return (
    <div>
      <div className="flex items-center gap-2 sticky top-0 bg-light-grey z-10 pb-4 pt-4">
        <Input
          variant="search"
          icon="Search"
          placeholder="Search services by title..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        <button className="flex items-center gap-1" onClick={() => alert("Filter functionality coming soon!")}>
          <Icon name="Filter" size={24} />
          <span>Filter</span>
        </button>
      </div>
      {searchQuery && (
        <p className="text-xs text-neutral-grey mt-2">
          {total > 0
            ? `Found ${total} result${total !== 1 ? "s" : ""} for "${searchQuery}"`
            : `No results for "${searchQuery}"`}
        </p>
      )}
    </div>
  );
}
