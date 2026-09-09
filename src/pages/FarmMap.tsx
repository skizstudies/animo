import { FarmDetail } from "../components/farm-map/FarmDetail";
import { FarmDirectory } from "../components/farm-map/FarmDirectory";
import { FarmMapView } from "../components/farm-map/FarmMapView";
import { FARMS } from "../data/mockFarms";
import { AFFECTED_FARMS } from "../data/mockInsurance";
import { getPolicy, POLICIES } from "../data/mockPolicies";
import { DAMAGE_REPORT_FARM_IDS } from "../data/mockRecovery";

interface FarmMapProps {
  selectedFarmId: string | null;
  onSelectFarm: (farmId: string) => void;
}

export function FarmMap({ selectedFarmId, onSelectFarm }: FarmMapProps) {
  const selectedFarm = FARMS.find((f) => f.id === selectedFarmId) ?? null;
  const policy = selectedFarmId ? getPolicy(selectedFarmId) : undefined;
  const insuranceRecord = AFFECTED_FARMS.find((f) => f.farmId === selectedFarmId);
  const inRecoveryReport = Boolean(selectedFarmId) && DAMAGE_REPORT_FARM_IDS.includes(selectedFarmId as string);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex min-h-0 flex-1 gap-4">
        <FarmMapView farms={FARMS} selectedFarm={selectedFarm} onSelectFarm={onSelectFarm} />
        <FarmDirectory farms={FARMS} policies={POLICIES} selectedId={selectedFarmId} onSelect={onSelectFarm} />
      </div>
      <FarmDetail farm={selectedFarm} policy={policy} insuranceRecord={insuranceRecord} inRecoveryReport={inRecoveryReport} />
    </div>
  );
}
