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
  farmId: string;
  farmerName: string;
  crop: string;
  areaHa: number;
  estimatedLossPct: number;
}

export interface Farm {
  id: string;
  farmerName: string;
  barangay: string;
  crop: string;
  areaHa: number;
  status: "active" | "inactive";
}

export interface BuyerGap {
  id: string;
  buyerName: string;
  crop: string;
  orderedQtyT: number;
  deliverableQtyT: number;
  contractedFarmerName: string;
  flaggedAgo: string;
  urgency: "high" | "medium";
}

export interface FarmerCandidate {
  id: string;
  farmId: string;
  farmerName: string;
  crop: string;
  surplusT: number;
  distanceKm: number;
  reliabilityPct: number;
}

export interface ScoredMatch {
  farmer: FarmerCandidate;
  score: number;
  reasons: string[];
}
