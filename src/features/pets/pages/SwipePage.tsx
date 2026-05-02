import { useTranslation } from "react-i18next";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@config/routes";
import { Button } from "@shared/components/ui/Button";
import PageWrapper from "@shared/components/layout/PageWrapper";
import LoadingSpinner from "@shared/components/feedback/LoadingSpinner";
import EmptyState from "@shared/components/feedback/EmptyState";
import { usePetsStore } from "../store/pets.store";
import { useCandidates } from "../hooks/useCandidates";
import { useSwipe } from "../hooks/useSwipe";
import { useGeolocation } from "../hooks/useGeolocation";
import { SwipeCard } from "../components/SwipeCard";
import type { PetCandidateResponse } from "../types/pets.types";

export default function SwipePage() {
  const { t } = useTranslation();
  const { activePetId, locationMode, radiusKm, oppositeGender, setLocationMode, setRadiusKm } =
    usePetsStore();

  const { state: geo, requestLocation } = useGeolocation();

  // Auto-request only when permission is already granted.
  // On iOS Safari, calling watchPosition without a user gesture for first-time
  // users silently queues the request (no prompt shown) and fires a TIMEOUT after
  // 10 s — hiding the "idle" banner the user needs to tap. Using the Permissions
  // API to check first means we only bypass the banner when it is safe to do so.
  // Browsers without the Permissions API (or where it is unreliable) fall through
  // to the idle state so the banner is always shown.
  useEffect(() => {
    if (!navigator.permissions) return;
    navigator.permissions
      .query({ name: "geolocation" as PermissionName })
      .then((result) => {
        if (result.state === "granted") requestLocation();
      })
      .catch(() => { /* ignore — show idle banner */ });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: candidates, isLoading, refetch } = useCandidates(
    activePetId ?? "",
    {
      location_mode: locationMode,
      radius_km: radiusKm,
      opposite_gender: oppositeGender,
      limit: 10,
      latitude: geo.status === "success" ? geo.latitude ?? undefined : undefined,
      longitude: geo.status === "success" ? geo.longitude ?? undefined : undefined,
    }
  );

  const { mutate: swipe, isPending: isSwiping } = useSwipe(activePetId ?? "");
  const [matchedPet, setMatchedPet] = useState<PetCandidateResponse | null>(null);
  const [refreshCooldown, setRefreshCooldown] = useState(false);

  const handleRefresh = useCallback(() => {
    if (refreshCooldown) return;
    refetch();
    setRefreshCooldown(true);
    setTimeout(() => setRefreshCooldown(false), 5000);
  }, [refreshCooldown, refetch]);

  const locationModeLabels: Record<string, string> = {
    radius: t("swipe.locationRadius"),
    city:   t("swipe.locationCity"),
  };

  if (!activePetId) {
    return (
      <PageWrapper>
        <EmptyState
          icon="🐶"
          title={t("swipe.noPetTitle")}
          description={t("swipe.noPetDesc")}
          action={
            <Link to={ROUTES.MY_PETS}>
              <Button>{t("swipe.myPets")}</Button>
            </Link>
          }
        />
      </PageWrapper>
    );
  }

  const currentCandidate = candidates?.[0];

  const handleLike = () => {
    if (!currentCandidate) return;
    swipe(
      { targetPetId: currentCandidate.id, action: "like" },
      { onSuccess: (result) => { if (result.matched) setMatchedPet(currentCandidate); } }
    );
  };

  const handlePass = () => {
    if (!currentCandidate) return;
    swipe({ targetPetId: currentCandidate.id, action: "pass" });
  };

  return (
    <PageWrapper title={t("swipe.title")}>

      {/* Location banner — shown only when action is needed from the user */}
      {geo.status === "loading" ? null : geo.status === "denied" ? (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-3">
          <div className="text-sm text-red-700">
            <p>{geo.errorMessage}</p>
            <p className="mt-0.5 text-xs text-red-500">{t("swipe.locationDeniedHint")}</p>
          </div>
          <Button size="sm" variant="secondary" onClick={requestLocation}>{t("swipe.retryLocation")}</Button>
        </div>
      ) : geo.status === "timeout" || geo.status === "unavailable" ? (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-amber-50 px-4 py-3">
          <span className="text-sm text-amber-700">
            {geo.errorMessage ?? t("swipe.locationUnavailable")}
          </span>
          <Button size="sm" onClick={requestLocation}>{t("swipe.retryLocation")}</Button>
        </div>
      ) : geo.status === "idle" ? (
        // First-time visitors: user-gesture button required for iOS permission prompt
        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-brand-50 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-brand-700">
            <span className="text-lg">📍</span>
            <span>{t("swipe.locationBanner")}</span>
          </div>
          <Button size="sm" onClick={requestLocation}>{t("swipe.allowLocation")}</Button>
        </div>
      ) : null}

      {/* Filter bar */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          {(["radius", "city"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setLocationMode(mode)}
              className={[
                "rounded-md px-3 py-1 text-sm font-medium transition",
                locationMode === mode
                  ? "bg-white shadow text-brand-700"
                  : "text-gray-500 hover:text-gray-700",
              ].join(" ")}
            >
              {locationModeLabels[mode]}
            </button>
          ))}
        </div>

        {locationMode === "radius" && (
          <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
            {([30, 50, 100] as const).map((km) => (
              <button
                key={km}
                onClick={() => setRadiusKm(km)}
                className={[
                  "rounded-md px-3 py-1 text-sm font-medium transition",
                  radiusKm === km
                    ? "bg-white shadow text-brand-700"
                    : "text-gray-500 hover:text-gray-700",
                ].join(" ")}
              >
                {km} km
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Swipe area */}
      {isLoading ? (
        <LoadingSpinner />
      ) : !currentCandidate ? (
        <EmptyState
          icon="✨"
          title={t("swipe.seenAllTitle")}
          description={t("swipe.seenAllDesc")}
          action={
            <Button onClick={handleRefresh} disabled={refreshCooldown} loading={refreshCooldown}>
              {t("swipe.refresh")}
            </Button>
          }
        />
      ) : (
        <SwipeCard
          key={currentCandidate.id}
          pet={currentCandidate}
          isLoading={isSwiping}
          onLike={handleLike}
          onPass={handlePass}
        />
      )}

      {/* Match overlay */}
      {matchedPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">
            <p className="text-4xl">🎉</p>
            <h2 className="mt-3 text-2xl font-bold text-gray-900">{t("swipe.itsAMatch")}</h2>
            <p className="mt-1 text-sm text-gray-500">
              {t("swipe.youAnd")}{" "}
              <span className="font-semibold text-brand-600">{matchedPet.name}</span>{" "}
              {t("swipe.likedEachOther")}
            </p>

            <div className="mt-5 overflow-hidden rounded-2xl">
              <img
                src={matchedPet.photos[0] ?? `https://picsum.photos/seed/${matchedPet.id}/400/300`}
                alt={matchedPet.name}
                className="h-48 w-full object-cover"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link to={ROUTES.MATCHES} onClick={() => setMatchedPet(null)}>
                <Button className="w-full">{t("swipe.sendMessage")}</Button>
              </Link>
              <button
                onClick={() => setMatchedPet(null)}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                {t("swipe.keepSwiping")}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
