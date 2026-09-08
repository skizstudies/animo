import type { AffectedFarm } from "../../types";
import { CheckCircleIcon, MapPinIcon } from "../layout/icons";

interface AffectedFarmListProps {
  farms: AffectedFarm[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onViewFarm: (farmId: string) => void;
  locked: boolean;
}

function lossPillClass(pct: number) {
  if (pct >= 60) return "bg-danger/12 text-text-danger";
  if (pct >= 30) return "bg-warning/16 text-text-warn";
  return "bg-success/12 text-text-success";
}

export function AffectedFarmList({ farms, selectedIds, onToggle, onToggleAll, onViewFarm, locked }: AffectedFarmListProps) {
  const allSelected = selectedIds.size === farms.length;

  return (
    <div className="panel-corners flex flex-1 flex-col rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
            Affected farms
          </span>
          <h3 className="mt-0.5 text-[15px] font-extrabold text-ink">
            {selectedIds.size} of {farms.length} selected
          </h3>
        </div>
        {!locked && (
          <button
            type="button"
            onClick={onToggleAll}
            className="font-mono text-[10.5px] font-bold text-ink-soft underline decoration-dotted underline-offset-2 hover:text-ink"
          >
            {allSelected ? "Clear all" : "Select all"}
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {farms.map((farm) => {
          const checked = selectedIds.has(farm.id);
          return (
            <div
              key={farm.id}
              className={`flex items-center gap-2 rounded-[6px] border pr-2 transition-colors ${
                checked ? "border-success/30 bg-success/6" : "border-border bg-bg"
              }`}
            >
              <button
                type="button"
                disabled={locked}
                onClick={() => onToggle(farm.id)}
                className={`flex flex-1 items-center gap-3 px-3 py-2.5 text-left ${locked ? "cursor-default" : ""}`}
              >
                <span
                  className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-2 ${
                    checked ? "border-success bg-success text-white" : "border-border text-transparent"
                  }`}
                >
                  <CheckCircleIcon className="h-3 w-3" strokeWidth={3} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-bold text-ink">{farm.farmerName}</div>
                  <div className="text-[11.5px] text-ink-soft">
                    {farm.crop} · {farm.areaHa.toFixed(1)} ha
                  </div>
                </div>
                <span className={`shrink-0 rounded-[20px] px-2.5 py-1 font-mono text-[11px] font-bold ${lossPillClass(farm.estimatedLossPct)}`}>
                  {farm.estimatedLossPct}% loss
                </span>
              </button>
              <button
                type="button"
                title="View on Farm Map"
                onClick={() => onViewFarm(farm.farmId)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] text-ink-soft hover:bg-hover hover:text-ink"
              >
                <MapPinIcon className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
