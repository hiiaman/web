import { apiClient } from "@services/api/client";
import { API } from "@services/api/endpoints";
import type { FeedbackCreate, FeedbackResponse } from "../types/feedback.types";

export const feedbackApi = {
  submit: (data: FeedbackCreate) =>
    apiClient.post<FeedbackResponse>(API.FEEDBACK, data).then((r) => r.data),
};
