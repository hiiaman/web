/**
 * All API base paths — mirrors the FastAPI router structure.
 * Features import from here; never hardcode URLs in feature code.
 */
export const API = {
  // Auth
  AUTH_LOGIN:              "/api/v1/auth/login",
  AUTH_REFRESH:            "/api/v1/auth/refresh",
  AUTH_LOGOUT:             "/api/v1/auth/logout",
  AUTH_VERIFY_EMAIL:       "/api/v1/auth/verify-email",
  AUTH_RESEND_VERIFICATION:"/api/v1/auth/resend-verification",

  // Users
  USERS:        "/api/v1/users",
  USERS_ME:     "/api/v1/users/me",
  USER:         (id: string) => `/api/v1/users/${id}`,

  // Pets
  PETS:         "/api/v1/pets",
  PET:          (id: string) => `/api/v1/pets/${id}`,
  PET_CANDIDATES: (id: string) => `/api/v1/pets/${id}/candidates`,

  // Swipes
  SWIPE:        (petId: string) => `/api/v1/pets/${petId}/swipe`,

  // Matches
  MATCHES:      (petId: string) => `/api/v1/matches/pets/${petId}`,
  MATCH:        (id: string) => `/api/v1/matches/${id}`,
  MESSAGES:     (matchId: string) => `/api/v1/matches/${matchId}/messages`,

  // Upload
  UPLOAD_PHOTO: "/api/v1/upload/photo",

  // Feedback
  FEEDBACK: "/api/v1/feedback",
} as const;
