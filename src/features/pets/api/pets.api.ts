import { apiClient } from "@services/api/client";
import { API } from "@services/api/endpoints";
import type {
  PetCreate,
  PetUpdate,
  PetResponse,
  PetCandidateResponse,
  CandidateParams,
  SwipeRequest,
  SwipeResponse,
} from "../types/pets.types";

export const petsApi = {
  list: () =>
    apiClient.get<PetResponse[]>(API.PETS).then((r) => r.data),

  get: (id: string) =>
    apiClient.get<PetResponse>(API.PET(id)).then((r) => r.data),

  create: (data: PetCreate) =>
    apiClient.post<PetResponse>(API.PETS, data).then((r) => r.data),

  update: (id: string, data: PetUpdate) =>
    apiClient.patch<PetResponse>(API.PET(id), data).then((r) => r.data),

  remove: (id: string) =>
    apiClient.delete(API.PET(id)),

  candidates: (petId: string, params: CandidateParams = {}) =>
    apiClient
      .get<PetCandidateResponse[]>(API.PET_CANDIDATES(petId), { params })
      .then((r) => r.data),

  swipe: (petId: string, data: SwipeRequest) =>
    apiClient.post<SwipeResponse>(API.SWIPE(petId), data).then((r) => r.data),
};
