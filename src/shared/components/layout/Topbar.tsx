import { useTranslation, Trans } from "react-i18next";
import { useAuth } from "@app/providers/AuthProvider";
import { Button } from "@shared/components/ui";
import { LanguageSwitcher } from "@shared/components/ui";
import { sessionService } from "@services/auth/sessionService";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const qc = useQueryClient();

  const handleLogout = async () => {
    await sessionService.logout();
    qc.clear();
    window.location.href = "/login";
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 md:hidden"
          aria-label="Open menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-sm text-gray-500">
          <Trans
            i18nKey="topbar.welcome"
            values={{ name: user?.full_name }}
            components={{ strong: <span className="font-medium text-gray-800" /> }}
          />
        </span>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          {t("topbar.signOut")}
        </Button>
      </div>
    </header>
  );
}
