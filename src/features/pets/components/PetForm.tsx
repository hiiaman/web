import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Input } from "@shared/components/ui/Input";
import { Button } from "@shared/components/ui/Button";
import { locationService } from "@services/location/locationService";
import { PhotoUploader } from "./PhotoUploader";
import type { PetCreate } from "../types/pets.types";

interface Props {
  initialValues?: Partial<PetCreate>;
  onSubmit: (data: PetCreate) => void;
  isLoading?: boolean;
  /** When true, species & gender selects are disabled (immutable after creation) */
  editMode?: boolean;
}

export function PetForm({ initialValues, onSubmit, isLoading, editMode = false }: Props) {
  const { t } = useTranslation();
  const stored = locationService.get();

  const [form, setForm] = useState<PetCreate>({
    name: "",
    species: "dog",
    gender: "male",
    age: 12,
    latitude: stored.latitude,
    longitude: stored.longitude,
    ...initialValues,
  });

  useEffect(() => {
    if (editMode) return;
    if (sessionStorage.getItem("bdh_lat")) return;
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        locationService.set(latitude, longitude);
        setForm((f) => ({ ...f, latitude, longitude }));
      },
      () => {},
      { enableHighAccuracy: false, timeout: 10_000 },
    );
  }, [editMode]);

  const set = <K extends keyof PetCreate>(key: K, value: PetCreate[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label={t("petForm.petName")}
        value={form.name}
        onChange={(e) => set("name", e.target.value)}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            {t("petForm.species")} {editMode && <span className="text-xs text-gray-400">{t("petForm.fixed")}</span>}
          </label>
          <select
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-400"
            value={form.species}
            disabled={editMode}
            onChange={(e) => set("species", e.target.value as PetCreate["species"])}
          >
            <option value="dog">{t("petForm.dog")}</option>
            <option value="cat">{t("petForm.cat")}</option>
            <option value="other">{t("petForm.other")}</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            {t("petForm.gender")} {editMode && <span className="text-xs text-gray-400">{t("petForm.fixed")}</span>}
          </label>
          <select
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-400"
            value={form.gender}
            disabled={editMode}
            onChange={(e) => set("gender", e.target.value as PetCreate["gender"])}
          >
            <option value="male">{t("petForm.male")}</option>
            <option value="female">{t("petForm.female")}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t("petForm.ageMonths")}
          type="number"
          min={0}
          value={form.age}
          onChange={(e) => set("age", Number(e.target.value))}
          required
        />
        <Input
          label={t("petForm.weightKg")}
          type="number"
          min={0}
          step={0.1}
          value={form.weight ?? ""}
          onChange={(e) =>
            set("weight", e.target.value ? Number(e.target.value) : undefined)
          }
        />
      </div>

      <Input
        label={t("petForm.breed")}
        value={form.breed ?? ""}
        onChange={(e) => set("breed", e.target.value || undefined)}
      />

      <Input
        label={t("petForm.cityProvince")}
        value={form.city ?? ""}
        onChange={(e) => {
          const val = e.target.value || undefined;
          setForm((f) => ({ ...f, city: val, province: val }));
        }}
      />

      <PhotoUploader
        photos={form.photos ?? []}
        onChange={(photos) => set("photos", photos)}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">{t("petForm.bio")}</label>
        <textarea
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          rows={3}
          value={form.bio ?? ""}
          onChange={(e) => set("bio", e.target.value || undefined)}
          placeholder={t("petForm.bioPlaceholder")}
        />
      </div>


      <Button type="submit" loading={isLoading} className="mt-2">
        {t("petForm.savePet")}
      </Button>
    </form>
  );
}
