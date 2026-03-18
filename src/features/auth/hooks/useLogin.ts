import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@config/routes";
import { tokenService } from "@services/auth/tokenService";
import { locationService } from "@services/location/locationService";
import { queryKeys } from "@shared/constants/queryKeys";
import { authApi } from "../api/auth.api";
import type { LoginRequest } from "../types/auth.types";

export function useLogin() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: async (tokens) => {
      tokenService.setTokens(tokens.access_token, tokens.refresh_token);
      locationService.requestAndStore();
      // Eagerly fetch user into cache so AuthProvider (which lives outside
      // BrowserRouter) re-renders with isAuthenticated=true before ProtectedRoute
      // checks it. invalidateQueries alone doesn't work because the query is
      // disabled (enabled: false) until a token exists — it never triggers a
      // re-render when the query was never fetched.
      await qc.fetchQuery({
        queryKey: queryKeys.currentUser(),
        queryFn: authApi.me,
      });
      navigate(ROUTES.SWIPE);
    },
  });
}
