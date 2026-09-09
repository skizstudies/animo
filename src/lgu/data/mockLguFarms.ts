import { FARMS } from "../../data/mockFarms";
import type { Farm } from "../../types";

/** Municipality-wide plots for the LGU's disaster monitoring view: the same
 * real, GIS-pinned farms the cooperative dashboard tracks (farm-1..farm-8),
 * plus additional simulated plots spread wider across real Rosario, Batangas
 * barangays — since the LGU needs to see risk across the whole municipality,
 * not just the co-op's onboarded farms. */
const COOP_FARMS = FARMS.filter((f): f is Farm & { lat: number; lng: number } => f.lat != null && f.lng != null);

const EXTRA_PLOTS: Farm[] = [
  { id: "lgu-1", farmerName: "Pedro Amurao", barangay: "Alupay", crop: "Rice", areaHa: 2.1, status: "active", lat: 13.798, lng: 121.183 },
  { id: "lgu-2", farmerName: "Julieta Mendoza", barangay: "Antipolo", crop: "Corn", areaHa: 1.6, status: "active", lat: 13.812, lng: 121.245 },
  { id: "lgu-3", farmerName: "Roberto Aguila", barangay: "Bagong Pook", crop: "Rice", areaHa: 3.0, status: "active", lat: 13.870, lng: 121.198 },
  { id: "lgu-4", farmerName: "Nenita Bautista", barangay: "Balibago", crop: "Vegetables", areaHa: 0.8, status: "active", lat: 13.856, lng: 121.148 },
  { id: "lgu-5", farmerName: "Armando Salazar", barangay: "Baybayin", crop: "Rice", areaHa: 1.9, status: "inactive", lat: 13.788, lng: 121.222 },
  { id: "lgu-6", farmerName: "Consuelo Ramirez", barangay: "Bayawang", crop: "Corn", areaHa: 2.4, status: "active", lat: 13.902, lng: 121.233 },
  { id: "lgu-7", farmerName: "Teodoro Espino", barangay: "Bulihan", crop: "Rice", areaHa: 2.7, status: "active", lat: 13.833, lng: 121.268 },
  { id: "lgu-8", farmerName: "Marilou Castillo", barangay: "Cahigam", crop: "Vegetables", areaHa: 0.7, status: "active", lat: 13.865, lng: 121.259 },
  { id: "lgu-9", farmerName: "Vicente Marasigan", barangay: "Calantas", crop: "Rice", areaHa: 1.4, status: "active", lat: 13.795, lng: 121.147 },
  { id: "lgu-10", farmerName: "Loreto Mercado", barangay: "Camp Vicente Lim", crop: "Corn", areaHa: 2.2, status: "active", lat: 13.878, lng: 121.276 },
  { id: "lgu-11", farmerName: "Herminia Alcantara", barangay: "Colongan", crop: "Rice", areaHa: 1.1, status: "inactive", lat: 13.762, lng: 121.201 },
  { id: "lgu-12", farmerName: "Rogelio Buendia", barangay: "Del Pilar", crop: "Vegetables", areaHa: 0.9, status: "active", lat: 13.821, lng: 121.158 },
];

export const LGU_FARMS: Farm[] = [...COOP_FARMS, ...EXTRA_PLOTS];
