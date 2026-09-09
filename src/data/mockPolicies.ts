import type { InsurancePolicy } from "../types";

/** One record per farm, seeded at registration time — Phase 1 of the PCIC
 * lifecycle. Opt-in/opt-out is a one-time decision made here, not something
 * revisited per disaster. A handful of farms are seeded opted-out on purpose,
 * so the app can answer "what about farmers who don't want to be insured"
 * without needing a built registration flow. */
export const POLICIES: InsurancePolicy[] = [
  { id: "pol-1", farmId: "farm-1", status: "active", policyNo: "PCIC-2026-330142", crop: "Rice", plantingDateLabel: "Jun 03, 2026", baselineImageDateLabel: "Jun 05, 2026", registeredDateLabel: "Jun 03, 2026" },
  { id: "pol-2", farmId: "farm-2", status: "active", policyNo: "PCIC-2026-330158", crop: "Rice", plantingDateLabel: "Jun 05, 2026", baselineImageDateLabel: "Jun 08, 2026", registeredDateLabel: "Jun 05, 2026" },
  { id: "pol-3", farmId: "farm-3", status: "active", policyNo: "PCIC-2026-330171", crop: "Corn", plantingDateLabel: "May 28, 2026", baselineImageDateLabel: "May 30, 2026", registeredDateLabel: "May 28, 2026" },
  { id: "pol-4", farmId: "farm-4", status: "active", policyNo: "PCIC-2026-330184", crop: "Rice", plantingDateLabel: "Jun 02, 2026", baselineImageDateLabel: "Jun 04, 2026", registeredDateLabel: "Jun 02, 2026" },
  { id: "pol-5", farmId: "farm-5", status: "active", policyNo: "PCIC-2026-330199", crop: "Vegetables", plantingDateLabel: "Jul 14, 2026", baselineImageDateLabel: "Jul 16, 2026", registeredDateLabel: "Jul 14, 2026" },
  { id: "pol-6", farmId: "farm-6", status: "active", policyNo: "PCIC-2026-330205", crop: "Rice", plantingDateLabel: "Jun 06, 2026", baselineImageDateLabel: "Jun 08, 2026", registeredDateLabel: "Jun 06, 2026" },
  { id: "pol-7", farmId: "farm-7", status: "active", policyNo: "PCIC-2026-330218", crop: "Rice", plantingDateLabel: "Jun 01, 2026", baselineImageDateLabel: "Jun 03, 2026", registeredDateLabel: "Jun 01, 2026" },
  { id: "pol-8", farmId: "farm-8", status: "active", policyNo: "PCIC-2026-330227", crop: "Rice", plantingDateLabel: "Jun 09, 2026", baselineImageDateLabel: "Jun 11, 2026", registeredDateLabel: "Jun 09, 2026" },
  { id: "pol-9", farmId: "farm-9", status: "opted-out" },
  { id: "pol-10", farmId: "farm-10", status: "active", policyNo: "PCIC-2026-330233", crop: "Vegetables", plantingDateLabel: "Jul 20, 2026", baselineImageDateLabel: "Jul 22, 2026", registeredDateLabel: "Jul 20, 2026" },
  { id: "pol-11", farmId: "farm-11", status: "opted-out" },
  { id: "pol-12", farmId: "farm-12", status: "active", policyNo: "PCIC-2026-330249", crop: "Rice", plantingDateLabel: "Jun 04, 2026", baselineImageDateLabel: "Jun 06, 2026", registeredDateLabel: "Jun 04, 2026" },
  { id: "pol-13", farmId: "farm-13", status: "opted-out" },
  { id: "pol-14", farmId: "farm-14", status: "opted-out" },
];

export function getPolicy(farmId: string): InsurancePolicy | undefined {
  return POLICIES.find((p) => p.farmId === farmId);
}
