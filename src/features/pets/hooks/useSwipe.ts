import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@shared/constants/queryKeys";
import { petsApi } from "../api/pets.api";
import type { SwipeRequest } from "../types/pets.types";

export function useSwipe(swiperPetId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (vars: { targetPetId: string; action: SwipeRequest["action"] }) =>
      petsApi.swipe(swiperPetId, { swiped_pet_id: vars.targetPetId, action: vars.action }),

    onSuccess: (result, vars) => {
      // Remove the swiped pet from the candidate cache immediately
      qc.setQueriesData(
        { queryKey: ["candidates", swiperPetId] },
        (old: unknown) =>
          Array.isArray(old)
            ? old.filter((p: { id: string }) => p.id !== vars.targetPetId)
            : old
      );

      // If it's a match, refresh the matches list
      if (result.matched) {
        qc.invalidateQueries({ queryKey: queryKeys.matches(swiperPetId) });
      }
    },
  });
}
