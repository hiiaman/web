import { useTranslation, Trans } from "react-i18next";
import { useAuth } from "@app/providers/AuthProvider";
import { Button } from "@shared/components/ui";
import { LanguageSwitcher } from "@shared/components/ui";
import { sessionService } from "@services/auth/sessionService";
import { useQueryClient } from "@tanstack/react-query";

export default function Topbar() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const qc = useQueryClient();

  const handleLogout = async () => {
    await sessionService.logout();
    qc.clear();
    window.location.href = "/login";
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <span className="text-sm text-gray-500">
        <Trans
          i18nKey="topbar.welcome"
          values={{ name: user?.full_name }}
          components={{ strong: <span className="font-medium text-gray-800" /> }}
        />
      </span>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          {t("topbar.signOut")}
        </Button>
      </div>
    </header>
  );
}
