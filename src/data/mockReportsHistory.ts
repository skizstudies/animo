import type { DamageReportSection, ReportHistoryEntry } from "../types";
import { ACTIVE_HAZARD } from "./mockInsurance";
import { DAMAGE_REPORT_RECIPIENT, DAMAGE_REPORT_SECTIONS } from "./mockRecovery";

/** Shared across two views: Overview's "reports submitted vs. still processing"
 * stat, and the LGU dashboard's report inbox. One fixture, two consumers,
 * instead of two disconnected mock-data hacks. */

// The live-demo report (Cluster 4 / Typhoon Kristine) — what the cooperative
// officer would plausibly have answered on Recovery's gap prompts by the time
// this reaches the LGU. Read-only here; Recovery.tsx's own interactive state
// is what actually drives the live gap-filling walkthrough.
const KRISTINE_GAP_ANSWERS: Record<string, { content: string; dateLabel: string; timeLabel: string }> = {
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

const KRISTINE_SECTIONS: DamageReportSection[] = DAMAGE_REPORT_SECTIONS.map((s) =>
  s.status === "needs-input" ? { ...s, ...KRISTINE_GAP_ANSWERS[s.id] } : s,
);

const BASYANG_SECTIONS: DamageReportSection[] = [
  {
    id: "basyang-s1",
    title: "Affected Area Summary",
    status: "ai-filled",
    content:
      "Cluster BTG-DP-02 (Dela Paz) sustained wind and flood damage from Typhoon Basyang (Signal No. 1), confirmed via Sentinel-2 change detection. 4 farms across Rice and Vegetables are affected.",
    dateLabel: "Sep 03, 2026",
    timeLabel: "09:40 AM",
  },
  {
    id: "basyang-s2",
    title: "Estimated Agricultural Loss",
    status: "ai-filled",
    content: "Combined average estimated crop loss across affected farms is 22%, covering 5.1 hectares.",
    dateLabel: "Sep 03, 2026",
    timeLabel: "09:42 AM",
  },
  {
    id: "basyang-s3",
    title: "Immediate Assistance Needed",
    status: "ai-filled",
    content: "The cooperative flagged seedling replacement as the most urgent relief need for the affected barangay.",
    dateLabel: "Sep 03, 2026",
    timeLabel: "10:05 AM",
  },
];

const ROSAL_SECTIONS: DamageReportSection[] = [
  {
    id: "rosal-s1",
    title: "Affected Area Summary",
    status: "ai-filled",
    content:
      "Cluster BTG-SJ-06 (San Jose) sustained crop damage from Tropical Storm Rosal (Signal No. 1), confirmed via Sentinel-2 change detection. 3 farms across Rice and Corn are affected.",
    dateLabel: "Sep 01, 2026",
    timeLabel: "02:12 PM",
  },
  {
    id: "rosal-s2",
    title: "Estimated Agricultural Loss",
    status: "ai-filled",
    content: "Combined average estimated crop loss across affected farms is 15%, covering 3.6 hectares.",
    dateLabel: "Sep 01, 2026",
    timeLabel: "02:14 PM",
  },
  {
    id: "rosal-s3",
    title: "Immediate Assistance Needed",
    status: "ai-filled",
    content: "No displacement reported — the cooperative flagged fertilizer support as the only follow-up request.",
    dateLabel: "Sep 01, 2026",
    timeLabel: "02:30 PM",
  },
];

const MARILYN_SECTIONS: DamageReportSection[] = [
  {
    id: "marilyn-s1",
    title: "Affected Area Summary",
    status: "ai-filled",
    content: "Cluster BTG-BG-01 (Balagtas) flagged for monitoring following Signal No. 1 advisories overnight.",
    dateLabel: "Sep 08, 2026",
    timeLabel: "07:15 AM",
  },
  { id: "marilyn-s2", title: "Displaced Families", status: "needs-input", prompt: "How many families have been temporarily displaced or relocated?" },
  { id: "marilyn-s3", title: "Immediate Assistance Needed", status: "needs-input", prompt: "What's the most urgent relief need right now?" },
];

export const REPORT_HISTORY: ReportHistoryEntry[] = [
  {
    id: "report-kristine",
    clusterId: ACTIVE_HAZARD.clusterId,
    hazardName: ACTIVE_HAZARD.name,
    recipient: DAMAGE_REPORT_RECIPIENT,
    status: "submitted",
    referenceNo: "LGU-2026-702918",
    receivedLabel: "Received 2 hours ago",
    sections: KRISTINE_SECTIONS,
  },
  {
    id: "report-basyang",
    clusterId: "BTG-DP-02",
    hazardName: "Typhoon Basyang",
    recipient: DAMAGE_REPORT_RECIPIENT,
    status: "submitted",
    referenceNo: "LGU-2026-688021",
    receivedLabel: "Received 3 days ago",
    sections: BASYANG_SECTIONS,
  },
  {
    id: "report-rosal",
    clusterId: "BTG-SJ-06",
    hazardName: "Tropical Storm Rosal",
    recipient: DAMAGE_REPORT_RECIPIENT,
    status: "submitted",
    referenceNo: "LGU-2026-671355",
    receivedLabel: "Received 1 week ago",
    sections: ROSAL_SECTIONS,
  },
  {
    id: "report-marilyn",
    clusterId: "BTG-BG-01",
    hazardName: "Signal No. 1 advisory",
    recipient: DAMAGE_REPORT_RECIPIENT,
    status: "processing",
    receivedLabel: "Awaiting cooperative submission",
    sections: MARILYN_SECTIONS,
  },
];
