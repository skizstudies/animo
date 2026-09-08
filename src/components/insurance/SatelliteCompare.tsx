import { useState } from "react";
import type { HazardEvent } from "../../types";

type Frame = "before" | "after";

// 8x6 grid, row-major. Marks which parcels show crop-health loss in the
// post-event pass — a fixed diagonal swath so the "before" vs "after" toggle
// reads as a believable damage pattern rather than noise.
const DAMAGE_PATTERN = [
  false, false, true, true, true, false, false, false,
  false, true, true, true, true, true, false, false,
  true, true, true, true, true, true, true, false,
  false, true, true, true, true, true, true, true,
  false, false, true, true, true, true, true, false,
  false, false, false, true, true, true, false, false,
];

interface SatelliteCompareProps {
  hazard: HazardEvent;
}

export function SatelliteCompare({ hazard }: SatelliteCompareProps) {
  const [frame, setFrame] = useState<Frame>("after");

  return (
    <div className="panel-corners flex flex-1 flex-col rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-4 flex shrink-0 items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
            Sentinel-2 evidence
          </span>
          <h3 className="mt-0.5 text-[15px] font-extrabold text-ink">{hazard.clusterId} crop-health change</h3>
        </div>
        <div className="flex shrink-0 rounded-[4px] border border-border bg-bg p-0.5">
          {(["before", "after"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFrame(f)}
              className={`rounded-[3px] px-3 py-1.5 text-[11.5px] font-bold capitalize transition-colors ${
                frame === f ? "bg-sidebar text-white" : "text-ink-soft hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid flex-1 grid-cols-8 gap-1 rounded-[4px] bg-bg p-2">
        {DAMAGE_PATTERN.map((isDamaged, i) => {
          const showDamage = frame === "after" && isDamaged;
          return (
            <div
              key={i}
              className={`rounded-[2px] transition-colors duration-300 ${
                showDamage ? "bg-warning/70" : "bg-success/55"
              }`}
            />
          );
        })}
      </div>

      <div className="mt-4 flex shrink-0 items-center justify-between gap-3">
        <span className="font-mono text-[10.5px] text-ink-soft">
          Pass: {frame === "before" ? hazard.preImageDate : hazard.postImageDate}
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-ink-soft">
            <i className="inline-block h-1.5 w-1.5 rounded-full bg-success/55" /> Healthy
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-ink-soft">
            <i className="inline-block h-1.5 w-1.5 rounded-full bg-warning/70" /> Loss detected
          </span>
        </div>
      </div>
    </div>
  );
}
