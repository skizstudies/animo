import type { ComponentType, ReactNode, SVGProps } from "react";
import { ChevronRightIcon } from "../layout/icons";

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
  onClick?: () => void;
}

/** One shared tile treatment for every Overview metric — big numeral,
 * icon doing the labeling work, one short caption line at most. Meant to
 * read at a glance from across a room during a fast, phase-by-phase demo.
 * Anything with more to say than fits gets an onClick instead of cramming
 * it into the caption. */
export function StatTile({ icon: Icon, value, label, accent = "success", caption, wide, onClick }: StatTileProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`panel-corners flex h-full flex-col rounded-[6px] border border-border bg-card p-6 text-left shadow-[var(--shadow-sm)] ${wide ? "sm:col-span-2" : ""} ${onClick ? "transition-colors hover:border-success/40 hover:bg-success/6" : ""}`}
    >
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] ${ACCENT_CLASSES[accent]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-[56px] leading-none font-extrabold tracking-tight text-ink">{value}</div>
          <div className="mt-2 font-mono text-[13px] font-bold tracking-[0.8px] text-ink-soft uppercase">{label}</div>
        </div>
      </div>
      {caption && (
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-divider pt-4 text-[13.5px] text-ink-soft">
          <span className="truncate">{caption}</span>
          {onClick && <ChevronRightIcon className="h-4 w-4 shrink-0" />}
        </div>
      )}
    </Tag>
  );
}
