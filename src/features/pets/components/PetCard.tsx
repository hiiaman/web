import { formatAge } from "@shared/utils/format";
import type { PetResponse } from "../types/pets.types";

interface Props {
  pet: PetResponse;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function PetCard({ pet, onEdit, onDelete }: Props) {
  const photo = pet.photos[0] ?? `https://picsum.photos/seed/${pet.id}/400/300`;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
      <div className="relative h-48 w-full">
        <img src={photo} alt={pet.name} className="h-full w-full object-cover" />
        {!pet.is_active && (
          <span className="absolute right-2 top-2 rounded-full bg-gray-800/70 px-2 py-0.5 text-xs text-white">
            Inactive
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
            <p className="text-sm text-gray-500">
              {pet.breed ?? pet.species} · {formatAge(pet.age)} · {pet.gender}
            </p>
          </div>
          <span className="text-2xl">{pet.species === "cat" ? "🐱" : pet.species === "dog" ? "🐶" : "🐾"}</span>
        </div>
        {pet.personality_tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {pet.personality_tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700">
                {tag}
              </span>
            ))}
          </div>
        )}
        {(onEdit || onDelete) && (
          <div className="mt-4 flex gap-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="flex-1 rounded-lg border border-gray-200 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="flex-1 rounded-lg border border-red-100 py-1.5 text-sm text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
