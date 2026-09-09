import { STAGE_LABEL, STAGE_ORDER } from "../../data/pipelineStages";
import type { StageLogEntry } from "../../types";
import { CheckCircleIcon } from "../layout/icons";

interface ProcessingLogProps {
  log: StageLogEntry[];
}

/** The audit trail a mentor asked for — not just "what stage is this case at"
 * but "when did each phase actually happen." */
export function ProcessingLog({ log }: ProcessingLogProps) {
  return (
    <div className="rounded-[6px] border border-divider bg-bg px-4 py-3">
      <span className="font-mono text-[11.5px] font-bold tracking-[1px] text-ink-soft uppercase">Processing log</span>
      <ul className="mt-2 flex flex-col gap-2">
        {STAGE_ORDER.map((stage) => {
          const entry = log.find((l) => l.stage === stage);
          return (
            <li key={stage} className="flex items-center gap-2.5 text-[14px]">
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  entry ? "bg-success text-white" : "border border-border text-transparent"
                }`}
              >
                <CheckCircleIcon className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              <span className={entry ? "text-ink" : "text-ink-soft/50"}>{STAGE_LABEL[stage]}</span>
              <span className="ml-auto shrink-0 font-mono text-[12px] text-ink-soft">
                {entry ? `${entry.dateLabel} · ${entry.timeLabel}` : "—"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
