import { ACTIVE_HAZARD } from "../../data/mockInsurance";
import { DAMAGE_REPORT_RECIPIENT, DAMAGE_REPORT_SECTIONS } from "../../data/mockRecovery";
import type { DamageReportSection } from "../../types";

// What the cooperative officer would plausibly have answered on Recovery's
// gap prompts by the time this reaches the LGU — same content, read-only here.
const GAP_ANSWERS: Record<string, string> = {
  s3: "An estimated 12 families have been temporarily displaced and require transitional shelter assistance.",
  s4: "Officer-reported market impact: the barangay's trading post was closed for approximately 2 days following the disaster.",
  s5: "The cooperative has flagged clean water and food supplies as the most urgent relief need for the affected barangays.",
};

export const RECEIVED_REPORT_SECTIONS: DamageReportSection[] = DAMAGE_REPORT_SECTIONS.map((s) =>
  s.status === "needs-input" ? { ...s, content: GAP_ANSWERS[s.id] } : s,
);

export const RECEIVED_REPORT_META = {
  clusterId: ACTIVE_HAZARD.clusterId,
  hazardName: ACTIVE_HAZARD.name,
  recipient: DAMAGE_REPORT_RECIPIENT,
  referenceNo: "LGU-2026-702918",
  receivedLabel: "Received 2 hours ago",
};
