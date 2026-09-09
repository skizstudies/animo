import { useEffect, useRef, useState } from "react";
import { usePhtClock } from "../../hooks/usePhtClock";
import type { PageId } from "../../types";
import { BellIcon, MoonIcon, SunIcon } from "./icons";

interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "PAGASA signal raised",
    body: "Signal No. 2 over Batangas — 3 farm clusters in the advisory zone.",
    time: "12 min ago",
    unread: true,
  },
  {
    id: "n2",
    title: "Documents ready for review",
    body: "Mang Tomas Reyes's PCIC package is compiled and awaiting your approval.",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: "n3",
    title: "PCIC report submitted",
    body: "Insurance claim for Cluster 4 was filed successfully.",
    time: "Yesterday",
    unread: false,
  },
];

const PAGE_TITLES: Record<PageId, string> = {
  overview: "Overview",
  insurance: "Insurance",
  recovery: "Reports",
  "farm-map": "Farm Map",
};

interface TopbarProps {
  activePage: PageId;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function Topbar({ activePage, theme, onToggleTheme }: TopbarProps) {
  const { date, time, greeting } = usePhtClock();
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(MOCK_NOTIFICATIONS.filter((n) => n.unread).length);
  const notifRef = useRef<HTMLDivElement>(null);

  const isOverview = activePage === "overview";

  useEffect(() => {
    if (!notifOpen) return;
    function handlePointerDown(e: PointerEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setNotifOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [notifOpen]);

  return (
    <div className="no-print mb-[18px] flex shrink-0 items-center gap-7">
      <div className="shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[21px] font-extrabold tracking-tight text-ink">
            {isOverview ? `${greeting}, Regina!` : PAGE_TITLES[activePage]}
          </h1>
          {isOverview && (
            <>
              <div className="h-[18px] w-0.5 shrink-0 rounded bg-success" />
              <span className="font-mono text-[13.5px] font-bold tracking-wide text-ink-soft">{date}</span>
              <span className="font-mono text-[13.5px] font-bold tracking-wide text-ink-soft">{time}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex shrink-0 items-center gap-2.5">
        <a
          href="#lgu"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 rounded-[13px] border border-border bg-card px-3 py-2.5 font-mono text-[10.5px] font-bold text-ink-soft hover:text-ink sm:block"
        >
          LGU view ↗
        </a>
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setNotifOpen((open) => !open);
              setUnreadCount(0);
            }}
            className="relative flex h-[42px] w-[42px] items-center justify-center rounded-[13px] border border-border bg-card text-ink"
          >
            <BellIcon className="h-[18px] w-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-[19px] w-[19px] items-center justify-center rounded-full border-[2.5px] border-bg bg-danger text-[10px] font-extrabold text-white">
                {unreadCount}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute top-[50px] right-0 z-20 flex w-[300px] flex-col gap-1 rounded-[6px] border border-border bg-card p-2 text-left shadow-[var(--shadow)]">
              <div className="px-2.5 pt-2 pb-2.5 text-[12px] font-extrabold text-ink">Notifications</div>
              {MOCK_NOTIFICATIONS.map((n) => (
                <div key={n.id} className="flex gap-2.5 rounded-[11px] p-2.5 hover:bg-hover">
                  {n.unread && <div className="mt-1 h-[7px] w-[7px] shrink-0 rounded-full bg-sidebar" />}
                  <div className={n.unread ? "" : "pl-[19px]"}>
                    <b className="block text-[12px] font-bold text-ink">{n.title}</b>
                    <p className="mt-0.5 text-[11px] text-ink-soft">{n.body}</p>
                    <span className="mt-[3px] block text-[10px] text-ink-soft">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="flex h-[42px] w-[42px] items-center justify-center rounded-[13px] border border-border bg-card text-ink"
        >
          {theme === "dark" ? <MoonIcon className="h-[18px] w-[18px]" /> : <SunIcon className="h-[18px] w-[18px]" />}
        </button>
      </div>
    </div>
  );
}
