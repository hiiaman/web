import type { AxiosError } from "axios";

export interface ApiError {
  status: number;
  detail: string;
  code?: string;
}

/**
 * Maps an Axios error to a normalized ApiError.
 * Use this in query/mutation error handlers for consistent error display.
 */
export function parseApiError(error: unknown): ApiError {
  const axiosErr = error as AxiosError<{ detail?: string; message?: string }>;

  if (axiosErr.response) {
    return {
      status: axiosErr.response.status,
      detail:
        axiosErr.response.data?.detail ??
        axiosErr.response.data?.message ??
        "An error occurred",
    };
  }

  if (axiosErr.request) {
    return { status: 0, detail: "Network error — check your connection" };
  }

  return { status: 0, detail: "Unexpected error" };
}

export const ERROR_MESSAGES: Record<number, string> = {
  400: "Bad request",
  401: "Session expired — please log in again",
  403: "You don't have permission to do this",
  404: "Not found",
  409: "Conflict — this already exists",
  422: "Validation error",
  500: "Server error — try again later",
};
