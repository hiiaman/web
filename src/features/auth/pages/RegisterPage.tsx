import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { ROUTES } from "@config/routes";
import { env } from "@config/env";
import { Button } from "@shared/components/ui/Button";
import { Input } from "@shared/components/ui/Input";
import { LanguageSwitcher } from "@shared/components/ui";
import { PageSEO } from "@shared/components/seo/PageSEO";
import { parseApiError } from "@services/api/errorHandler";
import { authApi } from "../api/auth.api";

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const { mutate: register, isPending, error } = useMutation({
    mutationFn: (token: string) =>
      authApi.register({
        email: form.email,
        full_name: form.full_name,
        password: form.password,
        captcha_token: token,
      }),
    onSuccess: () =>
      navigate(ROUTES.VERIFY_EMAIL, { state: { email: form.email } }),
    onError: () => {
      turnstileRef.current?.reset();
      setCaptchaToken(null);
    },
  });

  const apiError = error ? parseApiError(error).detail : null;

  function validate() {
    const next: Partial<typeof form> = {};
    if (!form.full_name.trim()) next.full_name = t("auth.fullName") + " is required";
    if (!form.email.trim()) next.email = t("auth.email") + " is required";
    if (form.email !== form.confirmEmail) next.confirmEmail = t("auth.emailMismatch");
    if (form.password.length < 8) next.password = t("auth.passwordTooShort");
    if (form.password !== form.confirmPassword) next.confirmPassword = t("auth.passwordMismatch");
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken || !validate()) return;
    register(captchaToken);
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <>
      <PageSEO title={t("auth.createAccount")} canonical="/register" noIndex />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-white p-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <span className="text-5xl">🐾</span>
            <h1 className="mt-3 text-3xl font-bold text-gray-900">Zommie</h1>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <h2 className="mb-6 text-xl font-semibold text-gray-800">{t("auth.createAccount")}</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label={t("auth.fullName")}
                value={form.full_name}
                onChange={set("full_name")}
                error={errors.full_name}
                autoComplete="name"
                required
              />
              <Input
                label={t("auth.email")}
                type="email"
                value={form.email}
                onChange={set("email")}
                error={errors.email}
                autoComplete="email"
                required
              />
              <Input
                label={t("auth.confirmEmail")}
                type="email"
                value={form.confirmEmail}
                onChange={set("confirmEmail")}
                error={errors.confirmEmail}
                autoComplete="email"
                required
              />
              <Input
                label={t("auth.password")}
                type="password"
                value={form.password}
                onChange={set("password")}
                error={errors.password}
                autoComplete="new-password"
                required
              />
              <Input
                label={t("auth.confirmPassword")}
                type="password"
                value={form.confirmPassword}
                onChange={set("confirmPassword")}
                error={errors.confirmPassword}
                autoComplete="new-password"
                required
              />

              <Turnstile
                ref={turnstileRef}
                siteKey={env.TURNSTILE_SITE_KEY}
                onSuccess={setCaptchaToken}
                onExpire={() => setCaptchaToken(null)}
                onError={() => setCaptchaToken(null)}
                options={{ theme: "light" }}
              />

              {apiError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{apiError}</p>
              )}

              <Button type="submit" loading={isPending} disabled={!captchaToken || isPending} className="mt-2 w-full">
                {t("auth.createAccount")}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              {t("auth.alreadyHaveAccount")}{" "}
              <Link to={ROUTES.LOGIN} className="font-medium text-brand-600 hover:underline">
                {t("auth.signIn")}
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
