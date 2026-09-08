import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";
import { useTheme } from "./hooks/useTheme";
import { FarmMap } from "./pages/FarmMap";
import { Insurance } from "./pages/Insurance";
import { Overview } from "./pages/Overview";
import { Recovery } from "./pages/Recovery";
import type { PageId } from "./types";

export default function App() {
  const [activePage, setActivePage] = useState<PageId>("overview");
  const { theme, toggle } = useTheme();

  return (
    <div className="flex h-screen gap-5 p-5">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar activePage={activePage} theme={theme} onToggleTheme={toggle} />
        <div className="flex min-h-0 flex-1 flex-col">
          {activePage === "overview" && <Overview onNavigate={setActivePage} />}
          {activePage === "insurance" && <Insurance />}
          {activePage === "recovery" && <Recovery />}
          {activePage === "farm-map" && <FarmMap />}
        </div>
      </main>
    </div>
  );
}
