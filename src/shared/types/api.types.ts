/** Generic paginated API response wrapper */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
}

/** Standard API error shape returned by the FastAPI backend */
export interface ApiErrorResponse {
  detail: string;
  status?: number;
}
