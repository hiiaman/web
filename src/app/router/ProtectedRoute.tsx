import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@app/providers/AuthProvider";
import { ROUTES } from "@config/routes";
import LoadingSpinner from "@shared/components/feedback/LoadingSpinner";

/**
 * Redirects unauthenticated users to /login.
 * Preserves the intended destination in location state for post-login redirect.
 */
export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
