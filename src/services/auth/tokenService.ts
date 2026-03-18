const ACCESS_KEY  = "bdh_access_token";
const REFRESH_KEY = "bdh_refresh_token";

/**
 * Token storage — localStorage-backed.
 * All token I/O must go through this service; never read/write localStorage directly.
 */
export const tokenService = {
  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
  },

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_KEY);
  },

  clearTokens(): void {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },

  isLoggedIn(): boolean {
    return !!localStorage.getItem(ACCESS_KEY);
  },
};
