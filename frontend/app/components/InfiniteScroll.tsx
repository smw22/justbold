import React, { useCallback, useEffect, useRef, useState } from "react";

interface InfiniteScrollProps<T> {
  fetchPage: (page: number, limit: number) => Promise<{ data: T[] }>;
  renderItem: (item: T, idx: number) => React.ReactNode;
  initialData?: T[];
  pageSize?: number;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
  className?: string;
}

export function InfiniteScroll<T>({
  fetchPage,
  renderItem,
  initialData = [],
  pageSize = 10,
  loader = null,
  endMessage = null,
  className = "",
}: InfiniteScrollProps<T>) {
  const [items, setItems] = useState<T[]>(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || end) return;
    setLoading(true);
    try {
      const res = await fetchPage(page + 1, pageSize);
      if (!res.data || res.data.length < pageSize) setEnd(true);
      setItems((prev) => [...prev, ...(res.data || [])]);
      setPage((prev) => prev + 1);
    } catch (e) {
      setEnd(true);
    } finally {
      setLoading(false);
    }
  }, [loading, end, page, fetchPage, pageSize]);

  useEffect(() => {
    if (!loaderRef.current || end) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0, rootMargin: "200px" }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore, end]);

  return (
    <div className={className}>
      {items.map((item, idx) => renderItem(item, idx))}
      {!end && (
        <div ref={loaderRef} style={{ minHeight: 40, textAlign: "center" }}>
          {loading ? loader : null}
        </div>
      )}
      {end && endMessage}
    </div>
  );
}
