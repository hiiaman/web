import { env } from "@config/env";

const isDev = env.APP_ENV === "development";

export const logger = {
  info:  (...args: unknown[]) => isDev && console.info("[info]",  ...args),
  warn:  (...args: unknown[]) => isDev && console.warn("[warn]",  ...args),
  error: (...args: unknown[]) => console.error("[error]", ...args),
  debug: (...args: unknown[]) => isDev && console.debug("[debug]", ...args),
};
