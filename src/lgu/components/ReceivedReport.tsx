import { CheckCircleIcon } from "../../components/layout/icons";
import { RECEIVED_REPORT_META, RECEIVED_REPORT_SECTIONS } from "../data/mockReceivedReport";

export function ReceivedReport() {
  return (
    <div className="panel-corners flex flex-1 flex-col rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-3 flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
            Received from Road to Recovery
          </span>
          <h3 className="mt-0.5 text-[15px] font-extrabold text-ink">
            Damage Assessment Report — {RECEIVED_REPORT_META.clusterId}
          </h3>
        </div>
        <div className="flex items-center gap-2 rounded-[20px] bg-success/10 px-3 py-1.5">
          <CheckCircleIcon className="h-3.5 w-3.5 text-text-success" />
          <span className="font-mono text-[11px] font-bold text-text-success">
            Ref. {RECEIVED_REPORT_META.referenceNo} · {RECEIVED_REPORT_META.receivedLabel}
          </span>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-2 overflow-y-auto pr-1 md:grid-cols-2">
        {RECEIVED_REPORT_SECTIONS.map((section) => (
          <div key={section.id} className="rounded-[6px] border border-border bg-bg px-4 py-3">
            <h4 className="text-[12.5px] font-bold text-ink">{section.title}</h4>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
