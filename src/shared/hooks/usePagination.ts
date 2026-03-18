import { useState } from "react";

interface UsePaginationOptions {
  pageSize?: number;
}

export function usePagination({ pageSize = 20 }: UsePaginationOptions = {}) {
  const [offset, setOffset] = useState(0);

  const nextPage = () => setOffset((o) => o + pageSize);
  const prevPage = () => setOffset((o) => Math.max(0, o - pageSize));
  const reset    = () => setOffset(0);

  return { offset, limit: pageSize, nextPage, prevPage, reset };
}
