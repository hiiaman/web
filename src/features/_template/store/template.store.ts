import { create } from "zustand";

interface TemplateStore {
  // Add feature-specific UI state here
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}));
