import { LauncherTile } from "../components/overview/LauncherTile";
import { InsuranceIcon, RecoveryIcon } from "../components/layout/icons";
import type { PageId } from "../types";

interface OverviewProps {
  onNavigate: (page: PageId) => void;
}

export function Overview({ onNavigate }: OverviewProps) {
  return (
    <div className="flex flex-1 gap-5">
      <LauncherTile
        icon={InsuranceIcon}
        label="Insurance"
        description="Satellite evidence, gathered and drafted into a PCIC-ready report."
        cta="Open Insurance"
        accent="warning"
        onOpen={() => onNavigate("insurance")}
      />
      <LauncherTile
        icon={RecoveryIcon}
        label="Recovery"
        description="AI-matched farmers to cover a buyer's shortfall, ranked and ready to approve."
        cta="Open Recovery"
        accent="success"
        onOpen={() => onNavigate("recovery")}
      />
    </div>
  );
}
