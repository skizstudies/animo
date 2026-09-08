import { FarmMapIcon } from "../../components/layout/icons";
import { FARMS } from "../../data/mockFarms";

export function GisOverviewPlaceholder() {
  const activeCount = FARMS.filter((f) => f.status === "active").length;
  const inactiveCount = FARMS.length - activeCount;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-[6px] border-2 border-dashed border-border bg-card px-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-[12px] bg-hover text-ink-soft">
        <FarmMapIcon className="h-7 w-7" />
      </div>
      <div>
        <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
          GIS map — placeholder
        </span>
        <h3 className="mt-1 text-[15px] font-extrabold text-ink">Farm status, municipality-wide</h3>
        <p className="mx-auto mt-1 max-w-[38ch] text-[12.5px] text-ink-soft">
          Integrating from the same GIS workstream feeding the cooperative dashboard.
        </p>
      </div>
      <div className="flex items-center gap-5">
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-ink-soft">
          <i className="inline-block h-1.5 w-1.5 rounded-full bg-success" /> {activeCount} active
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-ink-soft">
          <i className="inline-block h-1.5 w-1.5 rounded-full bg-dot-muted" /> {inactiveCount} inactive
        </span>
      </div>
    </div>
  );
}
