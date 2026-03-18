import type { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function PageWrapper({ title, children, actions }: Props) {
  return (
    <div className="mx-auto max-w-5xl p-6">
      {(title || actions) && (
        <div className="mb-6 flex items-center justify-between">
          {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
