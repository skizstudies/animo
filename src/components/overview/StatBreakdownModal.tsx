import { useEffect } from "react";
import { CloseIcon } from "../layout/icons";

interface StatBreakdownModalProps {
  title: string;
  rows: { label: string; count: number }[];
  onClose: () => void;
}

/** A short overlay for the one stat that has more to say than a one-line
 * caption can hold without overflowing the tile — tap the tile, read the
 * breakdown, close. */
export function StatBreakdownModal({ title, rows, onClose }: StatBreakdownModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-6" onClick={onClose}>
      <div
        className="flex w-full max-w-[380px] flex-col overflow-hidden rounded-[6px] border border-border bg-card shadow-[var(--shadow)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-divider bg-bg px-5 py-4">
          <h3 className="text-[15px] font-extrabold text-ink">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] text-ink-soft hover:bg-hover hover:text-ink"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col divide-y divide-divider px-5">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-3 text-[14.5px]">
              <span className="text-ink-soft">{row.label}</span>
              <span className="font-mono font-extrabold text-ink">{row.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
