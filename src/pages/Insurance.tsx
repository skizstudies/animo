import { useState } from "react";
import { CasePipelineList } from "../components/insurance/CasePipelineList";
import { ConversationThread } from "../components/insurance/ConversationThread";
import { DocumentReviewPanel } from "../components/insurance/DocumentReviewPanel";
import { HazardBanner } from "../components/insurance/HazardBanner";
import { SatelliteCompare } from "../components/insurance/SatelliteCompare";
import { ACTIVE_HAZARD, AFFECTED_FARMS, INSURANCE_CASES } from "../data/mockInsurance";
import { getPolicy } from "../data/mockPolicies";
import type { StageLogEntry } from "../types";

const dateFmt = new Intl.DateTimeFormat("en-PH", { timeZone: "Asia/Manila", month: "short", day: "2-digit", year: "numeric" });
const timeFmt = new Intl.DateTimeFormat("en-PH", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit", hour12: true });

function makeReferenceNo() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `PCIC-${new Date().getFullYear()}-${n}`;
}

interface Approval {
  referenceNo: string;
  logEntry: StageLogEntry;
}

interface InsuranceProps {
  onViewFarm: (farmId: string) => void;
}

export function Insurance({ onViewFarm }: InsuranceProps) {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [reviewCaseId, setReviewCaseId] = useState<string | null>(null);
  const [approvals, setApprovals] = useState<Record<string, Approval>>({});

  const cases = INSURANCE_CASES.filter((c) => getPolicy(c.farmId)?.status === "active").map((c) => {
    const approval = approvals[c.id];
    if (!approval) return c;
    return { ...c, stage: "sent" as const, referenceNo: approval.referenceNo, log: [...c.log, approval.logEntry] };
  });

  const selectedCase = cases.find((c) => c.id === selectedCaseId) ?? null;
  const selectedPolicy = selectedCase ? getPolicy(selectedCase.farmId) : undefined;
  const reviewCase = cases.find((c) => c.id === reviewCaseId) ?? null;
  const reviewFarm = reviewCase ? AFFECTED_FARMS.find((f) => f.farmId === reviewCase.farmId) : undefined;
  const reviewPolicy = reviewCase ? getPolicy(reviewCase.farmId) : undefined;

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
    const now = new Date();
    setApprovals((prev) => ({
      ...prev,
      [caseId]: {
        referenceNo: makeReferenceNo(),
        logEntry: { stage: "sent", dateLabel: dateFmt.format(now), timeLabel: timeFmt.format(now) },
      },
    }));
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1">
      <HazardBanner hazard={ACTIVE_HAZARD} />

      <div className="flex flex-1 gap-4">
        {reviewCase && reviewFarm ? (
          <DocumentReviewPanel
            insuranceCase={reviewCase}
            farm={reviewFarm}
            hazard={ACTIVE_HAZARD}
            policy={reviewPolicy}
            onBack={closePanels}
            onApprove={handleApprove}
          />
        ) : selectedCase ? (
          <ConversationThread insuranceCase={selectedCase} policy={selectedPolicy} onBack={closePanels} />
        ) : (
          <SatelliteCompare />
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
    </div>
  );
}
