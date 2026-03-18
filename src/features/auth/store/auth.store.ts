import { create } from "zustand";

interface AuthStore {
  /** Set to true while a login/register mutation is in flight */
  isSubmitting: boolean;
  setSubmitting: (v: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isSubmitting: false,
  setSubmitting: (v) => set({ isSubmitting: v }),
}));
