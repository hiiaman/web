import { ROLES, type UserRole } from "@shared/constants/roles";

/**
 * Permission matrix — maps actions to allowed roles.
 * Used by RoleGuard and usePermission hook.
 */
export const PERMISSIONS: Record<string, UserRole[]> = {
  // All authenticated users
  view_swipe:    [ROLES.USER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  manage_pets:   [ROLES.USER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  view_matches:  [ROLES.USER, ROLES.ADMIN, ROLES.SUPER_ADMIN],

  // Admin only
  manage_users:  [ROLES.ADMIN, ROLES.SUPER_ADMIN],
  view_reports:  [ROLES.ADMIN, ROLES.SUPER_ADMIN],

  // Super admin only
  manage_admins: [ROLES.SUPER_ADMIN],
} as const;

export type Permission = keyof typeof PERMISSIONS;
