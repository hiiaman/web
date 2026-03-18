import type { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import QueryProvider from "./QueryProvider";
import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";

interface Props {
  children: ReactNode;
}

/**
 * Root provider composition — order matters:
 * QueryProvider (outermost) → ThemeProvider → AuthProvider → children
 */
export default function AppProviders({ children }: Props) {
  return (
    <HelmetProvider>
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </QueryProvider>
    </HelmetProvider>
  );
}
