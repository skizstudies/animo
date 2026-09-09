import { useEffect, useState } from "react";
import { DropletIcon, RainIcon, ThermometerIcon } from "../../components/layout/icons";
import { WEATHER_READINGS, WEATHER_SOURCE_UPDATED } from "../data/mockWeather";

const ICONS = { rain: RainIcon, temp: ThermometerIcon, humidity: DropletIcon };

export function WeatherPanel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % WEATHER_READINGS.length), 3500);
    return () => clearInterval(id);
  }, []);

  const reading = WEATHER_READINGS[index];
  const Icon = ICONS[reading.icon];

  return (
    <div className="panel-corners flex w-[220px] shrink-0 flex-col rounded-[6px] border border-border bg-card p-4 shadow-[var(--shadow-sm)]">
      <div className="shrink-0">
        <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
          PAGASA · weather monitoring
        </span>
        <h3 className="mt-0.5 text-[15px] font-extrabold text-ink">Barangay Alangilan</h3>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-[12px] bg-sidebar/10 text-sidebar-deep">
          <Icon className="h-7 w-7" />
        </div>
        <div className="text-center">
          <div className="text-[28px] font-extrabold text-ink">{reading.value}</div>
          <div className="font-mono text-[10.5px] font-bold tracking-[0.7px] text-ink-soft uppercase">
            {reading.label}
          </div>
        </div>
        <div className="flex gap-1.5">
          {WEATHER_READINGS.map((r, i) => (
            <button
              key={r.id}
              type="button"
              aria-label={`Show ${r.label}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${i === index ? "bg-sidebar" : "bg-border"}`}
            />
          ))}
        </div>
      </div>

      <div className="shrink-0 text-center font-mono text-[10.5px] text-ink-soft">{WEATHER_SOURCE_UPDATED}</div>
    </div>
  );
}
