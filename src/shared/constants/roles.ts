export const ROLES = {
  USER:        "user",
  ADMIN:       "admin",
  SUPER_ADMIN: "super_admin",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];
