import { apiClient } from "@services/api/client";
// import { API } from "@services/api/endpoints";
import type { TemplateItem } from "../types/template.types";

// Replace with real API endpoints from services/api/endpoints.ts
export const templateApi = {
  list: () =>
    apiClient.get<TemplateItem[]>("/api/v1/REPLACE_ME").then((r) => r.data),
};
