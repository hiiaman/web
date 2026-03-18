import { lazy } from "react";

// Home
export const HomePage = lazy(() => import("@features/home/pages/HomePage"));

// Auth
export const LoginPage         = lazy(() => import("@features/auth/pages/LoginPage"));
export const RegisterPage      = lazy(() => import("@features/auth/pages/RegisterPage"));
export const VerifyEmailPage   = lazy(() => import("@features/auth/pages/VerifyEmailPage"));

// Pets
export const MyPetsPage    = lazy(() => import("@features/pets/pages/MyPetsPage"));
export const CreatePetPage = lazy(() => import("@features/pets/pages/CreatePetPage"));
export const EditPetPage   = lazy(() => import("@features/pets/pages/EditPetPage"));
export const SwipePage     = lazy(() => import("@features/pets/pages/SwipePage"));

// Matches
export const MatchesPage = lazy(() => import("@features/matches/pages/MatchesPage"));
export const ChatPage    = lazy(() => import("@features/matches/pages/ChatPage"));
