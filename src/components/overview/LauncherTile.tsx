import type { ComponentType, SVGProps } from "react";
import { ArrowDownIcon } from "../layout/icons";

type Accent = "success" | "warning";

interface LauncherTileProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  description: string;
  cta: string;
  accent: Accent;
  onOpen: () => void;
}

const ACCENT_CLASSES: Record<Accent, { badge: string; icon: string; arrow: string }> = {
  success: { badge: "bg-success/12", icon: "text-text-success", arrow: "bg-success" },
  warning: { badge: "bg-warning/16", icon: "text-text-warn", arrow: "bg-warning" },
};

/** A launcher tile on the Overview page — the app's two entry points, per the
 * Cooperatives sketch: icon + label up top, a down-arrow action at the base. */
export function LauncherTile({ icon: Icon, label, description, cta, accent, onOpen }: LauncherTileProps) {
  const cls = ACCENT_CLASSES[accent];

  return (
    <button
      type="button"
      onClick={onOpen}
      className="panel-corners group flex flex-1 flex-col items-center justify-center gap-5 rounded-[6px] border border-border bg-card px-10 py-12 text-center shadow-[var(--shadow-sm)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-success"
    >
      <div className={`flex h-16 w-16 items-center justify-center rounded-[14px] ${cls.badge}`}>
        <Icon className={`h-7 w-7 ${cls.icon}`} />
      </div>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-[20px] font-extrabold text-ink">{label}</h2>
        <p className="max-w-[30ch] text-[13px] text-ink-soft">{description}</p>
      </div>

      <div className="mt-2 flex flex-col items-center gap-2">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-[var(--shadow-sm)] transition-transform group-hover:translate-y-0.5 ${cls.arrow}`}
        >
          <ArrowDownIcon className="h-5 w-5" />
        </span>
        <span className="font-mono text-[10.5px] font-bold tracking-[1px] text-ink-soft uppercase">{cta}</span>
      </div>
    </button>
  );
}
