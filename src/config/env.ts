/**
 * Typed environment variable access.
 * All VITE_* vars must be declared here — never access import.meta.env directly elsewhere.
 */
export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL as string,
  APP_ENV: (import.meta.env.VITE_APP_ENV ?? "development") as
    | "development"
    | "staging"
    | "production",
  TURNSTILE_SITE_KEY: (import.meta.env.VITE_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA") as string,
} as const;
