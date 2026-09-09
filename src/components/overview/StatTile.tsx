import type { ComponentType, ReactNode, SVGProps } from "react";

type Accent = "success" | "warning" | "tech" | "neutral";

const ACCENT_CLASSES: Record<Accent, string> = {
  success: "bg-success/12 text-text-success",
  warning: "bg-warning/16 text-text-warn",
  tech: "bg-sidebar/12 text-sidebar-deep",
  neutral: "bg-hover text-ink-soft",
};

interface StatTileProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  value: ReactNode;
  label: string;
  accent?: Accent;
  caption?: ReactNode;
  wide?: boolean;
}

/** One shared tile treatment for every Overview metric — big numeral,
 * icon doing the labeling work, one short caption line at most. Meant to
 * read at a glance from across a room during a fast, phase-by-phase demo. */
export function StatTile({ icon: Icon, value, label, accent = "success", caption, wide }: StatTileProps) {
  return (
    <div
      className={`panel-corners flex flex-col gap-3 rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)] ${wide ? "sm:col-span-2" : ""}`}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] ${ACCENT_CLASSES[accent]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[34px] leading-none font-extrabold tracking-tight text-ink">{value}</div>
        <div className="mt-1.5 font-mono text-[10.5px] font-bold tracking-[0.8px] text-ink-soft uppercase">{label}</div>
      </div>
      {caption && <div className="mt-auto text-[11.5px] text-ink-soft">{caption}</div>}
    </div>
  );
}
