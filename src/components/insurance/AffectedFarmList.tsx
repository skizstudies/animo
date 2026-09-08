import type { AffectedFarm } from "../../types";
import { CheckCircleIcon } from "../layout/icons";

interface AffectedFarmListProps {
  farms: AffectedFarm[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  locked: boolean;
}

function lossPillClass(pct: number) {
  if (pct >= 60) return "bg-danger/12 text-text-danger";
  if (pct >= 30) return "bg-warning/16 text-text-warn";
  return "bg-success/12 text-text-success";
}

export function AffectedFarmList({ farms, selectedIds, onToggle, onToggleAll, locked }: AffectedFarmListProps) {
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
            <button
              key={farm.id}
              type="button"
              disabled={locked}
              onClick={() => onToggle(farm.id)}
              className={`flex items-center gap-3 rounded-[6px] border px-3 py-2.5 text-left transition-colors ${
                checked ? "border-success/30 bg-success/6" : "border-border bg-bg"
              } ${locked ? "cursor-default" : "hover:border-success/40"}`}
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
          );
        })}
      </div>
    </div>
  );
}
