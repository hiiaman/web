import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@shared/components/ui/Button";
import { Input } from "@shared/components/ui/Input";
import { Modal } from "@shared/components/ui/Modal";
import { useSubmitFeedback } from "../hooks/useFeedback";
import { useFeedbackStore } from "../store/feedback.store";

export function FeedbackWidget() {
  const { t } = useTranslation();
  const { isOpen, isSubmitted, open, close, reset } = useFeedbackStore();
  const { mutate, isPending, error } = useSubmitFeedback();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  function handleClose() {
    close();
    setTimeout(() => {
      reset();
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    }, 200);
  }

  function validate() {
    const next: typeof errors = {};
    if (!name.trim()) next.name = t("feedback.nameRequired");
    if (!email.trim()) next.email = t("feedback.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t("feedback.emailInvalid");
    if (!message.trim()) next.message = t("feedback.messageRequired");
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    mutate({ name: name.trim(), email: email.trim(), message: message.trim() });
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={open}
        aria-label={t("feedback.trigger")}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Modal */}
      <Modal open={isOpen} onClose={handleClose} title={t("feedback.title")}>
        {isSubmitted ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900">{t("feedback.thankYouTitle")}</h3>
            <p className="text-sm text-gray-500">{t("feedback.thankYouDesc")}</p>
            <Button variant="secondary" size="sm" onClick={handleClose}>
              {t("feedback.close")}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label={t("feedback.name")}
              placeholder={t("feedback.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              autoComplete="name"
            />
            <Input
              label={t("feedback.email")}
              type="email"
              placeholder={t("feedback.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="feedback-message" className="text-sm font-medium text-gray-700">
                {t("feedback.message")}
              </label>
              <textarea
                id="feedback-message"
                rows={4}
                placeholder={t("feedback.messagePlaceholder")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={[
                  "rounded-lg border px-3 py-2 text-sm outline-none transition-colors resize-none",
                  "placeholder:text-gray-400",
                  errors.message
                    ? "border-red-400 focus:ring-2 focus:ring-red-400"
                    : "border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
                ].join(" ")}
              />
              {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
            </div>

            {error && (
              <p className="text-xs text-red-500">{t("feedback.submitError")}</p>
            )}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={handleClose}>
                {t("feedback.cancel")}
              </Button>
              <Button type="submit" size="sm" loading={isPending}>
                {t("feedback.submit")}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
