import type { DamageReportSection } from "../../types";
import { CheckCircleIcon } from "../layout/icons";

interface ReportActivityLogProps {
  sections: DamageReportSection[];
  timeInfo: Record<string, { dateLabel: string; timeLabel: string }>;
}

/** The report's own audit trail — when the agent drafted each section, and
 * when the officer's answer completed the rest. */
export function ReportActivityLog({ sections, timeInfo }: ReportActivityLogProps) {
  return (
    <div className="rounded-[6px] border border-divider bg-bg px-4 py-3">
      <span className="font-mono text-[10px] font-bold tracking-[1px] text-ink-soft uppercase">Activity log</span>
      <ul className="mt-2 flex flex-col gap-2">
        {sections.map((section) => {
          const entry = timeInfo[section.id];
          return (
            <li key={section.id} className="flex items-center gap-2.5 text-[12px]">
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  entry ? "bg-success text-white" : "border border-border text-transparent"
                }`}
              >
                <CheckCircleIcon className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              <span className={entry ? "text-ink" : "text-ink-soft/50"}>{section.title}</span>
              <span className="ml-auto shrink-0 font-mono text-[10.5px] text-ink-soft">
                {entry ? `${entry.dateLabel} · ${entry.timeLabel}` : "Awaiting your input"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
