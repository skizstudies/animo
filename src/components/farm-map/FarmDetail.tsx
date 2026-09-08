import type { AffectedFarm, Farm } from "../../types";

interface FarmDetailProps {
  farm: Farm | null;
  insuranceRecord?: AffectedFarm;
  inRecoveryReport?: boolean;
}

export function FarmDetail({ farm, insuranceRecord, inRecoveryReport }: FarmDetailProps) {
  if (!farm) {
    return (
      <div className="flex shrink-0 items-center justify-center rounded-[6px] border border-border bg-card px-5 py-5 text-[12.5px] text-ink-soft shadow-[var(--shadow-sm)]">
        Select a farm from the directory, or click through from Insurance.
      </div>
    );
  }

  return (
    <div className="panel-corners flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3 rounded-[6px] border border-border bg-card px-5 py-4 shadow-[var(--shadow-sm)]">
      <div className="min-w-[180px]">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-extrabold text-ink">{farm.farmerName}</span>
          <span
            className={`rounded-[20px] px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase ${
              farm.status === "active" ? "bg-success/12 text-text-success" : "bg-hover text-ink-soft"
            }`}
          >
            {farm.status}
          </span>
        </div>
        <p className="text-[12px] text-ink-soft">
          {farm.barangay} · {farm.crop} · {farm.areaHa.toFixed(1)} ha
        </p>
      </div>

      {insuranceRecord && (
        <span className="rounded-[20px] bg-warning/14 px-3 py-1.5 font-mono text-[11px] font-bold text-text-warn">
          Insurance: {insuranceRecord.estimatedLossPct}% est. loss
        </span>
      )}
      {inRecoveryReport && (
        <span className="rounded-[20px] bg-success/12 px-3 py-1.5 font-mono text-[11px] font-bold text-text-success">
          Recovery: included in the Road to Recovery report
        </span>
      )}
      {!insuranceRecord && !inRecoveryReport && (
        <span className="font-mono text-[11px] text-ink-soft">No open Insurance or Recovery activity.</span>
      )}
    </div>
  );
}
