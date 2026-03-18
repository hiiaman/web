import { useTranslation } from "react-i18next";
import { setLanguage, type SupportedLang } from "@shared/lib/i18n";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const current = i18n.language as SupportedLang;

  return (
    <div className={`flex items-center gap-1 rounded-full bg-gray-100 p-1 ${className ?? ""}`}>
      {(["en", "vi"] as SupportedLang[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={[
            "rounded-full px-3 py-1 text-xs font-semibold transition-all",
            current === lang
              ? "bg-white shadow text-gray-800"
              : "text-gray-400 hover:text-gray-600",
          ].join(" ")}
        >
          {lang === "en" ? "EN" : "VI"}
        </button>
      ))}
    </div>
  );
}
