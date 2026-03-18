import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@shared/constants/queryKeys";
import { matchesApi } from "../api/matches.api";
import type { MessageCreate } from "../types/matches.types";

export function useMessages(matchId: string, petId: string) {
  return useQuery({
    queryKey: queryKeys.messages(matchId),
    queryFn: () => matchesApi.getMessages(matchId, petId),
    enabled: !!matchId && !!petId,
  });
}

export function useSendMessage(matchId: string, senderPetId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: MessageCreate) => matchesApi.sendMessage(matchId, senderPetId, data),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.messages(matchId) }),
  });
}
