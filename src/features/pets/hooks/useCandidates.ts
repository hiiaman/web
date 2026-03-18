import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/constants/queryKeys";
import { petsApi } from "../api/pets.api";
import type { CandidateParams } from "../types/pets.types";

export function useCandidates(petId: string, params: CandidateParams = {}) {
  return useQuery({
    queryKey: queryKeys.candidates(petId, params),
    queryFn: () => petsApi.candidates(petId, params),
    enabled: !!petId,
    staleTime: 1000 * 30, // re-fetch after 30s so recently-swiped pets disappear
  });
}
