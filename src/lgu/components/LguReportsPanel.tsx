import { useState } from "react";
import { CheckCircleIcon } from "../../components/layout/icons";
import { REPORT_HISTORY } from "../../data/mockReportsHistory";
import type { DamageReportSection } from "../../types";
import { ReceivedSectionModal } from "./ReceivedSectionModal";

const SUBMITTED_REPORTS = REPORT_HISTORY.filter((r) => r.status === "submitted");

/** LGU's report inbox — a list of every submitted damage assessment, with the
 * familiar clickable section-breakdown as the detail view for whichever one
 * is selected. Scales past the single hardcoded report this used to be. */
export function LguReportsPanel() {
  const [selectedId, setSelectedId] = useState<string | null>(SUBMITTED_REPORTS[0]?.id ?? null);
  const [openSection, setOpenSection] = useState<DamageReportSection | null>(null);

  const selected = SUBMITTED_REPORTS.find((r) => r.id === selectedId) ?? null;

  return (
    <div className="panel-corners flex min-h-[360px] flex-1 overflow-hidden rounded-[6px] border border-border bg-card shadow-[var(--shadow-sm)]">
      <div className="flex w-[220px] shrink-0 flex-col border-r border-divider">
        <div className="shrink-0 border-b border-divider px-4 py-3">
          <span className="font-mono text-[11.5px] font-bold tracking-[1.2px] text-ink-soft uppercase">Reports inbox</span>
          <h3 className="mt-0.5 text-[15.5px] font-extrabold text-ink">{SUBMITTED_REPORTS.length} received</h3>
        </div>
        <div className="flex flex-col gap-1 overflow-y-auto p-2">
          {SUBMITTED_REPORTS.map((r) => {
            const active = r.id === selectedId;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedId(r.id)}
                className={`rounded-[6px] border px-3 py-2.5 text-left transition-colors ${
                  active ? "border-success/35 bg-success/8" : "border-transparent hover:bg-hover"
                }`}
              >
                <div className="truncate text-[14.5px] font-bold text-ink">{r.hazardName}</div>
                <div className="text-[12.5px] text-ink-soft">
                  {r.clusterId} · {r.receivedLabel}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5">
        {selected ? (
          <>
            <div className="mb-3 flex shrink-0 flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-mono text-[11.5px] font-bold tracking-[1.2px] text-ink-soft uppercase">
                  Received from Road to Recovery
                </span>
                <h3 className="mt-0.5 text-[17px] font-extrabold text-ink">
                  Damage Assessment Report — {selected.clusterId}
                </h3>
              </div>
              <div className="flex items-center gap-2 rounded-[20px] bg-success/10 px-3 py-1.5">
                <CheckCircleIcon className="h-3.5 w-3.5 text-text-success" />
                <span className="font-mono text-[12.5px] font-bold text-text-success">
                  Ref. {selected.referenceNo} · {selected.receivedLabel}
                </span>
              </div>
            </div>

            <div className="grid flex-1 auto-rows-min grid-cols-1 gap-2 overflow-y-auto pr-1 md:grid-cols-2">
              {selected.sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setOpenSection(section)}
                  className="rounded-[6px] border border-border bg-bg px-4 py-3 text-left transition-colors hover:border-success/40 hover:bg-success/6"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-[14.5px] font-bold text-ink">{section.title}</h4>
                    <span className="shrink-0 font-mono text-[11.5px] font-bold text-text-success uppercase">Read</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-ink-soft">{section.content}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-[14.5px] text-ink-soft">No reports received yet.</div>
        )}
      </div>

      {openSection && <ReceivedSectionModal section={openSection} onClose={() => setOpenSection(null)} />}
    </div>
  );
}
