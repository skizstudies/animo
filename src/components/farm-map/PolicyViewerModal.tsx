import { useEffect } from "react";
import type { Farm, InsurancePolicy } from "../../types";
import { CloseIcon } from "../layout/icons";

interface PolicyViewerModalProps {
  farm: Farm;
  policy: InsurancePolicy;
  onClose: () => void;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-divider py-2 text-[12.5px] last:border-b-0">
      <span className="font-mono text-[10.5px] text-ink-soft uppercase">{label}</span>
      <span className="font-bold text-ink">{value}</span>
    </div>
  );
}

export function PolicyViewerModal({ farm, policy, onClose }: PolicyViewerModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-6" onClick={onClose}>
      <div
        className="flex max-h-full w-full max-w-[520px] flex-col overflow-hidden rounded-[6px] border border-border bg-card shadow-[var(--shadow)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-divider bg-bg px-5 py-4">
          <div>
            <span className="font-mono text-[10px] font-bold tracking-[1px] text-ink-soft uppercase">
              Agent-generated document · Phase 1
            </span>
            <h3 className="mt-0.5 text-[14.5px] font-extrabold text-ink">Application for Crop Insurance</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] text-ink-soft hover:bg-hover hover:text-ink"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <p className="mb-3 text-[13px] leading-relaxed text-ink">
            Drafted and submitted by the agent the moment {farm.farmerName}'s parcel was mapped and this crop cycle
            was registered — months before any hazard event. PCIC underwrote and approved this policy while the
            crop was still in its vegetative state.
          </p>
          <div className="rounded-[6px] border border-divider bg-bg px-4">
            <Field label="Policy no." value={policy.policyNo ?? "—"} />
            <Field label="Claimant" value={farm.farmerName} />
            <Field label="Farm location" value={`Brgy. ${farm.barangay}`} />
            <Field label="Crop insured" value={policy.crop ?? farm.crop} />
            <Field label="Area insured" value={`${farm.areaHa.toFixed(1)} ha`} />
            <Field label="Planting date" value={policy.plantingDateLabel ?? "—"} />
            <Field label="Baseline Sentinel-2 pass" value={policy.baselineImageDateLabel ?? "—"} />
            <Field label="Registered" value={policy.registeredDateLabel ?? "—"} />
            <Field label="Prepared by" value="ANIMO agent" />
          </div>
          <p className="mt-3 text-[11.5px] text-ink-soft">
            The baseline satellite pass above serves as proof of planting, submitted alongside this application.
          </p>
        </div>
      </div>
    </div>
  );
}
