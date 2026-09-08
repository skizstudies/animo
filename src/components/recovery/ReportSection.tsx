import { useState } from "react";
import type { DamageReportSection } from "../../types";
import { CheckCircleIcon, SparklesIcon } from "../layout/icons";

interface ReportSectionProps {
  section: DamageReportSection;
  answeredContent?: string;
  processing: boolean;
  locked: boolean;
  onAnswer: (sectionId: string, value: string) => void;
}

export function ReportSection({ section, answeredContent, processing, locked, onAnswer }: ReportSectionProps) {
  const [draft, setDraft] = useState("");

  const isAiFilled = section.status === "ai-filled";
  const isCompleted = Boolean(answeredContent);
  const content = isAiFilled ? section.content : answeredContent;

  return (
    <div className="rounded-[6px] border border-border bg-bg px-4 py-3.5">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <h4 className="text-[13px] font-bold text-ink">{section.title}</h4>
        {isAiFilled && (
          <span className="flex shrink-0 items-center gap-1 rounded-[20px] bg-success/12 px-2 py-0.5 font-mono text-[9.5px] font-bold text-text-success uppercase">
            <SparklesIcon className="h-2.5 w-2.5" /> AI-drafted
          </span>
        )}
        {!isAiFilled && isCompleted && (
          <span className="flex shrink-0 items-center gap-1 rounded-[20px] bg-success/12 px-2 py-0.5 font-mono text-[9.5px] font-bold text-text-success uppercase">
            <CheckCircleIcon className="h-2.5 w-2.5" strokeWidth={3} /> Completed from your input
          </span>
        )}
      </div>

      {content ? (
        <p className="text-[13px] leading-relaxed text-ink-soft">{content}</p>
      ) : processing ? (
        <p className="animate-pulse text-[12.5px] text-ink-soft italic">AI is folding your answer into the report…</p>
      ) : (
        <div>
          <p className="mb-2 text-[13px] text-ink">{section.prompt}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (draft.trim() && !locked) onAnswer(section.id, draft.trim());
            }}
            className="flex gap-2"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={locked}
              placeholder="Type a short answer…"
              className="flex-1 rounded-[4px] border border-border bg-card px-3 py-2 text-[12.5px] text-ink outline-none focus:border-success/50"
            />
            <button
              type="submit"
              disabled={locked || !draft.trim()}
              className="shrink-0 rounded-[4px] bg-sidebar px-3.5 py-2 text-[12px] font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              Answer
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
