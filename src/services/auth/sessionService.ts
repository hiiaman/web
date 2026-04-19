import { tokenService } from "./tokenService";
import { apiClient } from "@services/api/client";
import { API } from "@services/api/endpoints";

/**
 * Session-level operations that require an API call.
 * Token storage is delegated to tokenService.
 */
export const sessionService = {
  async logout(): Promise<void> {
    try {
      const refreshToken = tokenService.getRefreshToken();
      if (refreshToken) {
        await apiClient.post(API.AUTH_LOGOUT, { refresh_token: refreshToken });
      }
    } catch {
      // ignore API errors — always clear local tokens
    } finally {
      tokenService.clearTokens();
    }
  },
};
