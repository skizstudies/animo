import { useMemo, useState } from "react";
import { HazardBanner } from "../components/insurance/HazardBanner";
import { CheckCircleIcon, SendIcon } from "../components/layout/icons";
import { ReportSectionList } from "../components/recovery/ReportSectionList";
import { ReportSectionModal } from "../components/recovery/ReportSectionModal";
import { ACTIVE_HAZARD } from "../data/mockInsurance";
import { DAMAGE_REPORT_RECIPIENT, DAMAGE_REPORT_SECTIONS } from "../data/mockRecovery";

const dateFmt = new Intl.DateTimeFormat("en-PH", { timeZone: "Asia/Manila", month: "short", day: "2-digit", year: "numeric" });
const timeFmt = new Intl.DateTimeFormat("en-PH", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit", hour12: true });

function composeContent(sectionId: string, answer: string): string {
  switch (sectionId) {
    case "s3":
      return `An estimated ${answer} families have been temporarily displaced and require transitional shelter assistance.`;
    case "s4":
      return `Officer-reported market impact: ${answer}.`;
    case "s5":
      return `The cooperative has flagged "${answer}" as the most urgent relief need for the affected barangays.`;
    default:
      return answer;
  }
}

function makeReferenceNo() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `LGU-${new Date().getFullYear()}-${n}`;
}

type TimeInfo = { dateLabel: string; timeLabel: string };

export function Recovery() {
  const [composed, setComposed] = useState<Record<string, string>>({});
  const [edited, setEdited] = useState<Record<string, string>>({});
  const [touchedAt, setTouchedAt] = useState<Record<string, TimeInfo>>({});
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);
  const referenceNo = useMemo(() => makeReferenceNo(), []);

  const gapSections = DAMAGE_REPORT_SECTIONS.filter((s) => s.status === "needs-input");
  const resolvedCount = gapSections.filter((s) => composed[s.id] || edited[s.id]).length;
  const allResolved = resolvedCount === gapSections.length;

  const viewState: Record<string, { content?: string; timeInfo?: TimeInfo; edited: boolean }> = {};
  for (const section of DAMAGE_REPORT_SECTIONS) {
    const content = edited[section.id] ?? composed[section.id] ?? section.content;
    const timeInfo =
      touchedAt[section.id] ??
      (section.dateLabel && section.timeLabel ? { dateLabel: section.dateLabel, timeLabel: section.timeLabel } : undefined);
    viewState[section.id] = { content, timeInfo, edited: Boolean(edited[section.id]) };
  }

  const openSection = DAMAGE_REPORT_SECTIONS.find((s) => s.id === openSectionId) ?? null;

  function handleAnswer(sectionId: string, value: string) {
    setProcessingId(sectionId);
    window.setTimeout(() => {
      const now = new Date();
      setComposed((c) => ({ ...c, [sectionId]: composeContent(sectionId, value) }));
      setTouchedAt((t) => ({ ...t, [sectionId]: { dateLabel: dateFmt.format(now), timeLabel: timeFmt.format(now) } }));
      setProcessingId(null);
    }, 800);
  }

  function handleSaveEdit(sectionId: string, value: string) {
    const now = new Date();
    setEdited((e) => ({ ...e, [sectionId]: value }));
    setTouchedAt((t) => ({ ...t, [sectionId]: { dateLabel: dateFmt.format(now), timeLabel: timeFmt.format(now) } }));
  }

  function handleSubmit() {
    setSubmittedAt(new Date());
    setSubmitted(true);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1">
      <HazardBanner hazard={ACTIVE_HAZARD} />

      <div className="panel-corners flex flex-1 flex-col gap-4 rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
        {submitted ? (
          <div className="flex shrink-0 items-center gap-3 rounded-[6px] border border-success/30 bg-success/8 px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success text-white">
              <CheckCircleIcon className="h-4 w-4" />
            </span>
            <div>
              <div className="text-[13px] font-extrabold text-ink">Submitted to {DAMAGE_REPORT_RECIPIENT}</div>
              <div className="font-mono text-[11px] text-ink-soft">
                Ref. {referenceNo}
                {submittedAt && ` · ${submittedAt.toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })}`}
              </div>
            </div>
          </div>
        ) : (
          <div className="shrink-0">
            <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
              Road to Recovery · for {DAMAGE_REPORT_RECIPIENT}
            </span>
            <h3 className="mt-0.5 text-[15px] font-extrabold text-ink">
              Damage Assessment Report — {ACTIVE_HAZARD.clusterId}
            </h3>
            <p className="mt-1 text-[12.5px] text-ink-soft">
              Tap a section to read it in full, or answer what the agent couldn't determine on its own.
            </p>
          </div>
        )}

        <ReportSectionList sections={DAMAGE_REPORT_SECTIONS} viewState={viewState} onOpen={setOpenSectionId} />

        {!submitted && (
          <div className="mt-auto flex shrink-0 flex-wrap items-center justify-between gap-3 pt-1">
            <span className="text-[12.5px] text-ink-soft">
              {allResolved
                ? "Every gap is filled — ready to submit."
                : `${gapSections.length - resolvedCount} of ${gapSections.length} gaps still need your input.`}
            </span>
            <button
              type="button"
              disabled={!allResolved}
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-[4px] bg-sidebar px-4 py-2.5 text-[12.5px] font-bold text-white transition-opacity hover:bg-sidebar-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              <SendIcon className="h-3.5 w-3.5" />
              Submit to the LGU
            </button>
          </div>
        )}
      </div>

      {openSection && (
        <ReportSectionModal
          section={openSection}
          content={viewState[openSection.id].content}
          timeInfo={viewState[openSection.id].timeInfo}
          edited={viewState[openSection.id].edited}
          processing={processingId === openSection.id}
          locked={submitted}
          onAnswer={handleAnswer}
          onSaveEdit={handleSaveEdit}
          onClose={() => setOpenSectionId(null)}
        />
      )}
    </div>
  );
}
