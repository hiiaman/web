import { createContext, useContext, type ReactNode } from "react";
import { useCurrentUser } from "@features/auth/hooks/useCurrentUser";
import type { UserResponse } from "@shared/types/user.types";

interface AuthContextValue {
  user: UserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useCurrentUser();

  return (
    <AuthContext.Provider
      value={{ user: user ?? null, isLoading, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
