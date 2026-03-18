import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@config/routes";
import PageWrapper from "@shared/components/layout/PageWrapper";
import { useCreatePet } from "../hooks/usePets";
import { PetForm } from "../components/PetForm";
import type { PetCreate } from "../types/pets.types";

export default function CreatePetPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: createPet, isPending } = useCreatePet();

  const handleSubmit = (data: PetCreate) => {
    createPet(data, { onSuccess: () => navigate(ROUTES.MY_PETS) });
  };

  return (
    <PageWrapper title={t("pages.createPet")}>
      <div className="mx-auto max-w-lg">
        <PetForm onSubmit={handleSubmit} isLoading={isPending} />
      </div>
    </PageWrapper>
  );
}
