import { useEffect } from "react";
import type { ReportHistoryEntry } from "../../types";
import { CloseIcon } from "../layout/icons";

interface PreviousReportModalProps {
  report: ReportHistoryEntry;
  onClose: () => void;
}

/** Read-only view of a report the cooperative already submitted — the same
 * assembled-document layout as the pre-submit final review. */
export function PreviousReportModal({ report, onClose }: PreviousReportModalProps) {
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
        className="flex max-h-full w-full max-w-[560px] flex-col overflow-hidden rounded-[6px] border border-border bg-card shadow-[var(--shadow)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-divider bg-bg px-5 py-4">
          <div>
            <span className="font-mono text-[11.5px] font-bold tracking-[1px] text-ink-soft uppercase">
              Submitted to {report.recipient}
            </span>
            <h3 className="mt-0.5 text-[16.5px] font-extrabold text-ink">
              Damage Assessment Report — {report.clusterId}
            </h3>
            <p className="mt-0.5 font-mono text-[11.5px] text-ink-soft">
              {report.hazardName} · Ref. {report.referenceNo} · {report.receivedLabel}
            </p>
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
          <div className="flex flex-col divide-y divide-divider">
            {report.sections.map((section) => (
              <div key={section.id} className="py-3.5 first:pt-0 last:pb-0">
                <h4 className="text-[14.5px] font-extrabold text-ink">{section.title}</h4>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink">{section.content}</p>
                {section.dateLabel && section.timeLabel && (
                  <p className="mt-2 font-mono text-[11.5px] text-ink-soft">
                    {section.dateLabel} · {section.timeLabel}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
