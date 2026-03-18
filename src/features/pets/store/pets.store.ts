import { create } from "zustand";
import type { LocationMode, RadiusKm } from "../types/pets.types";

interface PetsStore {
  /** The pet the user is swiping with */
  activePetId: string | null;
  setActivePetId: (id: string | null) => void;

  /** Swipe feed filter settings */
  locationMode: LocationMode;
  radiusKm: RadiusKm;
  oppositeGender: boolean;
  setLocationMode: (m: LocationMode) => void;
  setRadiusKm: (r: RadiusKm) => void;
  setOppositeGender: (v: boolean) => void;
}

export const usePetsStore = create<PetsStore>((set) => ({
  activePetId:    null,
  setActivePetId: (id) => set({ activePetId: id }),

  locationMode:    "radius",
  radiusKm:        30,
  oppositeGender:  false,
  setLocationMode: (locationMode)   => set({ locationMode }),
  setRadiusKm:     (radiusKm)      => set({ radiusKm }),
  setOppositeGender: (oppositeGender) => set({ oppositeGender }),
}));
