/**
 * TanStack Query key factory — centralized so keys are consistent across hooks.
 * All query keys must be defined here.
 */
export const queryKeys = {
  // Auth
  currentUser: () => ["currentUser"] as const,

  // Pets
  myPets:     ()           => ["pets", "mine"] as const,
  pet:        (id: string) => ["pets", id] as const,
  candidates: (petId: string, params?: unknown) =>
    ["candidates", petId, params] as const,

  // Matches
  matches:  (petId: string) => ["matches", petId] as const,
  match:    (id: string)    => ["match", id] as const,
  messages: (matchId: string, params?: Record<string, unknown>) =>
    ["messages", matchId, params] as const,
} as const;
