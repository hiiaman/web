import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "@config/routes";
import { LanguageSwitcher } from "@shared/components/ui";
import { PageSEO } from "@shared/components/seo/PageSEO";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageSEO title={t("auth.signIn")} canonical="/login" noIndex />
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-white p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-5xl">🐾</span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">Zommie</h1>
          <p className="mt-1 text-sm text-gray-500">{t("auth.findMatch")}</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">{t("auth.signIn")}</h2>
          <LoginForm />
          <p className="mt-4 text-center text-sm text-gray-500">
            {t("auth.dontHaveAccount")}{" "}
            <Link to={ROUTES.REGISTER} className="font-medium text-brand-600 hover:underline">
              {t("auth.register")}
            </Link>
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
    </>
  );
}
