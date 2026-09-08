import type { BuyerGap } from "../../types";

interface GapContextBannerProps {
  gap: BuyerGap;
  onBack: () => void;
}

export function GapContextBanner({ gap, onBack }: GapContextBannerProps) {
  const gapQty = gap.orderedQtyT - gap.deliverableQtyT;

  return (
    <div className="panel-corners flex shrink-0 items-center gap-4 rounded-[6px] border border-border bg-card px-5 py-4 shadow-[var(--shadow-sm)]">
      <button
        type="button"
        onClick={onBack}
        className="shrink-0 rounded-[4px] border border-border px-3 py-2 font-mono text-[11px] font-bold text-ink-soft hover:bg-hover hover:text-ink"
      >
        ← Gaps
      </button>
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-extrabold text-ink">
          {gap.buyerName} · {gap.crop}
        </div>
        <p className="text-[12.5px] text-ink-soft">
          {gap.contractedFarmerName} can deliver {gap.deliverableQtyT.toFixed(1)}t of {gap.orderedQtyT.toFixed(1)}t
          ordered — short {gapQty.toFixed(1)}t
        </p>
      </div>
    </div>
  );
}
