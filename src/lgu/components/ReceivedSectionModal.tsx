import { useEffect } from "react";
import { CloseIcon } from "../../components/layout/icons";
import type { DamageReportSection } from "../../types";

interface ReceivedSectionModalProps {
  section: DamageReportSection;
  onClose: () => void;
}

export function ReceivedSectionModal({ section, onClose }: ReceivedSectionModalProps) {
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
              Damage assessment report section
            </span>
            <h3 className="mt-0.5 text-[14.5px] font-extrabold text-ink">{section.title}</h3>
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
          <p className="text-[13px] leading-relaxed text-ink">{section.content}</p>
          {section.dateLabel && section.timeLabel && (
            <p className="mt-3 font-mono text-[10.5px] text-ink-soft">
              Drafted {section.dateLabel} · {section.timeLabel}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
