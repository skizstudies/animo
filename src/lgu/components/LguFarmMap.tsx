import { useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FarmMapIcon } from "../../components/layout/icons";
import { LGU_FARMS } from "../data/mockLguFarms";

// Center of the wider Rosario, Batangas spread the LGU plots cover — not the
// tight co-op pilot cluster the cooperative dashboard's own map centers on.
const CENTER: [number, number] = [13.833, 121.213];

export function LguFarmMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const activeCount = LGU_FARMS.filter((f) => f.status === "active").length;
  const inactiveCount = LGU_FARMS.length - activeCount;

  return (
    <div className="flex flex-1 flex-col gap-3 rounded-[6px] border border-border bg-card p-4 shadow-[var(--shadow-sm)]">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FarmMapIcon className="h-4 w-4 text-ink-soft" />
          <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
            GIS map — municipality-wide
          </span>
        </div>
        <span className="font-mono text-[11px] text-ink-soft">
          {LGU_FARMS.length} plots monitored
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden rounded-[6px] border border-border">
        <MapContainer center={CENTER} zoom={11} className="h-full w-full">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
            maxZoom={19}
          />
          {LGU_FARMS.map((farm) => {
            const active = farm.id === selectedId;
            return (
              <CircleMarker
                key={farm.id}
                center={[farm.lat!, farm.lng!]}
                radius={active ? 11 : 7}
                pathOptions={{
                  color: "#ffffff",
                  fillColor: farm.status === "active" ? "var(--color-success)" : "var(--color-dot-muted)",
                  fillOpacity: 0.95,
                  weight: active ? 3 : 2,
                }}
                eventHandlers={{ click: () => setSelectedId(farm.id) }}
              >
                <Popup>
                  <strong>{farm.farmerName}</strong>
                  <br />
                  Brgy. {farm.barangay} · {farm.crop} · {farm.areaHa.toFixed(1)} ha
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
          <i className="inline-block h-1.5 w-1.5 rounded-full bg-success" /> {activeCount} active
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-ink-soft">
          <i className="inline-block h-1.5 w-1.5 rounded-full bg-dot-muted" /> {inactiveCount} inactive
        </span>
      </div>
    </div>
  );
}
