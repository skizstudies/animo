import type { BuyerGap } from "../../types";
import { ChevronRightIcon, CheckCircleIcon } from "../layout/icons";

interface GapListProps {
  gaps: BuyerGap[];
  approvals: Record<string, string>;
  onSelect: (gapId: string) => void;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function GapList({ gaps, approvals, onSelect }: GapListProps) {
  return (
    <div className="panel-corners flex flex-1 flex-col gap-2.5 rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-1 shrink-0">
        <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
          Flagged demand gaps
        </span>
        <h3 className="mt-0.5 text-[15px] font-extrabold text-ink">
          {gaps.length} buyer{gaps.length === 1 ? "" : "s"} short on supply
        </h3>
      </div>

      {gaps.map((gap) => {
        const gapQty = gap.orderedQtyT - gap.deliverableQtyT;
        const resolved = Boolean(approvals[gap.id]);
        return (
          <button
            key={gap.id}
            type="button"
            onClick={() => onSelect(gap.id)}
            className="flex items-center gap-3.5 rounded-[6px] border border-border bg-bg px-4 py-3.5 text-left transition-colors hover:border-success/40"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-sidebar/12 text-[13px] font-extrabold text-sidebar-deep">
              {initials(gap.buyerName)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-[13.5px] font-bold text-ink">{gap.buyerName}</span>
                {gap.urgency === "high" && !resolved && (
                  <span className="shrink-0 rounded-[20px] bg-danger/12 px-2 py-0.5 font-mono text-[10px] font-bold text-text-danger uppercase">
                    Urgent
                  </span>
                )}
                {resolved && (
                  <span className="flex shrink-0 items-center gap-1 rounded-[20px] bg-success/12 px-2 py-0.5 font-mono text-[10px] font-bold text-text-success uppercase">
                    <CheckCircleIcon className="h-2.5 w-2.5" strokeWidth={3} />
                    Connected
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-[12px] text-ink-soft">
                {gap.crop} · short {gapQty.toFixed(1)}t of {gap.orderedQtyT.toFixed(1)}t · flagged {gap.flaggedAgo}
              </p>
            </div>
            <ChevronRightIcon className="h-4 w-4 shrink-0 text-ink-soft" />
          </button>
        );
      })}
    </div>
  );
}
