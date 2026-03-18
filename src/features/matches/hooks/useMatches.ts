import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/constants/queryKeys";
import { matchesApi } from "../api/matches.api";

export function useMatches(petId: string) {
  return useQuery({
    queryKey: queryKeys.matches(petId),
    queryFn: () => matchesApi.list(petId),
    enabled: !!petId,
  });
}

export function useMatch(matchId: string) {
  return useQuery({
    queryKey: queryKeys.match(matchId),
    queryFn: () => matchesApi.get(matchId),
    enabled: !!matchId,
  });
}
