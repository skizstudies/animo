import { AlertTriangleIcon } from "../layout/icons";
import type { HazardEvent } from "../../types";

interface HazardBannerProps {
  hazard: HazardEvent;
}

export function HazardBanner({ hazard }: HazardBannerProps) {
  return (
    <div className="panel-corners flex shrink-0 items-center gap-4 rounded-[6px] border border-warning/30 bg-warning/10 px-5 py-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-warning/20 text-text-warn">
        <AlertTriangleIcon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-[14px] font-extrabold text-ink">{hazard.name}</span>
          <span className="font-mono text-[10.5px] font-bold tracking-wide text-text-warn uppercase">
            Signal No. {hazard.signal}
          </span>
        </div>
        <p className="text-[12.5px] text-ink-soft">
          {hazard.clusterName} · flagged {new Date(hazard.dateISO).toLocaleDateString("en-PH", { day: "2-digit", month: "short", year: "numeric" })}
        </p>
      </div>
      <a
        href={`https://${hazard.source}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden shrink-0 font-mono text-[10.5px] font-bold text-ink-soft hover:text-ink sm:block"
      >
        Source: {hazard.source}
      </a>
    </div>
  );
}
