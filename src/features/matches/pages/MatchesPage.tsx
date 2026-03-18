import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "@config/routes";
import { Button } from "@shared/components/ui/Button";
import PageWrapper from "@shared/components/layout/PageWrapper";
import LoadingSpinner from "@shared/components/feedback/LoadingSpinner";
import EmptyState from "@shared/components/feedback/EmptyState";
import { usePetsStore } from "@features/pets/store/pets.store";
import { useMatches } from "../hooks/useMatches";
import { useMatchesStore } from "../store/matches.store";
import { MatchList } from "../components/MatchList";
import { ChatWindow } from "../components/ChatWindow";
import type { MatchResponse } from "../types/matches.types";

export default function MatchesPage() {
  const { t } = useTranslation();
  const { activePetId } = usePetsStore();
  const { selectedMatchId, setSelectedMatchId } = useMatchesStore();
  const { data: matches, isLoading } = useMatches(activePetId ?? "");

  if (!activePetId) {
    return (
      <PageWrapper>
        <EmptyState
          icon="💬"
          title={t("matches.noPetTitle")}
          description={t("matches.noPetDesc")}
          action={
            <Link to={ROUTES.MY_PETS}>
              <Button>{t("matches.myPets")}</Button>
            </Link>
          }
        />
      </PageWrapper>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Match list panel */}
      <div className="w-72 flex-shrink-0 overflow-y-auto border-r border-gray-100 bg-white">
        <div className="px-4 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{t("matches.title")}</h2>
          <p className="text-xs text-gray-400">{t("matches.total", { count: matches?.length ?? 0 })}</p>
        </div>

        {!matches?.length ? (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-gray-400">{t("matches.noMatches")}</p>
          </div>
        ) : (
          <MatchList
            matches={matches}
            selectedId={selectedMatchId}
            onSelect={(m: MatchResponse) => setSelectedMatchId(m.id)}
          />
        )}
      </div>

      {/* Chat panel */}
      <div className="flex flex-1 flex-col">
        {selectedMatchId ? (
          <ChatWindow matchId={selectedMatchId} />
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-400">
            {t("matches.selectMatch")}
          </div>
        )}
      </div>
    </div>
  );
}
