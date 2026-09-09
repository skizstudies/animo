import { useEffect } from "react";
import type { AffectedFarm, HazardEvent, InsuranceCase } from "../../types";
import { CloseIcon } from "../layout/icons";

export type GeneratedDocId = "notice" | "summary" | "evidence";

interface DocumentViewerModalProps {
  docId: GeneratedDocId;
  insuranceCase: InsuranceCase;
  farm: AffectedFarm;
  hazard: HazardEvent;
  barangay?: string;
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

export function DocumentViewerModal({ docId, insuranceCase, farm, hazard, barangay, onClose }: DocumentViewerModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const generatedDate = insuranceCase.log.find((l) => l.stage === "compiled") ?? insuranceCase.log[insuranceCase.log.length - 1];

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-full w-full max-w-[560px] flex-col overflow-hidden rounded-[6px] border border-border bg-card shadow-[var(--shadow)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-divider bg-bg px-5 py-4">
          <div>
            <span className="font-mono text-[10px] font-bold tracking-[1px] text-ink-soft uppercase">
              Agent-generated document
            </span>
            <h3 className="mt-0.5 text-[14.5px] font-extrabold text-ink">
              {docId === "notice" && "PCIC Notice of Loss"}
              {docId === "summary" && "Damage Assessment Summary"}
              {docId === "evidence" && "Photo & Satellite Evidence Package"}
            </h3>
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
          {docId === "notice" && (
            <div>
              <p className="mb-3 text-center font-mono text-[10.5px] font-bold tracking-[1px] text-ink-soft uppercase">
                Philippine Crop Insurance Corporation
              </p>
              <div className="rounded-[6px] border border-divider bg-bg px-4">
                <Field label="Claimant" value={insuranceCase.farmerName} />
                <Field label="Farm location" value={barangay ? `Brgy. ${barangay}` : "—"} />
                <Field label="Crop insured" value={farm.crop} />
                <Field label="Area insured" value={`${farm.areaHa.toFixed(1)} ha`} />
                <Field label="Cause of loss" value={`${hazard.name} (Signal No. ${hazard.signal})`} />
                <Field label="Estimated damage" value={`${farm.estimatedLossPct}%`} />
                <Field label="Prepared by" value="ANIMO agent" />
                {generatedDate && <Field label="Date prepared" value={`${generatedDate.dateLabel} · ${generatedDate.timeLabel}`} />}
              </div>
            </div>
          )}

          {docId === "summary" && (
            <div>
              <p className="text-[13px] leading-relaxed text-ink">
                Sentinel-2 change detection over {hazard.clusterName} ({hazard.clusterId}) shows crop-health decline
                consistent with {hazard.name} (Signal No. {hazard.signal}), comparing passes on {hazard.preImageDate}{" "}
                and {hazard.postImageDate}. {insuranceCase.farmerName}'s {farm.crop.toLowerCase()} farm (
                {farm.areaHa.toFixed(1)} ha) shows an estimated {farm.estimatedLossPct}% loss, consistent with wind
                and flood damage reported in the advisory zone.
              </p>
              <div className="mt-3 rounded-[6px] border border-divider bg-bg px-4">
                <Field label="Cluster" value={hazard.clusterId} />
                <Field label="Satellite passes" value={`${hazard.preImageDate} → ${hazard.postImageDate}`} />
                <Field label="Method" value="Sentinel-2 NDVI change detection" />
              </div>
            </div>
          )}

          {docId === "evidence" && (
            <div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <img
                    src="/insurance/plot1-before.png"
                    alt="ESRI World Imagery over Namunga, Rosario, plot 1 (before)"
                    className="aspect-[4/3] w-full rounded-[4px] object-cover"
                  />
                  <span className="mt-1 block text-center font-mono text-[10px] text-ink-soft uppercase">Before</span>
                </div>
                <div>
                  <img
                    src="/insurance/plot1-after.png"
                    alt="ESRI World Imagery over Namunga, Rosario, plot 1 (after)"
                    className="aspect-[4/3] w-full rounded-[4px] object-cover"
                  />
                  <span className="mt-1 block text-center font-mono text-[10px] text-ink-soft uppercase">After</span>
                </div>
              </div>
              <div className="mt-3 rounded-[6px] border border-divider bg-bg px-4">
                <Field label="Basemap" value="ESRI World Imagery" />
                <Field label="Plot" value="Namunga, Rosario — plot 1" />
                <Field label="NDVI (before)" value="01 Apr 2026 · 0.56" />
                <Field label="NDVI (after)" value="22 Aug 2026 · 0.68" />
              </div>
              <p className="mt-3 text-[11.5px] text-ink-soft">
                ESRI provides the sharp display photos; Sentinel Hub NDVI stays the analytical source behind the
                before/after numbers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
