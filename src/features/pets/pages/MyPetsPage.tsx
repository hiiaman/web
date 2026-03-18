import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES, editPetRoute } from "@config/routes";
import { Button } from "@shared/components/ui/Button";
import { Modal } from "@shared/components/ui/Modal";
import PageWrapper from "@shared/components/layout/PageWrapper";
import LoadingSpinner from "@shared/components/feedback/LoadingSpinner";
import EmptyState from "@shared/components/feedback/EmptyState";
import { useMyPets, useDeletePet } from "../hooks/usePets";
import { usePetsStore } from "../store/pets.store";
import { PetCard } from "../components/PetCard";

export default function MyPetsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: pets, isLoading } = useMyPets();
  const { mutate: deletePet } = useDeletePet();
  const { activePetId, setActivePetId } = usePetsStore();
  const [deletingPet, setDeletingPet] = useState<{ id: number; name: string } | null>(null);

  if (isLoading) return <LoadingSpinner />;

  return (
    <PageWrapper
      title={t("myPets.title")}
      actions={
        <Link to={ROUTES.CREATE_PET}>
          <Button size="sm">{t("myPets.addPet")}</Button>
        </Link>
      }
    >
      {!pets?.length ? (
        <EmptyState
          icon="🐾"
          title={t("myPets.emptyTitle")}
          description={t("myPets.emptyDesc")}
          action={
            <Link to={ROUTES.CREATE_PET}>
              <Button>{t("myPets.addPetBtn")}</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <div key={pet.id} className={`relative ${activePetId === pet.id ? "pt-4" : ""}`}>
              {activePetId === pet.id && (
                <span className="absolute top-0 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-0.5 text-xs text-white shadow">
                  {t("myPets.activeSwiping")}
                </span>
              )}
              <PetCard
                pet={pet}
                onEdit={() => navigate(editPetRoute(pet.id))}
                onDelete={() => setDeletingPet({ id: pet.id, name: pet.name })}
              />
              <button
                className="mt-2 w-full rounded-lg border border-brand-200 py-1.5 text-sm text-brand-600 hover:bg-brand-50"
                onClick={() => setActivePetId(activePetId === pet.id ? null : pet.id)}
              >
                {activePetId === pet.id ? t("myPets.deselect") : t("myPets.useForSwiping")}
              </button>
            </div>
          ))}
        </div>
      )}
      <Modal
        open={!!deletingPet}
        onClose={() => setDeletingPet(null)}
        title={t("myPets.deleteTitle")}
      >
        <p className="mb-6 text-gray-600">
          {t("myPets.deleteConfirm", { name: deletingPet?.name })}
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeletingPet(null)}>
            {t("common.cancel")}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (deletingPet) deletePet(deletingPet.id);
              setDeletingPet(null);
            }}
          >
            {t("common.delete")}
          </Button>
        </div>
      </Modal>
    </PageWrapper>
  );
}
