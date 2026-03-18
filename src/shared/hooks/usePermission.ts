import { useAuth } from "@app/providers/AuthProvider";
import { PERMISSIONS, type Permission } from "@config/permissions";
import type { UserRole } from "@shared/constants/roles";

/**
 * Returns true if the current user has the permission for the given action.
 * Use this for conditional rendering; use RoleGuard for route-level protection.
 */
export function usePermission(action: Permission): boolean {
  const { user } = useAuth();
  if (!user) return false;
  return PERMISSIONS[action]?.includes(user.role as UserRole) ?? false;
}
