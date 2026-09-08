import type { BuyerGap, FarmerCandidate } from "../types";

export const BUYER_GAPS: BuyerGap[] = [
  {
    id: "g1",
    buyerName: "Jollibee Foods Corp.",
    crop: "Rice",
    orderedQtyT: 5.0,
    deliverableQtyT: 1.8,
    contractedFarmerName: "Mang Tomas Reyes",
    flaggedAgo: "2 hours ago",
    urgency: "high",
  },
  {
    id: "g2",
    buyerName: "SM Supermarts",
    crop: "Vegetables",
    orderedQtyT: 1.2,
    deliverableQtyT: 0.9,
    contractedFarmerName: "Rodel Manalo",
    flaggedAgo: "Yesterday",
    urgency: "medium",
  },
];

export const FARMER_CANDIDATES: FarmerCandidate[] = [
  { id: "c1", farmerName: "Bayani Ocampo", crop: "Rice", surplusT: 1.6, distanceKm: 3.2, reliabilityPct: 96 },
  { id: "c2", farmerName: "Corazon Dizon", crop: "Rice", surplusT: 2.1, distanceKm: 5.8, reliabilityPct: 89 },
  { id: "c3", farmerName: "Felipe Ramos", crop: "Rice", surplusT: 1.1, distanceKm: 1.4, reliabilityPct: 91 },
  { id: "c4", farmerName: "Marites Aquino", crop: "Corn", surplusT: 3.0, distanceKm: 2.0, reliabilityPct: 85 },
  { id: "c5", farmerName: "Josefina Lim", crop: "Vegetables", surplusT: 0.5, distanceKm: 2.6, reliabilityPct: 93 },
  { id: "c6", farmerName: "Danilo Torres", crop: "Vegetables", surplusT: 0.4, distanceKm: 4.1, reliabilityPct: 88 },
  { id: "c7", farmerName: "Wilhelmina Cruz", crop: "Rice", surplusT: 0.6, distanceKm: 7.5, reliabilityPct: 97 },
];
