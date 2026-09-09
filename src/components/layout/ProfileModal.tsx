import { useEffect } from "react";
import { FARMS } from "../../data/mockFarms";
import { CloseIcon } from "./icons";

interface ProfileModalProps {
  onClose: () => void;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-divider py-2.5 text-[14.5px] last:border-b-0">
      <span className="font-mono text-[12px] text-ink-soft uppercase">{label}</span>
      <span className="font-bold text-ink">{value}</span>
    </div>
  );
}

export function ProfileModal({ onClose }: ProfileModalProps) {
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
        className="w-full max-w-[400px] overflow-hidden rounded-[6px] border border-border bg-card shadow-[var(--shadow)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 bg-gradient-to-b from-sidebar to-sidebar-deep px-5 py-5 text-white">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-success text-[17px] font-bold text-sidebar-deep">
            RB
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[17px] font-extrabold">Regina Bool</div>
            <div className="text-[13px] text-white/60">Head · Coop Alangilan</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] text-white/70 hover:bg-white/10 hover:text-white"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-4">
          <span className="font-mono text-[11.5px] font-bold tracking-[1px] text-ink-soft uppercase">
            Account details
          </span>
          <div className="mt-2">
            <Field label="Cooperative" value="Alangilan Farmers Multi-Purpose Coop." />
            <Field label="Email" value="regina.bool@coopalangilan.ph" />
            <Field label="Contact" value="0917 234 5678" />
            <Field label="Member since" value="2019" />
            <Field label="Farms overseen" value={String(FARMS.length)} />
          </div>
        </div>
      </div>
    </div>
  );
}
