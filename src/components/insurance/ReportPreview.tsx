import type { AffectedFarm, HazardEvent } from "../../types";
import { CheckCircleIcon, SendIcon, SparklesIcon } from "../layout/icons";

interface ReportPreviewProps {
  hazard: HazardEvent;
  farms: AffectedFarm[];
  generatedAt: Date;
  submitted: boolean;
  referenceNo: string;
  onBack: () => void;
  onSubmit: () => void;
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-divider py-2 text-[12px] last:border-b-0">
      <span className="font-mono text-ink-soft uppercase">{label}</span>
      <span className="font-bold text-ink">{value}</span>
    </div>
  );
}

export function ReportPreview({ hazard, farms, generatedAt, submitted, referenceNo, onBack, onSubmit }: ReportPreviewProps) {
  const totalArea = farms.reduce((sum, f) => sum + f.areaHa, 0);
  const avgLoss = Math.round(farms.reduce((sum, f) => sum + f.estimatedLossPct, 0) / farms.length);

  const narrative = `Sentinel-2 change detection over ${hazard.clusterName} (${hazard.clusterId}) shows crop-health decline consistent with ${hazard.name} (Signal No. ${hazard.signal}), comparing passes on ${hazard.preImageDate} and ${hazard.postImageDate}. ${farms.length} farm${farms.length === 1 ? "" : "s"} covering ${totalArea.toFixed(1)} ha show a combined average estimated loss of ${avgLoss}%, consistent with wind and flood damage reported in the advisory zone. This assessment is drafted for cooperative officer review before PCIC submission.`;

  return (
    <div className="panel-corners flex flex-1 flex-col gap-4 rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
      {submitted ? (
        <div className="flex shrink-0 items-center gap-3 rounded-[6px] border border-success/30 bg-success/8 px-4 py-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success text-white">
            <CheckCircleIcon className="h-4 w-4" />
          </span>
          <div>
            <div className="text-[13px] font-extrabold text-ink">Submitted to PCIC</div>
            <div className="font-mono text-[11px] text-ink-soft">
              Ref. {referenceNo} · {generatedAt.toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex shrink-0 items-center gap-2 font-mono text-[10px] font-bold tracking-[1.2px] text-text-success uppercase">
          <SparklesIcon className="h-3.5 w-3.5" />
          AI-drafted · review before submitting
        </div>
      )}

      <div>
        <h3 className="text-[16px] font-extrabold text-ink">PCIC Damage Assessment — {hazard.clusterId}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{narrative}</p>
      </div>

      <div className="rounded-[6px] border border-divider bg-bg px-4">
        <MetaRow label="Hazard" value={`${hazard.name} · Signal ${hazard.signal}`} />
        <MetaRow label="Cluster" value={hazard.clusterId} />
        <MetaRow label="Farms included" value={String(farms.length)} />
        <MetaRow label="Total area" value={`${totalArea.toFixed(1)} ha`} />
        <MetaRow label="Est. average loss" value={`${avgLoss}%`} />
        <MetaRow label="Satellite passes" value={`${hazard.preImageDate} → ${hazard.postImageDate}`} />
      </div>

      <div className="mt-auto flex shrink-0 items-center justify-end gap-2.5 pt-1">
        {!submitted && (
          <>
            <button
              type="button"
              onClick={onBack}
              className="rounded-[4px] border border-border px-4 py-2.5 text-[12.5px] font-bold text-ink hover:bg-hover"
            >
              Back to evidence
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="flex items-center gap-2 rounded-[4px] bg-sidebar px-4 py-2.5 text-[12.5px] font-bold text-white hover:bg-sidebar-deep"
            >
              <SendIcon className="h-3.5 w-3.5" />
              Submit to PCIC
            </button>
          </>
        )}
      </div>
    </div>
  );
}
