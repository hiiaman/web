/**
 * Analytics service stub — swap in Mixpanel, Amplitude, PostHog, etc.
 * Features call these functions; the underlying provider is irrelevant to callers.
 */
export const analyticsService = {
  track(event: string, properties?: Record<string, unknown>): void {
    if (import.meta.env.VITE_APP_ENV === "production") {
      // TODO: analyticsProvider.track(event, properties)
    } else {
      console.debug("[analytics]", event, properties);
    }
  },

  identify(userId: string, traits?: Record<string, unknown>): void {
    if (import.meta.env.VITE_APP_ENV === "production") {
      // TODO: analyticsProvider.identify(userId, traits)
    } else {
      console.debug("[analytics] identify", userId, traits);
    }
  },

  reset(): void {
    // TODO: analyticsProvider.reset()
  },
};
