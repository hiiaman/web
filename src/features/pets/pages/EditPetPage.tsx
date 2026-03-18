import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@config/routes";
import PageWrapper from "@shared/components/layout/PageWrapper";
import LoadingSpinner from "@shared/components/feedback/LoadingSpinner";
import { usePet, useUpdatePet } from "../hooks/usePets";
import { PetForm } from "../components/PetForm";
import type { PetCreate, PetUpdate } from "../types/pets.types";

export default function EditPetPage() {
  const { t } = useTranslation();
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();

  const { data: pet, isLoading } = usePet(petId ?? "");
  const { mutate: updatePet, isPending } = useUpdatePet(petId ?? "");

  if (isLoading) return <LoadingSpinner />;
  if (!pet) return null;

  // PetResponse uses null for optional fields; PetCreate uses undefined
  const initialValues: Partial<PetCreate> = {
    name:              pet.name,
    species:           pet.species,
    gender:            pet.gender,
    age:               pet.age,
    breed:             pet.breed ?? undefined,
    weight:            pet.weight ?? undefined,
    neutered:          pet.neutered,
    personality_tags:  pet.personality_tags,
    bio:               pet.bio ?? undefined,
    photos:            pet.photos,
    city:              pet.city ?? undefined,
    province:          pet.province ?? undefined,
  };

  const handleSubmit = (data: PetCreate) => {
    // species, gender, latitude & longitude are not updated via this form
    const { species: _s, gender: _g, latitude: _lat, longitude: _lng, ...updateData } = data;
    const payload: PetUpdate = updateData;
    updatePet(payload, { onSuccess: () => navigate(ROUTES.MY_PETS) });
  };

  return (
    <PageWrapper title={t("pages.editPet", { name: pet.name })}>
      <div className="mx-auto max-w-lg">
        <PetForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          isLoading={isPending}
          editMode
        />
      </div>
    </PageWrapper>
  );
}
