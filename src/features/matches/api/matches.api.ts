import { apiClient } from "@services/api/client";
import { API } from "@services/api/endpoints";
import type {
  MatchResponse,
  MessageCreate,
  MessageResponse,
  MessagesParams,
} from "../types/matches.types";

export const matchesApi = {
  list: (petId: string) =>
    apiClient.get<MatchResponse[]>(API.MATCHES(petId)).then((r) => r.data),

  get: (matchId: string) =>
    apiClient.get<MatchResponse>(API.MATCH(matchId)).then((r) => r.data),

  sendMessage: (matchId: string, senderPetId: string, data: MessageCreate) =>
    apiClient
      .post<MessageResponse>(API.MESSAGES(matchId), data, { params: { sender_pet_id: senderPetId } })
      .then((r) => r.data),

  getMessages: (matchId: string, petId: string, params: MessagesParams = {}) =>
    apiClient
      .get<MessageResponse[]>(API.MESSAGES(matchId), { params: { pet_id: petId, ...params } })
      .then((r) => r.data),
};
