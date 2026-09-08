import { useState } from "react";
import { FARMS } from "../../data/mockFarms";
import type { AffectedFarm, HazardEvent, InsuranceCase } from "../../types";
import { CheckCircleIcon, DocumentIcon, SendIcon } from "../layout/icons";
import { ProcessingLog } from "./ProcessingLog";

interface DocumentReviewPanelProps {
  insuranceCase: InsuranceCase;
  farm: AffectedFarm;
  hazard: HazardEvent;
  onBack: () => void;
  onApprove: (caseId: string) => void;
}

const GENERATED_DOCS = [
  "PCIC Notice of Loss — auto-filled from farm records",
  "Damage Assessment Summary — Sentinel-2 change detection",
  "Photo & Satellite Evidence Package",
];

export function DocumentReviewPanel({ insuranceCase, farm, hazard, onBack, onApprove }: DocumentReviewPanelProps) {
  const [verified, setVerified] = useState(false);
  const barangay = FARMS.find((f) => f.id === farm.farmId)?.barangay;
  const sent = insuranceCase.stage === "sent";
  const sentLog = insuranceCase.log.find((l) => l.stage === "sent");

  const narrative = `${insuranceCase.farmerName}'s ${farm.crop.toLowerCase()} farm (${farm.areaHa.toFixed(1)} ha${barangay ? `, Brgy. ${barangay}` : ""}) shows an estimated ${farm.estimatedLossPct}% loss from ${hazard.name}, confirmed via Sentinel-2 passes on ${hazard.preImageDate} and ${hazard.postImageDate}.`;

  return (
    <div className="panel-corners flex flex-1 flex-col rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-4 flex shrink-0 items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
            {sent ? "Submitted to PCIC" : "Compiled by agent · ready for review"}
          </span>
          <h3 className="mt-0.5 text-[15px] font-extrabold text-ink">{insuranceCase.farmerName}</h3>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 rounded-[4px] border border-border px-3 py-2 font-mono text-[11px] font-bold text-ink-soft hover:bg-hover hover:text-ink"
        >
          ← Back
        </button>
      </div>

      <p className="mb-4 shrink-0 text-[13px] leading-relaxed text-ink-soft">{narrative}</p>

      <div className="mb-4 shrink-0 rounded-[6px] border border-divider bg-bg px-4 py-3">
        <span className="font-mono text-[10px] font-bold tracking-[1px] text-ink-soft uppercase">
          Documents generated
        </span>
        <ul className="mt-2 flex flex-col gap-2">
          {GENERATED_DOCS.map((doc) => (
            <li key={doc} className="flex items-center gap-2.5 text-[12.5px] text-ink">
              <DocumentIcon className="h-4 w-4 shrink-0 text-ink-soft" />
              {doc}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4 shrink-0">
        <ProcessingLog log={insuranceCase.log} />
      </div>

      <div className="mt-auto shrink-0">
        {sent ? (
          <div className="flex items-center gap-3 rounded-[6px] border border-success/30 bg-success/8 px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success text-white">
              <CheckCircleIcon className="h-4 w-4" />
            </span>
            <div>
              <div className="text-[13px] font-extrabold text-ink">Approved &amp; submitted</div>
              <div className="font-mono text-[11px] text-ink-soft">
                Ref. {insuranceCase.referenceNo}
                {sentLog && ` · ${sentLog.dateLabel} · ${sentLog.timeLabel}`}
              </div>
            </div>
          </div>
        ) : (
          <>
            <label className="mb-3 flex cursor-pointer items-start gap-2.5 text-[12.5px] text-ink">
              <input
                type="checkbox"
                checked={verified}
                onChange={(e) => setVerified(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-success"
              />
              {insuranceCase.farmerName} has come in and verified these documents in person
            </label>
            <button
              type="button"
              disabled={!verified}
              onClick={() => onApprove(insuranceCase.id)}
              className="flex items-center gap-2 rounded-[4px] bg-sidebar px-4 py-2.5 text-[12.5px] font-bold text-white transition-opacity hover:bg-sidebar-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              <SendIcon className="h-3.5 w-3.5" />
              Approve &amp; send to PCIC
            </button>
          </>
        )}
      </div>
    </div>
  );
}
