import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { ROUTES } from "@config/routes";
import { env } from "@config/env";
import { Button } from "@shared/components/ui/Button";
import { Input } from "@shared/components/ui/Input";
import { parseApiError } from "@services/api/errorHandler";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const { t } = useTranslation();
  const { mutate: login, isPending, error } = useLogin();
  const [form, setForm] = useState({ email: "", password: "" });
  const isDev = env.APP_ENV !== "production";
  const [captchaToken, setCaptchaToken] = useState<string | null>(isDev ? "dev-bypass" : null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const parsedError = error ? parseApiError(error) : null;

  const isNotVerified =
    parsedError?.status === 401 &&
    parsedError.detail.toLowerCase().includes("not verified");

  const apiError = parsedError
    ? isNotVerified
      ? null // rendered separately below
      : parsedError.status === 401
      ? t("auth.invalidCredentials")
      : t("auth.loginError")
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) return;
    login(
      { ...form, captcha_token: captchaToken },
      {
        onError: () => {
          if (!isDev) {
            turnstileRef.current?.reset();
            setCaptchaToken(null);
          }
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label={t("auth.email")}
        type="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        required
        autoComplete="email"
      />
      <Input
        label={t("auth.password")}
        type="password"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        required
        autoComplete="current-password"
        showPasswordToggle
      />

      {!isDev && (
        <Turnstile
          ref={turnstileRef}
          siteKey={env.TURNSTILE_SITE_KEY}
          onSuccess={setCaptchaToken}
          onExpire={() => setCaptchaToken(null)}
          onError={() => setCaptchaToken(null)}
          options={{ theme: "light" }}
        />
      )}

      {apiError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{apiError}</p>
      )}

      {isNotVerified && (
        <div className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">
          {t("auth.emailNotVerified")}{" "}
          <Link
            to={ROUTES.VERIFY_EMAIL}
            state={{ email: form.email }}
            className="font-medium underline hover:text-amber-900"
          >
            {t("auth.verifyEmail.submit")}
          </Link>
        </div>
      )}

      <Button type="submit" loading={isPending} disabled={!captchaToken || isPending} className="mt-2 w-full">
        {t("auth.signIn")}
      </Button>
    </form>
  );
}
