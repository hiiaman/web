import { timeAgo } from "@shared/utils/format";
import type { MatchResponse } from "../types/matches.types";

interface Props {
  matches: MatchResponse[];
  selectedId: string | null;
  onSelect: (match: MatchResponse) => void;
}

export function MatchList({ matches, selectedId, onSelect }: Props) {
  return (
    <ul className="divide-y divide-gray-100">
      {matches.map((match) => (
        <li key={match.id}>
          <button
            onClick={() => onSelect(match)}
            className={[
              "flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-50",
              selectedId === match.id ? "bg-brand-50" : "",
            ].join(" ")}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-xl">
              🐾
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-gray-800">
                Match #{match.id.slice(0, 8)}
              </p>
              <p className="text-xs text-gray-400">{timeAgo(match.created_at)}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
