import type { DamageReportSection } from "../../types";
import { ChevronRightIcon } from "../layout/icons";

interface SectionViewState {
  content?: string;
  timeInfo?: { dateLabel: string; timeLabel: string };
  edited: boolean;
}

interface ReportSectionListProps {
  sections: DamageReportSection[];
  viewState: Record<string, SectionViewState>;
  onOpen: (sectionId: string) => void;
}

export function ReportSectionList({ sections, viewState, onOpen }: ReportSectionListProps) {
  return (
    <div className="flex flex-col gap-2">
      {sections.map((section) => {
        const state = viewState[section.id];
        const hasContent = Boolean(state?.content);
        const label = state?.edited
          ? "Edited by you"
          : section.status === "ai-filled"
            ? "AI-drafted"
            : hasContent
              ? "Completed"
              : "Needs your input";
        const needsInput = !hasContent && section.status === "needs-input";

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onOpen(section.id)}
            className={`flex items-center gap-3 rounded-[6px] border px-4 py-3 text-left transition-colors ${
              needsInput ? "border-warning/40 bg-warning/6 hover:bg-warning/10" : "border-border bg-bg hover:border-success/40"
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-bold text-ink">{section.title}</div>
            </div>
            <span
              className={`shrink-0 rounded-[20px] px-2.5 py-1 font-mono text-[10px] font-bold uppercase ${
                needsInput ? "bg-warning/16 text-text-warn" : "bg-success/12 text-text-success"
              }`}
            >
              {label}
            </span>
            {state?.timeInfo && (
              <span className="hidden shrink-0 font-mono text-[10.5px] text-ink-soft sm:block">
                {state.timeInfo.timeLabel}
              </span>
            )}
            <ChevronRightIcon className="h-4 w-4 shrink-0 text-ink-soft" />
          </button>
        );
      })}
    </div>
  );
}
