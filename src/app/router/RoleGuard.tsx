import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@app/providers/AuthProvider";
import { ROUTES } from "@config/routes";
import type { UserRole } from "@shared/constants/roles";

interface Props {
  allowedRoles: UserRole[];
}

/**
 * Renders children only if the current user has one of the allowed roles.
 * Redirects to home otherwise.
 */
export default function RoleGuard({ allowedRoles }: Props) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role as UserRole)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
}
