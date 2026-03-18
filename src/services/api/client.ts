import axios from "axios";
import { env } from "@config/env";
import { tokenService } from "@services/auth/tokenService";
import { API } from "./endpoints";

/**
 * Single Axios instance for the whole app.
 * Never import axios directly — import `apiClient` from here.
 */
const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
});

// ── Request interceptor: attach Bearer token ──────────────────────────────────
apiClient.interceptors.request.use((config) => {
  const token = tokenService.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response interceptor: refresh on 401 ─────────────────────────────────────
let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Never attempt a token refresh for auth endpoints themselves
    const isAuthEndpoint = original.url?.includes("/auth/");
    if (error.response?.status !== 401 || original._retry || isAuthEndpoint) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshQueue.push((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(original));
        });
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token");

      const { data } = await axios.post(
        `${env.API_BASE_URL}${API.AUTH_REFRESH}`,
        { refresh_token: refreshToken }
      );

      tokenService.setTokens(data.access_token, data.refresh_token);
      refreshQueue.forEach((cb) => cb(data.access_token));
      refreshQueue = [];

      original.headers.Authorization = `Bearer ${data.access_token}`;
      return apiClient(original);
    } catch {
      tokenService.clearTokens();
      window.location.href = "/login";
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  }
);

export { apiClient };
