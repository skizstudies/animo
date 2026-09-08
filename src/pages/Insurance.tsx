import { useMemo, useState } from "react";
import { AffectedFarmList } from "../components/insurance/AffectedFarmList";
import { HazardBanner } from "../components/insurance/HazardBanner";
import { ReportPreview } from "../components/insurance/ReportPreview";
import { SatelliteCompare } from "../components/insurance/SatelliteCompare";
import { AFFECTED_FARMS, ACTIVE_HAZARD } from "../data/mockInsurance";

type Step = "gather" | "review";

function makeReferenceNo() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `PCIC-${new Date().getFullYear()}-${n}`;
}

interface InsuranceProps {
  onViewFarm: (farmId: string) => void;
}

export function Insurance({ onViewFarm }: InsuranceProps) {
  const [step, setStep] = useState<Step>("gather");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(AFFECTED_FARMS.map((f) => f.id)));
  const [submitted, setSubmitted] = useState(false);
  const [generatedAt, setGeneratedAt] = useState<Date>(() => new Date());
  const referenceNo = useMemo(makeReferenceNo, []);

  const selectedFarms = AFFECTED_FARMS.filter((f) => selectedIds.has(f.id));

  function toggleFarm(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelectedIds((prev) => (prev.size === AFFECTED_FARMS.length ? new Set() : new Set(AFFECTED_FARMS.map((f) => f.id))));
  }

  function handleGenerate() {
    setGeneratedAt(new Date());
    setStep("review");
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1">
      <HazardBanner hazard={ACTIVE_HAZARD} />

      {step === "gather" ? (
        <>
          <div className="flex flex-1 gap-4">
            <SatelliteCompare hazard={ACTIVE_HAZARD} />
            <AffectedFarmList
              farms={AFFECTED_FARMS}
              selectedIds={selectedIds}
              onToggle={toggleFarm}
              onToggleAll={toggleAll}
              onViewFarm={onViewFarm}
              locked={false}
            />
          </div>
          <div className="flex shrink-0 items-center justify-between rounded-[6px] border border-border bg-card px-5 py-3.5 shadow-[var(--shadow-sm)]">
            <span className="text-[12.5px] text-ink-soft">
              {selectedIds.size === 0
                ? "Select at least one farm to draft a report."
                : `${selectedIds.size} farm${selectedIds.size === 1 ? "" : "s"} will be included in the drafted report.`}
            </span>
            <button
              type="button"
              disabled={selectedIds.size === 0}
              onClick={handleGenerate}
              className="rounded-[4px] bg-sidebar px-5 py-2.5 text-[12.5px] font-bold text-white transition-opacity hover:bg-sidebar-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Generate PCIC report
            </button>
          </div>
        </>
      ) : (
        <ReportPreview
          hazard={ACTIVE_HAZARD}
          farms={selectedFarms}
          generatedAt={generatedAt}
          submitted={submitted}
          referenceNo={referenceNo}
          onBack={() => setStep("gather")}
          onSubmit={() => setSubmitted(true)}
        />
      )}
    </div>
  );
}
