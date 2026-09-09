import type { InsuranceCase, InsurancePolicy } from "../../types";
import { CheckCircleIcon } from "../layout/icons";
import { ProcessingLog } from "./ProcessingLog";

interface ConversationThreadProps {
  insuranceCase: InsuranceCase;
  policy?: InsurancePolicy;
  onBack: () => void;
}

export function ConversationThread({ insuranceCase, policy, onBack }: ConversationThreadProps) {
  return (
    <div className="panel-corners flex flex-1 flex-col rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-4 flex shrink-0 items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
            Agent conversation · simulated SMS
          </span>
          <h3 className="mt-0.5 text-[15px] font-extrabold text-ink">{insuranceCase.farmerName}</h3>
          {policy?.policyNo && (
            <p className="mt-0.5 font-mono text-[10.5px] text-ink-soft">
              Policy #{policy.policyNo} · active since {policy.registeredDateLabel}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 rounded-[4px] border border-border px-3 py-2 font-mono text-[11px] font-bold text-ink-soft hover:bg-hover hover:text-ink"
        >
          ← Satellite evidence
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto pr-1">
        {insuranceCase.messages.map((m) => {
          const fromAgent = m.from === "agent";
          return (
            <div key={m.id} className={`flex ${fromAgent ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-[14px] px-3.5 py-2.5 ${fromAgent ? "bg-sidebar text-white" : "border border-border bg-bg text-ink"}`}>
                <p className="text-[13px] leading-snug">{m.text}</p>
                <span className={`mt-1 block text-right font-mono text-[10px] ${fromAgent ? "text-white/60" : "text-ink-soft"}`}>
                  {m.timeLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {insuranceCase.consented && (
        <div className="mt-3 flex shrink-0 items-center gap-2 rounded-[6px] border border-success/30 bg-success/8 px-3.5 py-2.5">
          <CheckCircleIcon className="h-4 w-4 text-text-success" />
          <span className="text-[12px] font-bold text-text-success">Farmer consented — agent proceeding on their behalf</span>
        </div>
      )}

      <div className="mt-3 shrink-0">
        <ProcessingLog log={insuranceCase.log} />
      </div>
    </div>
  );
}
