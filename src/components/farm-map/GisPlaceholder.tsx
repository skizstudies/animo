import type { Farm } from "../../types";
import { FarmMapIcon } from "../layout/icons";

interface GisPlaceholderProps {
  selectedFarm: Farm | null;
}

export function GisPlaceholder({ selectedFarm }: GisPlaceholderProps) {
  return (
    <div className="flex flex-[1.3] flex-col items-center justify-center gap-4 rounded-[6px] border-2 border-dashed border-border bg-card px-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-[12px] bg-hover text-ink-soft">
        <FarmMapIcon className="h-7 w-7" />
      </div>
      <div>
        <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
          GIS map — placeholder
        </span>
        <h3 className="mt-1 text-[15px] font-extrabold text-ink">Integrating from the GIS workstream</h3>
        <p className="mx-auto mt-1 max-w-[36ch] text-[12.5px] text-ink-soft">
          {selectedFarm
            ? `Would center on ${selectedFarm.barangay} — ${selectedFarm.farmerName}'s parcel.`
            : "Select a farm to see what the map would center on."}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-ink-soft">
          <i className="inline-block h-1.5 w-1.5 rounded-full bg-success" /> Active
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-ink-soft">
          <i className="inline-block h-1.5 w-1.5 rounded-full bg-dot-muted" /> Inactive
        </span>
      </div>
    </div>
  );
}
