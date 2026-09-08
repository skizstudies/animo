import type { ComponentType, SVGProps } from "react";
import { NAV_ITEMS } from "../../data/nav";
import type { PageId } from "../../types";
import { ChevronRightIcon, FarmMapIcon, InsuranceIcon, OverviewIcon, RecoveryIcon } from "./icons";

const ICONS: Record<PageId, ComponentType<SVGProps<SVGSVGElement>>> = {
  overview: OverviewIcon,
  insurance: InsuranceIcon,
  recovery: RecoveryIcon,
  "farm-map": FarmMapIcon,
};

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="panel-corners panel-corners-light relative flex w-[264px] shrink-0 flex-col rounded-[6px] border border-success/20 bg-gradient-to-b from-sidebar to-sidebar-deep p-[18px] pt-[26px] text-white shadow-[var(--shadow)]">
      <div className="flex items-center gap-[11px] px-2 pb-[26px]">
        <div className="h-[38px] w-[38px] shrink-0 overflow-hidden rounded-[6px]">
          <img src="/animo-logo.png" alt="ANIMO" className="h-full w-full object-contain" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[18px] font-extrabold tracking-tight">ANIMO</span>
          <span className="mt-0.5 text-[11.5px] text-white/55">Kita. Benta. Tara.</span>
        </div>
      </div>

      <ul className="flex flex-col gap-[3px]">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.id];
          const active = item.id === activePage;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={active ? "page" : undefined}
                className={`flex w-full items-center gap-[11px] rounded-[6px] px-3 py-2.5 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 ${
                  active
                    ? "bg-success/10 text-[#eafff0] shadow-[inset_3px_0_0_var(--color-success),0_0_22px_-4px_rgba(110,231,160,0.4)]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex-1" />

      <button
        type="button"
        className="flex items-center gap-2.5 rounded-[6px] bg-white/[0.07] p-3 text-left transition-colors hover:bg-white/[0.13]"
      >
        <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-success text-[13px] font-bold text-sidebar-deep">
          RB
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-bold text-white">Regina Bool</div>
          <div className="text-[11px] text-white/50">Head · Coop Alangilan</div>
        </div>
        <ChevronRightIcon className="ml-auto h-3.5 w-3.5 shrink-0 stroke-white/45" />
      </button>
    </aside>
  );
}
