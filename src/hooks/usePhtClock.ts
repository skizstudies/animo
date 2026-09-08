import { useEffect, useState } from "react";

const dateFmt = new Intl.DateTimeFormat("en-PH", {
  timeZone: "Asia/Manila",
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const timeFmt = new Intl.DateTimeFormat("en-PH", {
  timeZone: "Asia/Manila",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function greetingFor(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/** Live PHT clock + greeting, ticking every second so the seconds digits are
 * actually live, not just displayed. */
export function usePhtClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1_000);
    return () => clearInterval(id);
  }, []);

  const hourInManila = Number(
    new Intl.DateTimeFormat("en-PH", { timeZone: "Asia/Manila", hour: "2-digit", hour12: false }).format(now),
  );

  return {
    date: dateFmt.format(now).toUpperCase(),
    time: timeFmt.format(now),
    greeting: greetingFor(hourInManila),
  };
}
