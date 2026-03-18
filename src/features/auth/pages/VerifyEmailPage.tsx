import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "@config/routes";
import { Button } from "@shared/components/ui/Button";
import { LanguageSwitcher } from "@shared/components/ui";
import { PageSEO } from "@shared/components/seo/PageSEO";
import { parseApiError } from "@services/api/errorHandler";
import { authApi } from "../api/auth.api";

const RESEND_COOLDOWN = 30;

export default function VerifyEmailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Email is passed via navigate state from RegisterPage
  const email: string = (location.state as { email?: string })?.email ?? "";

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Redirect if someone lands here without an email
  useEffect(() => {
    if (!email) navigate(ROUTES.REGISTER, { replace: true });
  }, [email, navigate]);

  // Cooldown ticker
  useEffect(() => {
    if (cooldown <= 0) return;
    cooldownRef.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(cooldownRef.current!);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(cooldownRef.current!);
  }, [cooldown]);

  const { mutate: verify, isPending: isVerifying, error: verifyError } = useMutation({
    mutationFn: () => authApi.verifyEmail({ email, code }),
    onSuccess: () => setIsVerified(true),
  });

  const { mutate: resend, isPending: isResending } = useMutation({
    mutationFn: () => authApi.resendVerification({ email }),
    onSuccess: () => setCooldown(RESEND_COOLDOWN),
  });

  const apiError = verifyError ? parseApiError(verifyError) : null;
  const displayError =
    codeError ??
    (apiError?.status === 422 || apiError?.status === 401
      ? t("auth.verifyEmail.invalidCode")
      : apiError
      ? t("auth.loginError")
      : null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCodeError(null);
    if (!code.trim()) {
      setCodeError(t("auth.verifyEmail.codeRequired"));
      return;
    }
    verify();
  }

  if (!email) return null;

  return (
    <>
      <PageSEO title={t("auth.verifyEmail.title")} canonical="/verify-email" noIndex />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-white p-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <span className="text-5xl">🐾</span>
            <h1 className="mt-3 text-3xl font-bold text-gray-900">Zommie</h1>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            {isVerified ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center gap-4 py-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("auth.verifyEmail.successTitle")}
                </h2>
                <p className="text-sm text-gray-500">{t("auth.verifyEmail.successDesc")}</p>
                <Link
                  to={ROUTES.LOGIN}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
                >
                  {t("auth.verifyEmail.goToLogin")}
                </Link>
              </div>
            ) : (
              /* ── Code entry state ── */
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {t("auth.verifyEmail.title")}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {t("auth.verifyEmail.subtitle")}{" "}
                    <span className="font-medium text-gray-700">{email}</span>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="verify-code" className="text-sm font-medium text-gray-700">
                      {t("auth.verifyEmail.codeLabel")}
                    </label>
                    <input
                      id="verify-code"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={code}
                      onChange={(e) => {
                        setCodeError(null);
                        setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                      }}
                      placeholder={t("auth.verifyEmail.codePlaceholder")}
                      className={[
                        "rounded-lg border px-3 py-3 text-center text-2xl font-bold tracking-widest outline-none transition-colors",
                        displayError
                          ? "border-red-400 focus:ring-2 focus:ring-red-400"
                          : "border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
                      ].join(" ")}
                      autoComplete="one-time-code"
                    />
                    {displayError && (
                      <p className="text-xs text-red-500">{displayError}</p>
                    )}
                  </div>

                  <Button type="submit" loading={isVerifying} className="w-full">
                    {t("auth.verifyEmail.submit")}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  {cooldown > 0 ? (
                    <p className="text-sm text-gray-400">
                      {t("auth.verifyEmail.resendCooldown", { seconds: cooldown })}
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => resend()}
                      disabled={isResending}
                      className="text-sm font-medium text-brand-600 hover:underline disabled:opacity-50"
                    >
                      {t("auth.verifyEmail.resend")}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="mt-4 flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
