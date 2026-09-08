import { useState } from "react";
import { CasePipelineList } from "../components/insurance/CasePipelineList";
import { ConversationThread } from "../components/insurance/ConversationThread";
import { DocumentReviewPanel } from "../components/insurance/DocumentReviewPanel";
import { HazardBanner } from "../components/insurance/HazardBanner";
import { SatelliteCompare } from "../components/insurance/SatelliteCompare";
import { ACTIVE_HAZARD, AFFECTED_FARMS, INSURANCE_CASES } from "../data/mockInsurance";
import type { PipelineStage } from "../types";

const STAGE_SUMMARY_LABEL: Record<PipelineStage, string> = {
  messaged: "awaiting reply",
  replied: "awaiting consent",
  consent: "gathering evidence",
  compiled: "ready for review",
  sent: "sent to PCIC",
};

function makeReferenceNo() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `PCIC-${new Date().getFullYear()}-${n}`;
}

interface InsuranceProps {
  onViewFarm: (farmId: string) => void;
}

export function Insurance({ onViewFarm }: InsuranceProps) {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [reviewCaseId, setReviewCaseId] = useState<string | null>(null);
  const [approvals, setApprovals] = useState<Record<string, string>>({});

  const cases = INSURANCE_CASES.map((c) =>
    approvals[c.id] ? { ...c, stage: "sent" as const, referenceNo: approvals[c.id] } : c,
  );

  const selectedCase = cases.find((c) => c.id === selectedCaseId) ?? null;
  const reviewCase = cases.find((c) => c.id === reviewCaseId) ?? null;
  const reviewFarm = reviewCase ? AFFECTED_FARMS.find((f) => f.farmId === reviewCase.farmId) : undefined;

  function openConversation(id: string) {
    setReviewCaseId(null);
    setSelectedCaseId(id);
  }

  function openReview(id: string) {
    setSelectedCaseId(null);
    setReviewCaseId(id);
  }

  function closePanels() {
    setSelectedCaseId(null);
    setReviewCaseId(null);
  }

  function handleApprove(caseId: string) {
    setApprovals((prev) => ({ ...prev, [caseId]: makeReferenceNo() }));
  }

  const pendingReview = cases.filter((c) => c.stage === "compiled").length;
  const summary = (Object.keys(STAGE_SUMMARY_LABEL) as PipelineStage[])
    .map((stage) => ({ stage, count: cases.filter((c) => c.stage === stage).length }))
    .filter((s) => s.count > 0);

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1">
      <HazardBanner hazard={ACTIVE_HAZARD} />

      <div className="flex flex-1 gap-4">
        {reviewCase && reviewFarm ? (
          <DocumentReviewPanel
            insuranceCase={reviewCase}
            farm={reviewFarm}
            hazard={ACTIVE_HAZARD}
            onBack={closePanels}
            onApprove={handleApprove}
          />
        ) : selectedCase ? (
          <ConversationThread insuranceCase={selectedCase} onBack={closePanels} />
        ) : (
          <SatelliteCompare hazard={ACTIVE_HAZARD} />
        )}
        <CasePipelineList
          cases={cases}
          farms={AFFECTED_FARMS}
          selectedCaseId={selectedCaseId}
          onSelectCase={openConversation}
          onReviewCase={openReview}
          onViewFarm={onViewFarm}
        />
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1.5 rounded-[6px] border border-border bg-card px-5 py-3.5 shadow-[var(--shadow-sm)]">
        <span className="text-[12.5px] text-ink-soft">
          {pendingReview > 0 ? `${pendingReview} ready for your review —` : "No officer action needed —"}
        </span>
        {summary.map(({ stage, count }) => (
          <span key={stage} className="font-mono text-[11.5px] font-bold text-ink">
            {count} {STAGE_SUMMARY_LABEL[stage]}
          </span>
        ))}
      </div>
    </div>
  );
}
