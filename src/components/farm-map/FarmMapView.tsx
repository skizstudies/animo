import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Farm } from "../../types";
import { FarmMapIcon } from "../layout/icons";

interface FarmMapViewProps {
  farms: Farm[];
  selectedFarm: Farm | null;
  onSelectFarm: (farmId: string) => void;
}

const FALLBACK_CENTER: [number, number] = [13.83142, 121.21486];

function centerOf(farms: Farm[]): [number, number] {
  const pinned = farms.filter((f): f is Farm & { lat: number; lng: number } => f.lat != null && f.lng != null);
  if (pinned.length === 0) return FALLBACK_CENTER;
  const lat = pinned.reduce((sum, f) => sum + f.lat, 0) / pinned.length;
  const lng = pinned.reduce((sum, f) => sum + f.lng, 0) / pinned.length;
  return [lat, lng];
}

export function FarmMapView({ farms, selectedFarm, onSelectFarm }: FarmMapViewProps) {
  const pinned = farms.filter((f): f is Farm & { lat: number; lng: number } => f.lat != null && f.lng != null);

  return (
    <div className="flex flex-[1.3] flex-col gap-3 rounded-[6px] border border-border bg-card p-4 shadow-[var(--shadow-sm)]">
      <div className="flex shrink-0 items-center gap-2">
        <FarmMapIcon className="h-4 w-4 text-ink-soft" />
        <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">GIS map</span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden rounded-[6px] border border-border">
        <MapContainer center={centerOf(farms)} zoom={14} className="h-full w-full">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
            maxZoom={19}
          />
          {pinned.map((farm) => {
            const active = farm.id === selectedFarm?.id;
            return (
              <CircleMarker
                key={farm.id}
                center={[farm.lat, farm.lng]}
                radius={active ? 12 : 8}
                pathOptions={{
                  // White stroke so pins stay legible over the ESRI satellite imagery's
                  // busy greens/browns, not just the flat road-map background they replaced.
                  color: "#ffffff",
                  fillColor: farm.status === "active" ? "var(--color-success)" : "var(--color-dot-muted)",
                  fillOpacity: 0.95,
                  weight: active ? 3 : 2,
                }}
                eventHandlers={{ click: () => onSelectFarm(farm.id) }}
              >
                <Popup>
                  <strong>{farm.farmerName}</strong>
                  <br />
                  {farm.barangay} · {farm.crop} · {farm.areaHa.toFixed(1)} ha
                  <br />
                  Status: {farm.status}
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-ink-soft">
          <i className="inline-block h-1.5 w-1.5 rounded-full bg-success" /> Active
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-ink-soft">
          <i className="inline-block h-1.5 w-1.5 rounded-full bg-dot-muted" /> Inactive
        </span>
      </div>
    </div>
  );
}
