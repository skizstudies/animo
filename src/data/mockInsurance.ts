import type { AffectedFarm, HazardEvent } from "../types";

export const ACTIVE_HAZARD: HazardEvent = {
  id: "h-kristine",
  name: "Typhoon Kristine",
  signal: 2,
  dateISO: "2026-09-06",
  clusterName: "Cluster 4 — Barangay Alangilan",
  clusterId: "BTG-AL-04",
  source: "pagasa.dost.gov.ph",
  preImageDate: "28 Aug 2026",
  postImageDate: "07 Sep 2026",
};

export const AFFECTED_FARMS: AffectedFarm[] = [
  { id: "f1", farmerName: "Mang Tomas Reyes", crop: "Rice", areaHa: 2.4, estimatedLossPct: 62 },
  { id: "f2", farmerName: "Aling Puring Santos", crop: "Rice", areaHa: 1.8, estimatedLossPct: 45 },
  { id: "f3", farmerName: "Ernesto Villar", crop: "Corn", areaHa: 3.1, estimatedLossPct: 38 },
  { id: "f4", farmerName: "Ligaya Cruz", crop: "Rice", areaHa: 1.2, estimatedLossPct: 71 },
  { id: "f5", farmerName: "Rodel Manalo", crop: "Vegetables", areaHa: 0.9, estimatedLossPct: 25 },
];
