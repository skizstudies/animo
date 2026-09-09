import { CheckCircleIcon, SendIcon } from "../layout/icons";
import type { DamageReportSection } from "../../types";

interface SectionViewState {
  content?: string;
  timeInfo?: { dateLabel: string; timeLabel: string };
}

interface ReportFinalReviewProps {
  sections: DamageReportSection[];
  viewState: Record<string, SectionViewState>;
  recipient: string;
  clusterId: string;
  onBack: () => void;
  onSubmit: () => void;
}

/** The assembled document, read top to bottom the way PCIC/the LGU will see
 * it — not a card grid. The last checkpoint before an officer sends it. */
export function ReportFinalReview({ sections, viewState, recipient, clusterId, onBack, onSubmit }: ReportFinalReviewProps) {
  return (
    <div className="panel-corners flex flex-1 flex-col rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-4 flex shrink-0 items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[11.5px] font-bold tracking-[1.2px] text-ink-soft uppercase">
            Final review · for {recipient}
          </span>
          <h3 className="mt-0.5 text-[17px] font-extrabold text-ink">Damage Assessment Report — {clusterId}</h3>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 rounded-[4px] border border-border px-3 py-2 font-mono text-[12.5px] font-bold text-ink-soft hover:bg-hover hover:text-ink"
        >
          ← Back to sections
        </button>
      </div>

      <div className="flex-1 overflow-y-auto rounded-[6px] border border-divider bg-bg px-5 py-4">
        <div className="flex flex-col divide-y divide-divider">
          {sections.map((section) => {
            const state = viewState[section.id];
            return (
              <div key={section.id} className="py-3.5 first:pt-0 last:pb-0">
                <h4 className="text-[14.5px] font-extrabold text-ink">{section.title}</h4>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink">{state?.content}</p>
                {state?.timeInfo && (
                  <p className="mt-2 font-mono text-[11.5px] text-ink-soft">
                    {state.timeInfo.dateLabel} · {state.timeInfo.timeLabel}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex shrink-0 items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[14px] text-ink-soft">
          <CheckCircleIcon className="h-3.5 w-3.5 text-text-success" />
          Every section resolved — ready to send
        </span>
        <button
          type="button"
          onClick={onSubmit}
          className="flex items-center gap-2 rounded-[4px] bg-sidebar px-4 py-2.5 text-[14.5px] font-bold text-white hover:bg-sidebar-deep"
        >
          <SendIcon className="h-3.5 w-3.5" />
          Submit to the LGU
        </button>
      </div>
    </div>
  );
}
