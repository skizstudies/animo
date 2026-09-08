import type { AffectedFarm, InsuranceCase, PipelineStage } from "../../types";
import { MapPinIcon } from "../layout/icons";

interface CasePipelineListProps {
  cases: InsuranceCase[];
  farms: AffectedFarm[];
  selectedCaseId: string | null;
  onSelectCase: (caseId: string) => void;
  onViewFarm: (farmId: string) => void;
}

const STAGE_ORDER: PipelineStage[] = ["messaged", "replied", "consent", "evidence", "sent"];

const STAGE_LABEL: Record<PipelineStage, string> = {
  messaged: "Awaiting reply",
  replied: "Awaiting consent",
  consent: "Consent given",
  evidence: "Gathering evidence",
  sent: "Sent to PCIC",
};

function StageProgress({ stage }: { stage: PipelineStage }) {
  const filled = STAGE_ORDER.indexOf(stage) + 1;
  return (
    <div className="flex gap-1">
      {STAGE_ORDER.map((s, i) => (
        <span
          key={s}
          className={`h-1.5 w-5 rounded-full ${i < filled ? "bg-success" : "bg-divider"}`}
        />
      ))}
    </div>
  );
}

export function CasePipelineList({ cases, farms, selectedCaseId, onSelectCase, onViewFarm }: CasePipelineListProps) {
  return (
    <div className="panel-corners flex flex-1 flex-col rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-3 shrink-0">
        <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
          Agent pipeline · live
        </span>
        <h3 className="mt-0.5 text-[15px] font-extrabold text-ink">
          {cases.filter((c) => c.stage === "sent").length} of {cases.length} sent to PCIC
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {cases.map((c) => {
          const farm = farms.find((f) => f.farmId === c.farmId);
          const active = c.id === selectedCaseId;
          return (
            <div
              key={c.id}
              className={`flex items-center gap-2 rounded-[6px] border pr-2 transition-colors ${
                active ? "border-success/35 bg-success/6" : "border-border bg-bg"
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectCase(c.id)}
                className="flex flex-1 items-center gap-3 px-3 py-2.5 text-left"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-bold text-ink">{c.farmerName}</div>
                  {farm && (
                    <div className="text-[11.5px] text-ink-soft">
                      {farm.crop} · {farm.areaHa.toFixed(1)} ha
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="font-mono text-[10.5px] font-bold text-ink-soft">{STAGE_LABEL[c.stage]}</span>
                  <StageProgress stage={c.stage} />
                </div>
              </button>
              <button
                type="button"
                title="View on Farm Map"
                onClick={() => onViewFarm(c.farmId)}
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
