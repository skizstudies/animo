import { FarmDetail } from "../components/farm-map/FarmDetail";
import { FarmDirectory } from "../components/farm-map/FarmDirectory";
import { GisPlaceholder } from "../components/farm-map/GisPlaceholder";
import { FARMS } from "../data/mockFarms";
import { AFFECTED_FARMS } from "../data/mockInsurance";

interface FarmMapProps {
  selectedFarmId: string | null;
  onSelectFarm: (farmId: string) => void;
}

export function FarmMap({ selectedFarmId, onSelectFarm }: FarmMapProps) {
  const selectedFarm = FARMS.find((f) => f.id === selectedFarmId) ?? null;
  const insuranceRecord = AFFECTED_FARMS.find((f) => f.farmId === selectedFarmId);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex min-h-0 flex-1 gap-4">
        <GisPlaceholder selectedFarm={selectedFarm} />
        <FarmDirectory farms={FARMS} selectedId={selectedFarmId} onSelect={onSelectFarm} />
      </div>
      <FarmDetail farm={selectedFarm} insuranceRecord={insuranceRecord} />
    </div>
  );
}
