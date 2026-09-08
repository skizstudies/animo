import { AlertTriangleIcon } from "../../components/layout/icons";
import { FARMS } from "../../data/mockFarms";
import { ACTIVE_HAZARD, AFFECTED_FARMS } from "../../data/mockInsurance";

function severityOf(pct: number) {
  if (pct >= 60) return { label: "Critical — priority relief", cls: "bg-danger/12 text-text-danger" };
  if (pct >= 30) return { label: "Moderate — monitor", cls: "bg-warning/16 text-text-warn" };
  return { label: "Minor — noted", cls: "bg-success/12 text-text-success" };
}

export function AssistanceList() {
  const rows = [...AFFECTED_FARMS]
    .sort((a, b) => b.estimatedLossPct - a.estimatedLossPct)
    .map((farm) => ({ farm, barangay: FARMS.find((f) => f.id === farm.farmId)?.barangay ?? "—" }));

  const totalArea = AFFECTED_FARMS.reduce((sum, f) => sum + f.areaHa, 0);
  const criticalCount = AFFECTED_FARMS.filter((f) => f.estimatedLossPct >= 60).length;

  return (
    <div className="panel-corners flex flex-1 flex-col rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-3 flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
            Recontextualized from PCIC submissions
          </span>
          <h3 className="mt-0.5 text-[15px] font-extrabold text-ink">Farms needing post-disaster assistance</h3>
        </div>
        <div className="flex items-center gap-2 rounded-[20px] bg-warning/10 px-3 py-1.5">
          <AlertTriangleIcon className="h-3.5 w-3.5 text-text-warn" />
          <span className="font-mono text-[11px] font-bold text-text-warn">
            {ACTIVE_HAZARD.name} · {rows.length} farms · {totalArea.toFixed(1)} ha · {criticalCount} critical
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {rows.map(({ farm, barangay }) => {
          const severity = severityOf(farm.estimatedLossPct);
          return (
            <div
              key={farm.id}
              className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-[6px] border border-border bg-bg px-4 py-3"
            >
              <div className="min-w-[160px] flex-1">
                <div className="text-[13px] font-bold text-ink">{farm.farmerName}</div>
                <div className="text-[11.5px] text-ink-soft">
                  Brgy. {barangay} · {farm.crop} · {farm.areaHa.toFixed(1)} ha
                </div>
              </div>
              <span className="font-mono text-[11px] font-bold text-ink-soft">{farm.estimatedLossPct}% loss</span>
              <span className={`rounded-[20px] px-2.5 py-1 font-mono text-[10.5px] font-bold whitespace-nowrap ${severity.cls}`}>
                {severity.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
