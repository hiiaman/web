import { useEffect } from "react";
import { useMyPets } from "./usePets";
import { usePetsStore } from "../store/pets.store";

/**
 * Automatically sets the first pet as active when:
 *  - activePetId is null and the user has pets
 *  - the active pet was deleted (no longer in the list)
 */
export function useAutoActivePet() {
  const { data: pets } = useMyPets();
  const { activePetId, setActivePetId } = usePetsStore();

  useEffect(() => {
    if (!pets?.length) return;

    const stillExists = pets.some((p) => p.id === activePetId);
    if (!activePetId || !stillExists) {
      setActivePetId(pets[0].id);
    }
  }, [pets, activePetId, setActivePetId]);
}
