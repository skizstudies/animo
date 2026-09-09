import { useState } from "react";

type Frame = "before" | "after";

// Display vs. analysis are two different data sources, kept deliberately
// separate — see CLAUDE.md's Sentinel Hub / ESRI split:
//   - esriBasemapTile: ESRI World Imagery, real per-frame captures of the
//     pilot plot — sharp, human-facing visuals.
//   - sentinelNdviReading: real Sentinel Hub NDVI + capture dates, still the
//     analytical source of truth. Not rendered as a photo (10m/px looks soft
//     at plot scale) — only its numbers are shown here.
const esriBasemapTile: Record<Frame, string> = {
  before: "/insurance/plot1-before.png",
  after: "/insurance/plot1-after.png",
};

const sentinelNdviReading: Record<Frame, { dateLabel: string; ndviMean: number }> = {
  before: { dateLabel: "01 Apr 2026", ndviMean: 0.563 },
  after: { dateLabel: "22 Aug 2026", ndviMean: 0.676 },
};

export function SatelliteCompare() {
  const [frame, setFrame] = useState<Frame>("after");
  const reading = sentinelNdviReading[frame];

  return (
    <div className="panel-corners flex flex-1 flex-col rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-4 flex shrink-0 items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[11.5px] font-bold tracking-[1.2px] text-ink-soft uppercase">
            ESRI World Imagery · real pilot plot
          </span>
          <h3 className="mt-0.5 text-[17px] font-extrabold text-ink">Namunga, Rosario — plot 1</h3>
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
          src={esriBasemapTile[frame]}
          alt={`ESRI World Imagery over Namunga, Rosario, plot 1 (${frame})`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-4 flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="font-mono text-[12px] text-ink-soft">
          Sentinel-2 NDVI ({frame}): {reading.dateLabel} · {reading.ndviMean.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
