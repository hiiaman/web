import { apiClient } from "@services/api/client";
import { API } from "@services/api/endpoints";
import type { UserResponse } from "@shared/types/user.types";
import type {
  LoginRequest,
  RegisterRequest,
  ResendVerificationRequest,
  TokenResponse,
  VerifyEmailRequest,
} from "../types/auth.types";

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<TokenResponse>(API.AUTH_LOGIN, data).then((r) => r.data),

  register: (data: RegisterRequest) =>
    apiClient.post<UserResponse>(API.USERS, data).then((r) => r.data),

  me: () =>
    apiClient.get<UserResponse>(API.USERS_ME).then((r) => r.data),

  verifyEmail: (data: VerifyEmailRequest) =>
    apiClient.post<void>(API.AUTH_VERIFY_EMAIL, data).then((r) => r.data),

  resendVerification: (data: ResendVerificationRequest) =>
    apiClient.post<void>(API.AUTH_RESEND_VERIFICATION, data).then((r) => r.data),
};
