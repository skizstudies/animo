import type { BuyerGap, FarmerCandidate, ScoredMatch } from "../types";

const WEIGHTS = { crop: 0.4, coverage: 0.3, reliability: 0.2, proximity: 0.1 };
const PROXIMITY_CAP_KM = 10;

function scoreOne(gap: BuyerGap, farmer: FarmerCandidate): ScoredMatch {
  const gapQtyT = gap.orderedQtyT - gap.deliverableQtyT;
  const cropMatch = farmer.crop === gap.crop;
  const coverage = Math.min(farmer.surplusT / gapQtyT, 1);
  const proximity = Math.max(0, 1 - farmer.distanceKm / PROXIMITY_CAP_KM);
  const reliability = farmer.reliabilityPct / 100;

  const raw =
    (cropMatch ? 1 : 0.15) * WEIGHTS.crop +
    coverage * WEIGHTS.coverage +
    reliability * WEIGHTS.reliability +
    proximity * WEIGHTS.proximity;

  const reasons = [
    cropMatch ? `Grows ${gap.crop}` : `Grows ${farmer.crop}, not ${gap.crop}`,
    `${farmer.surplusT.toFixed(1)}t surplus — covers ${Math.round(coverage * 100)}% of the ${gapQtyT.toFixed(1)}t gap`,
    `${farmer.reliabilityPct}% on-time fulfillment`,
    `${farmer.distanceKm.toFixed(1)}km from the cluster`,
  ];

  return { farmer, score: Math.round(raw * 100), reasons };
}

/** Ranks every candidate farmer against one buyer gap, best match first. */
export function rankMatches(gap: BuyerGap, candidates: FarmerCandidate[], limit = 4): ScoredMatch[] {
  return candidates
    .map((farmer) => scoreOne(gap, farmer))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
