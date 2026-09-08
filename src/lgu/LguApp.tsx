import { MoonIcon, SunIcon } from "../components/layout/icons";
import { usePhtClock } from "../hooks/usePhtClock";
import { useTheme } from "../hooks/useTheme";
import { GisOverviewPlaceholder } from "./components/GisOverviewPlaceholder";
import { ReceivedReport } from "./components/ReceivedReport";
import { WeatherPanel } from "./components/WeatherPanel";

export function LguApp() {
  const { date, time } = usePhtClock();
  const { theme, toggle } = useTheme();

  return (
    <div className="flex h-screen flex-col gap-4 p-5">
      <header className="panel-corners flex shrink-0 flex-wrap items-center gap-4 rounded-[6px] border border-border bg-card px-5 py-4 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-[10px] bg-sidebar">
            <img src="/animo-logo.png" alt="ANIMO" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="text-[15px] font-extrabold text-ink">LGU Disaster Monitoring</div>
            <div className="text-[11.5px] text-ink-soft">Municipal Disaster Risk Reduction Office · Batangas</div>
          </div>
        </div>

        <div className="flex-1" />

        <span className="font-mono text-[12px] font-bold text-ink-soft">
          {date} · {time}
        </span>
        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle theme"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-border bg-bg text-ink"
        >
          {theme === "dark" ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
        </button>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-[10px] border border-border bg-bg px-3 py-2 font-mono text-[10.5px] font-bold text-ink-soft hover:text-ink"
        >
          Cooperative view ↗
        </a>
      </header>

      <div className="flex min-h-0 flex-1 gap-4">
        <WeatherPanel />
        <GisOverviewPlaceholder />
      </div>

      <div className="flex min-h-[280px] shrink-0 flex-col">
        <ReceivedReport />
      </div>
    </div>
  );
}
