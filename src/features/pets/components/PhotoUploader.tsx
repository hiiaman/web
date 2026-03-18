import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiClient } from "@services/api/client";
import { API } from "@services/api/endpoints";

const MAX_PHOTOS = 5;
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

interface Props {
  photos: string[];
  onChange: (photos: string[]) => void;
}

const TIPS = [
  "photoUploader.tip1",
  "photoUploader.tip2",
  "photoUploader.tip3",
  "photoUploader.tip4",
  "photoUploader.tip5",
] as const;

export function PhotoUploader({ photos, onChange }: Props) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remaining = MAX_PHOTOS - photos.length;
  const atLimit = remaining === 0;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);

    // Only take as many files as slots remaining
    const allowed = Array.from(files).slice(0, remaining);
    if (allowed.length === 0) return;

    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of allowed) {
        const body = new FormData();
        body.append("file", file);
        const res = await apiClient.post<{ url: string }>(API.UPLOAD_PHOTO, body, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploaded.push(res.data.url);
      }
      onChange([...photos, ...uploaded]);
    } catch {
      setError(t("photoUploader.uploadError"));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = (index: number) =>
    onChange(photos.filter((_, i) => i !== index));

  const resolveUrl = (url: string) =>
    url.startsWith("http") ? url : `${API_BASE}${url}`;

  return (
    <div className="flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          {t("photoUploader.label")}
        </label>
        <span className={`text-xs font-medium tabular-nums ${atLimit ? "text-amber-600" : "text-gray-400"}`}>
          {t("photoUploader.count", { count: photos.length, max: MAX_PHOTOS })}
        </span>
      </div>

      {/* Tips box */}
      <div className="rounded-lg border border-brand-100 bg-brand-50 px-4 py-3">
        <p className="mb-2 text-xs font-semibold text-brand-700">
          ✨ {t("photoUploader.tipsTitle")}
        </p>
        <ul className="flex flex-col gap-1">
          {TIPS.map((key, i) => (
            <li key={key} className="flex gap-2 text-xs text-brand-600">
              <span className="mt-px shrink-0 font-bold">{i + 1}.</span>
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Thumbnails */}
      {photos.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {photos.map((url, i) => (
            <div key={i} className="relative h-20 w-20 overflow-hidden rounded-lg ring-1 ring-gray-200">
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-center text-[10px] font-medium text-white py-0.5">
                  Cover
                </span>
              )}
              <img
                src={resolveUrl(url)}
                alt={`Pet photo ${i + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label={t("photoUploader.remove")}
                className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-black/80"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button — hidden when at limit */}
      {atLimit ? (
        <p className="text-xs font-medium text-amber-600">
          ✓ {t("photoUploader.limitReached", { max: MAX_PHOTOS })}
        </p>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 transition hover:border-brand-400 hover:text-brand-600 disabled:opacity-50"
        >
          {uploading ? (
            <>
              <span className="animate-spin">⏳</span>
              {t("photoUploader.uploading")}
            </>
          ) : (
            <>
              <span>📷</span>
              {photos.length === 0
                ? t("photoUploader.addPhotos")
                : t("photoUploader.addMore", { remaining })}
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
