import { create } from "zustand";

interface MatchesStore {
  selectedMatchId: string | null;
  setSelectedMatchId: (id: string | null) => void;
}

export const useMatchesStore = create<MatchesStore>((set) => ({
  selectedMatchId: null,
  setSelectedMatchId: (id) => set({ selectedMatchId: id }),
}));
