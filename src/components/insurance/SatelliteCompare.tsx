import { useState } from "react";
import { FARMS } from "../../data/mockFarms";
import { AFFECTED_FARMS } from "../../data/mockInsurance";

type Frame = "before" | "after";

interface SatelliteCompareProps {
  // Which farm's plot to show — defaults to the flagship pilot farm when no
  // case has been viewed yet (the page's initial landing state). Once the
  // user opens a farmer's conversation and comes back via "Satellite
  // evidence", this follows them to that farmer's own plot instead of
  // silently falling back to farm-1 for everyone.
  farmId?: string;
}

// Display vs. analysis are two different data sources, kept deliberately
// separate — see CLAUDE.md's Sentinel Hub / ESRI split:
//   - beforeImage/afterImage: ESRI World Imagery, real per-frame captures of
//     the pilot plot — sharp, human-facing visuals.
//   - ndviBefore/ndviAfter: real Sentinel Hub NDVI + capture dates, still the
//     analytical source of truth. Not rendered as a photo (10m/px looks soft
//     at plot scale) — only its numbers are shown here.
export function SatelliteCompare({ farmId = "farm-1" }: SatelliteCompareProps) {
  const [frame, setFrame] = useState<Frame>("after");
  const farm = AFFECTED_FARMS.find((f) => f.farmId === farmId) ?? AFFECTED_FARMS.find((f) => f.farmId === "farm-1")!;
  const evidence = farm.evidence!;
  const image = frame === "before" ? evidence.beforeImage : evidence.afterImage;
  const dateLabel = frame === "before" ? evidence.beforeDateLabel : evidence.afterDateLabel;
  const ndvi = frame === "before" ? evidence.ndviBefore : evidence.ndviAfter;
  const barangay = FARMS.find((f) => f.id === farm.farmId)?.barangay;
  const plotLabel = barangay ? `${barangay} — ${farm.farmerName}'s plot` : `${farm.farmerName}'s plot`;

  return (
    <div className="panel-corners flex flex-1 flex-col rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-4 flex shrink-0 items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[11.5px] font-bold tracking-[1.2px] text-ink-soft uppercase">
            ESRI World Imagery · real plot
          </span>
          <h3 className="mt-0.5 text-[17px] font-extrabold text-ink">{plotLabel}</h3>
        </div>
        <div className="flex shrink-0 rounded-[4px] border border-border bg-bg p-0.5">
          {(["before", "after"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFrame(f)}
              className={`rounded-[3px] px-3 py-1.5 text-[13px] font-bold capitalize transition-colors ${
                frame === f ? "bg-sidebar text-white" : "text-ink-soft hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-[4px] bg-bg">
        <img
          key={frame}
          src={image}
          alt={`ESRI World Imagery over ${plotLabel} (${frame})`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-4 flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="font-mono text-[12px] text-ink-soft">
          Sentinel-2 NDVI ({frame}): {dateLabel} · {ndvi.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
