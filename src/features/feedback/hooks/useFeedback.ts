import { useMutation } from "@tanstack/react-query";
import { feedbackApi } from "../api/feedback.api";
import { useFeedbackStore } from "../store/feedback.store";
import type { FeedbackCreate } from "../types/feedback.types";

export function useSubmitFeedback() {
  const setSubmitted = useFeedbackStore((s) => s.setSubmitted);

  return useMutation({
    mutationFn: (data: FeedbackCreate) => feedbackApi.submit(data),
    onSuccess: () => setSubmitted(true),
  });
}
