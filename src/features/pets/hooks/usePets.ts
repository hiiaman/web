import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@shared/constants/queryKeys";
import { petsApi } from "../api/pets.api";
import type { PetCreate, PetUpdate } from "../types/pets.types";

export function useMyPets() {
  return useQuery({
    queryKey: queryKeys.myPets(),
    queryFn: petsApi.list,
  });
}

export function usePet(id: string) {
  return useQuery({
    queryKey: queryKeys.pet(id),
    queryFn: () => petsApi.get(id),
    enabled: !!id,
  });
}

export function useCreatePet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: PetCreate) => petsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.myPets() }),
  });
}

export function useUpdatePet(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: PetUpdate) => petsApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.myPets() });
      qc.invalidateQueries({ queryKey: queryKeys.pet(id) });
    },
  });
}

export function useDeletePet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => petsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.myPets() }),
  });
}
