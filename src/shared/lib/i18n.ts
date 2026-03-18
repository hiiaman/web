import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import vi from "./locales/vi";

const LANG_KEY = "bdh_lang";
export type SupportedLang = "en" | "vi";

export function setLanguage(lang: SupportedLang) {
  localStorage.setItem(LANG_KEY, lang);
  i18n.changeLanguage(lang);
}

const savedLang = (localStorage.getItem(LANG_KEY) as SupportedLang | null) ?? "vi";

i18n.use(initReactI18next).init({
  lng: savedLang,
  fallbackLng: "vi",
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  interpolation: { escapeValue: false },
});

export { i18n };
