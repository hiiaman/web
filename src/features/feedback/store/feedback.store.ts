import { create } from "zustand";

interface FeedbackStore {
  isOpen: boolean;
  isSubmitted: boolean;
  open: () => void;
  close: () => void;
  setSubmitted: (v: boolean) => void;
  reset: () => void;
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  isOpen: false,
  isSubmitted: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setSubmitted: (v) => set({ isSubmitted: v }),
  reset: () => set({ isOpen: false, isSubmitted: false }),
}));
