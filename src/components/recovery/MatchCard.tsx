import type { ScoredMatch } from "../../types";
import { CheckCircleIcon, MapPinIcon } from "../layout/icons";

interface MatchCardProps {
  rank: number;
  match: ScoredMatch;
  approved: boolean;
  disabled: boolean;
  onApprove: () => void;
  onViewFarm: () => void;
}

function scoreClass(score: number) {
  if (score >= 80) return "bg-success/14 text-text-success";
  if (score >= 60) return "bg-warning/16 text-text-warn";
  return "bg-hover text-ink-soft";
}

export function MatchCard({ rank, match, approved, disabled, onApprove, onViewFarm }: MatchCardProps) {
  return (
    <div
      className={`rounded-[6px] border px-4 py-3.5 transition-colors ${
        approved ? "border-success/35 bg-success/6" : "border-border bg-bg"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold ${
              rank === 1 ? "bg-sidebar text-white" : "bg-hover text-ink-soft"
            }`}
          >
            {rank}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[13.5px] font-bold text-ink">{match.farmer.farmerName}</span>
              {rank === 1 && !approved && (
                <span className="rounded-[20px] bg-success/12 px-2 py-0.5 font-mono text-[9.5px] font-bold text-text-success uppercase">
                  Recommended
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className={`rounded-[20px] px-2.5 py-1 font-mono text-[11.5px] font-bold ${scoreClass(match.score)}`}>
            {match.score}
          </span>
          <button
            type="button"
            title="View on Farm Map"
            onClick={onViewFarm}
            className="flex h-7 w-7 items-center justify-center rounded-[6px] text-ink-soft hover:bg-hover hover:text-ink"
          >
            <MapPinIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {match.reasons.map((reason) => (
          <span key={reason} className="rounded-[20px] bg-hover px-2.5 py-1 font-mono text-[10.5px] text-ink-soft">
            {reason}
          </span>
        ))}
      </div>

      <div className="mt-3 flex justify-end">
        {approved ? (
          <span className="flex items-center gap-1.5 rounded-[4px] bg-success px-3.5 py-2 text-[11.5px] font-bold text-white">
            <CheckCircleIcon className="h-3.5 w-3.5" />
            Approved
          </span>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={onApprove}
            className="rounded-[4px] border border-border px-3.5 py-2 text-[11.5px] font-bold text-ink transition-colors hover:border-success/40 hover:bg-success/6 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Approve match
          </button>
        )}
      </div>
    </div>
  );
}
