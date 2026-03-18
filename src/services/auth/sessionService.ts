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
      await apiClient.post(API.AUTH_LOGOUT);
    } finally {
      tokenService.clearTokens();
    }
  },
};
