import { useEffect, useState } from "react";
import type { DamageReportSection } from "../../types";
import { CloseIcon, SparklesIcon } from "../layout/icons";

interface ReportSectionModalProps {
  section: DamageReportSection;
  content?: string;
  timeInfo?: { dateLabel: string; timeLabel: string };
  edited: boolean;
  processing: boolean;
  locked: boolean;
  onAnswer: (sectionId: string, value: string) => void;
  onSaveEdit: (sectionId: string, value: string) => void;
  onClose: () => void;
}

export function ReportSectionModal({
  section,
  content,
  timeInfo,
  edited,
  processing,
  locked,
  onAnswer,
  onSaveEdit,
  onClose,
}: ReportSectionModalProps) {
  const [answerDraft, setAnswerDraft] = useState("");
  const [editing, setEditing] = useState(false);
  const [editDraft, setEditDraft] = useState(content ?? "");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function startEditing() {
    setEditDraft(content ?? "");
    setEditing(true);
  }

  function saveEdit() {
    if (editDraft.trim()) onSaveEdit(section.id, editDraft.trim());
    setEditing(false);
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-6" onClick={onClose}>
      <div
        className="flex max-h-full w-full max-w-[520px] flex-col overflow-hidden rounded-[6px] border border-border bg-card shadow-[var(--shadow)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-divider bg-bg px-5 py-4">
          <div>
            <span className="font-mono text-[10px] font-bold tracking-[1px] text-ink-soft uppercase">
              Damage assessment section
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
          {content && !editing ? (
            <>
              <div className="mb-2 flex items-center gap-1.5">
                <SparklesIcon className="h-3 w-3 text-text-success" />
                <span className="font-mono text-[9.5px] font-bold text-text-success uppercase">
                  {edited ? "Edited by you" : section.status === "ai-filled" ? "AI-drafted" : "Completed from your input"}
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-ink">{content}</p>
              {timeInfo && (
                <p className="mt-3 font-mono text-[10.5px] text-ink-soft">
                  {timeInfo.dateLabel} · {timeInfo.timeLabel}
                </p>
              )}
              {!locked && (
                <button
                  type="button"
                  onClick={startEditing}
                  className="mt-4 rounded-[4px] border border-border px-3.5 py-2 font-mono text-[11px] font-bold text-ink-soft hover:bg-hover hover:text-ink"
                >
                  Edit this section
                </button>
              )}
            </>
          ) : content && editing ? (
            <>
              <textarea
                value={editDraft}
                onChange={(e) => setEditDraft(e.target.value)}
                rows={5}
                className="w-full resize-none rounded-[4px] border border-border bg-bg px-3 py-2.5 text-[13px] text-ink outline-none focus:border-success/50"
              />
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="rounded-[4px] border border-border px-3.5 py-2 text-[12px] font-bold text-ink-soft hover:bg-hover"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveEdit}
                  disabled={!editDraft.trim()}
                  className="rounded-[4px] bg-sidebar px-3.5 py-2 text-[12px] font-bold text-white hover:bg-sidebar-deep disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Save changes
                </button>
              </div>
            </>
          ) : processing ? (
            <p className="animate-pulse text-[13px] text-ink-soft italic">AI is folding your answer into the report…</p>
          ) : (
            <div>
              <p className="mb-3 text-[13px] text-ink">{section.prompt}</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (answerDraft.trim() && !locked) onAnswer(section.id, answerDraft.trim());
                }}
                className="flex gap-2"
              >
                <input
                  value={answerDraft}
                  onChange={(e) => setAnswerDraft(e.target.value)}
                  disabled={locked}
                  autoFocus
                  placeholder="Type a short answer…"
                  className="flex-1 rounded-[4px] border border-border bg-bg px-3 py-2 text-[12.5px] text-ink outline-none focus:border-success/50"
                />
                <button
                  type="submit"
                  disabled={locked || !answerDraft.trim()}
                  className="shrink-0 rounded-[4px] bg-sidebar px-3.5 py-2 text-[12px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Answer
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
