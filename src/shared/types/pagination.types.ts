export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}
