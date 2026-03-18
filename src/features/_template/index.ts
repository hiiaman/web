// Only export what other layers actually need.
// Pages and components are consumed directly by the router — don't export them here.
export { useTemplateStore } from "./store/template.store";
export type { TemplateItem } from "./types/template.types";
