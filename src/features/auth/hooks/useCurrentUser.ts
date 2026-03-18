import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/constants/queryKeys";
import { tokenService } from "@services/auth/tokenService";
import { authApi } from "../api/auth.api";

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.currentUser(),
    queryFn: authApi.me,
    enabled: tokenService.isLoggedIn(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}
