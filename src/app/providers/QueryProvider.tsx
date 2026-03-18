import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import { env } from "@config/env";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,      // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {env.APP_ENV === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
