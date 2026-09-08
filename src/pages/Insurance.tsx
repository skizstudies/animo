import { useState } from "react";
import { CasePipelineList } from "../components/insurance/CasePipelineList";
import { ConversationThread } from "../components/insurance/ConversationThread";
import { HazardBanner } from "../components/insurance/HazardBanner";
import { SatelliteCompare } from "../components/insurance/SatelliteCompare";
import { ACTIVE_HAZARD, AFFECTED_FARMS, INSURANCE_CASES } from "../data/mockInsurance";
import type { PipelineStage } from "../types";

const STAGE_SUMMARY_LABEL: Record<PipelineStage, string> = {
  messaged: "awaiting reply",
  replied: "awaiting consent",
  consent: "consent given",
  evidence: "gathering evidence",
  sent: "sent to PCIC",
};

interface InsuranceProps {
  onViewFarm: (farmId: string) => void;
}

export function Insurance({ onViewFarm }: InsuranceProps) {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const selectedCase = INSURANCE_CASES.find((c) => c.id === selectedCaseId) ?? null;

  const summary = (Object.keys(STAGE_SUMMARY_LABEL) as PipelineStage[])
    .map((stage) => ({ stage, count: INSURANCE_CASES.filter((c) => c.stage === stage).length }))
    .filter((s) => s.count > 0);

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1">
      <HazardBanner hazard={ACTIVE_HAZARD} />

      <div className="flex flex-1 gap-4">
        {selectedCase ? (
          <ConversationThread insuranceCase={selectedCase} onBack={() => setSelectedCaseId(null)} />
        ) : (
          <SatelliteCompare hazard={ACTIVE_HAZARD} />
        )}
        <CasePipelineList
          cases={INSURANCE_CASES}
          farms={AFFECTED_FARMS}
          selectedCaseId={selectedCaseId}
          onSelectCase={setSelectedCaseId}
          onViewFarm={onViewFarm}
        />
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1.5 rounded-[6px] border border-border bg-card px-5 py-3.5 shadow-[var(--shadow-sm)]">
        <span className="text-[12.5px] text-ink-soft">No officer action needed —</span>
        {summary.map(({ stage, count }) => (
          <span key={stage} className="font-mono text-[11.5px] font-bold text-ink">
            {count} {STAGE_SUMMARY_LABEL[stage]}
          </span>
        ))}
      </div>
    </div>
  );
}
