/**
 * All application route paths — single source of truth.
 * Never hardcode route strings in components; always import from here.
 */
export const ROUTES = {
  HOME:         "/",
  LOGIN:        "/login",
  REGISTER:     "/register",
  VERIFY_EMAIL: "/verify-email",

  // Pets
  SWIPE:      "/swipe",
  MY_PETS:    "/pets",
  CREATE_PET: "/pets/new",
  EDIT_PET:   "/pets/:petId/edit",

  // Matches & chat
  MATCHES:    "/matches",
  CHAT:       "/matches/:matchId/chat",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

/** Build a typed chat route URL */
export const chatRoute = (matchId: string) =>
  ROUTES.CHAT.replace(":matchId", matchId);

/** Build an edit-pet route URL */
export const editPetRoute = (petId: string) =>
  ROUTES.EDIT_PET.replace(":petId", petId);
