import { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ROUTES } from "@config/routes";
import ProtectedRoute from "./ProtectedRoute";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  VerifyEmailPage,
  MyPetsPage,
  CreatePetPage,
  EditPetPage,
  SwipePage,
  MatchesPage,
  ChatPage,
} from "./LazyRoutes";
import AppShell from "@shared/components/layout/AppShell";
import LoadingSpinner from "@shared/components/feedback/LoadingSpinner";
import GlobalErrorFallback from "@shared/components/feedback/GlobalErrorFallback";
import ErrorBoundary from "@shared/components/feedback/ErrorBoundary";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<GlobalErrorFallback />}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public routes */}
            <Route path={ROUTES.HOME}         element={<HomePage />} />
            <Route path={ROUTES.LOGIN}        element={<LoginPage />} />
            <Route path={ROUTES.REGISTER}     element={<RegisterPage />} />
            <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />

            {/* Protected routes — all require auth */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppShell />}>
                <Route path={ROUTES.SWIPE}      element={<SwipePage />} />
                <Route path={ROUTES.MY_PETS}    element={<MyPetsPage />} />
                <Route path={ROUTES.CREATE_PET} element={<CreatePetPage />} />
                <Route path={ROUTES.EDIT_PET}   element={<EditPetPage />} />
                <Route path={ROUTES.MATCHES}    element={<MatchesPage />} />
                <Route path={ROUTES.CHAT}       element={<ChatPage />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
