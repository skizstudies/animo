import type { Farm, InsurancePolicy } from "../../types";
import { ShieldIcon } from "../layout/icons";

interface FarmDirectoryProps {
  farms: Farm[];
  policies: InsurancePolicy[];
  selectedId: string | null;
  onSelect: (farmId: string) => void;
}

export function FarmDirectory({ farms, policies, selectedId, onSelect }: FarmDirectoryProps) {
  return (
    <div className="panel-corners flex min-h-0 flex-1 flex-col rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-3 shrink-0">
        <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
          Farm directory
        </span>
        <h3 className="mt-0.5 text-[15px] font-extrabold text-ink">{farms.length} parcels mapped</h3>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto pr-1">
        {farms.map((farm) => {
          const active = farm.id === selectedId;
          const insured = policies.find((p) => p.farmId === farm.id)?.status === "active";
          return (
            <button
              key={farm.id}
              type="button"
              onClick={() => onSelect(farm.id)}
              className={`flex items-center gap-3 rounded-[6px] border px-3 py-2.5 text-left transition-colors ${
                active ? "border-success/35 bg-success/8" : "border-transparent hover:bg-hover"
              }`}
            >
              <i className={`h-2 w-2 shrink-0 rounded-full ${farm.status === "active" ? "bg-success" : "bg-dot-muted"}`} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12.5px] font-bold text-ink">{farm.farmerName}</div>
                <div className="text-[11px] text-ink-soft">
                  {farm.barangay} · {farm.crop} · {farm.areaHa.toFixed(1)} ha
                </div>
              </div>
              <span
                title={insured ? "Insured" : "Not insured"}
                className={`shrink-0 ${insured ? "text-text-success" : "text-dot-muted"}`}
              >
                <ShieldIcon className="h-3.5 w-3.5" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
