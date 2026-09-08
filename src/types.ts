export type PageId = "overview" | "insurance" | "recovery" | "farm-map";

export interface NavItem {
  id: PageId;
  label: string;
  subtitle: string;
}

export interface HazardEvent {
  id: string;
  name: string;
  signal: number;
  dateISO: string;
  clusterName: string;
  clusterId: string;
  source: string;
  preImageDate: string;
  postImageDate: string;
}

export interface AffectedFarm {
  id: string;
  farmerName: string;
  crop: string;
  areaHa: number;
  estimatedLossPct: number;
}
