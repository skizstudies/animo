import { ACTIVE_HAZARD } from "../../data/mockInsurance";
import { DAMAGE_REPORT_RECIPIENT, DAMAGE_REPORT_SECTIONS } from "../../data/mockRecovery";
import type { DamageReportSection } from "../../types";

// What the cooperative officer would plausibly have answered on Recovery's
// gap prompts by the time this reaches the LGU — same content, read-only here.
const GAP_ANSWERS: Record<string, { content: string; dateLabel: string; timeLabel: string }> = {
  s3: {
    content: "An estimated 12 families have been temporarily displaced and require transitional shelter assistance.",
    dateLabel: "Sep 06, 2026",
    timeLabel: "11:24 AM",
  },
  s4: {
    content: "Officer-reported market impact: the barangay's trading post was closed for approximately 2 days following the disaster.",
    dateLabel: "Sep 06, 2026",
    timeLabel: "11:31 AM",
  },
  s5: {
    content: "The cooperative has flagged clean water and food supplies as the most urgent relief need for the affected barangays.",
    dateLabel: "Sep 06, 2026",
    timeLabel: "11:36 AM",
  },
};

export const RECEIVED_REPORT_SECTIONS: DamageReportSection[] = DAMAGE_REPORT_SECTIONS.map((s) =>
  s.status === "needs-input" ? { ...s, ...GAP_ANSWERS[s.id] } : s,
);

export const RECEIVED_REPORT_META = {
  clusterId: ACTIVE_HAZARD.clusterId,
  hazardName: ACTIVE_HAZARD.name,
  recipient: DAMAGE_REPORT_RECIPIENT,
  referenceNo: "LGU-2026-702918",
  receivedLabel: "Received 2 hours ago",
};
