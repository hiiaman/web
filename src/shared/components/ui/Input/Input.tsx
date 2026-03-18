import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", id, ...rest }: Props) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          "rounded-lg border px-3 py-2 text-sm outline-none transition-colors",
          "placeholder:text-gray-400",
          error
            ? "border-red-400 focus:ring-2 focus:ring-red-400"
            : "border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
          className,
        ].join(" ")}
        {...rest}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
