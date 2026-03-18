import { useState } from "react";
import { formatAge, formatDistance } from "@shared/utils/format";
import type { PetCandidateResponse } from "../types/pets.types";

interface Props {
  pet: PetCandidateResponse;
  onLike: () => void;
  onPass: () => void;
  isLoading?: boolean;
}

const ANIM_DURATION = 350;

export function SwipeCard({ pet, onLike, onPass, isLoading }: Props) {
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);
  const photo = pet.photos[0] ?? `https://picsum.photos/seed/${pet.id}/400/500`;

  const trigger = (dir: "left" | "right") => {
    if (swipeDir || isLoading) return;
    setSwipeDir(dir);
    setTimeout(() => {
      dir === "right" ? onLike() : onPass();
    }, ANIM_DURATION);
  };

  const cardStyle: React.CSSProperties = {
    transform:
      swipeDir === "right"
        ? "translateX(140%) rotate(22deg)"
        : swipeDir === "left"
          ? "translateX(-140%) rotate(-22deg)"
          : "none",
    opacity: swipeDir ? 0 : 1,
    transition: `transform ${ANIM_DURATION}ms ease-in-out, opacity ${ANIM_DURATION}ms ease-in-out`,
  };

  return (
    <div
      style={cardStyle}
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-xl"
    >
      {/* Photo */}
      <div className="relative h-[420px]">
        <img src={photo} alt={pet.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />

        {/* LIKE stamp */}
        <div
          className="absolute left-5 top-10 rounded-lg border-4 border-green-400 px-4 py-2 transition-opacity duration-150"
          style={{ opacity: swipeDir === "right" ? 1 : 0, transform: "rotate(-20deg)" }}
        >
          <span className="text-3xl font-extrabold tracking-widest text-green-400">LIKE</span>
        </div>

        {/* NOPE stamp */}
        <div
          className="absolute right-5 top-10 rounded-lg border-4 border-red-400 px-4 py-2 transition-opacity duration-150"
          style={{ opacity: swipeDir === "left" ? 1 : 0, transform: "rotate(20deg)" }}
        >
          <span className="text-3xl font-extrabold tracking-widest text-red-400">NOPE</span>
        </div>

        {/* Distance badge */}
        {pet.distance_km != null && (
          <span className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            📍 {formatDistance(pet.distance_km)}
          </span>
        )}

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h2 className="text-2xl font-bold">{pet.name}</h2>
          <p className="text-sm text-white/80">
            {pet.breed ?? pet.species} · {formatAge(pet.age)} · {pet.gender}
          </p>
          {pet.city && <p className="mt-0.5 text-xs text-white/60">{pet.city}</p>}
          {pet.bio && <p className="mt-2 text-sm text-white/90 line-clamp-2">{pet.bio}</p>}
          {pet.personality_tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {pet.personality_tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/20 px-2 py-0.5 text-xs backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-8 p-5">
        <button
          onClick={() => trigger("left")}
          disabled={!!swipeDir || isLoading}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-2xl shadow-md transition hover:scale-110 hover:border-red-300 disabled:opacity-50"
        >
          ❌
        </button>
        <button
          onClick={() => trigger("right")}
          disabled={!!swipeDir || isLoading}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-200 bg-white text-2xl shadow-md transition hover:scale-110 hover:border-brand-500 disabled:opacity-50"
        >
          ❤️
        </button>
      </div>
    </div>
  );
}
