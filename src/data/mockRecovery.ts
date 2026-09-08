import type { DamageReportSection } from "../types";
import { ACTIVE_HAZARD, AFFECTED_FARMS } from "./mockInsurance";

export const DAMAGE_REPORT_RECIPIENT = "Municipal Disaster Risk Reduction Office — Batangas";

/** Same cluster, same farms as Insurance's evidence pull — one hazard trigger
 * feeding two coordinated agent workflows. */
export const DAMAGE_REPORT_FARM_IDS: string[] = AFFECTED_FARMS.map((f) => f.farmId);

/** The agent drafts what it can determine from shared cluster/hazard data.
 * What's left needs a short answer from the cooperative officer, not a form. */
export const DAMAGE_REPORT_SECTIONS: DamageReportSection[] = [
  {
    id: "s1",
    title: "Affected Area Summary",
    status: "ai-filled",
    content: `Cluster ${ACTIVE_HAZARD.clusterId} (${ACTIVE_HAZARD.clusterName}) sustained crop damage from ${ACTIVE_HAZARD.name} (Signal No. ${ACTIVE_HAZARD.signal}), confirmed via Sentinel-2 passes on ${ACTIVE_HAZARD.preImageDate} and ${ACTIVE_HAZARD.postImageDate}. 5 farms across Rice, Corn, and Vegetables are affected.`,
    dateLabel: "Sep 06, 2026",
    timeLabel: "11:10 AM",
  },
  {
    id: "s2",
    title: "Estimated Agricultural Loss",
    status: "ai-filled",
    content:
      "Combined average estimated crop loss across affected farms is 48%, covering 9.4 hectares — see the attached PCIC evidence package for the per-farm breakdown.",
    dateLabel: "Sep 06, 2026",
    timeLabel: "11:12 AM",
  },
  {
    id: "s3",
    title: "Displaced Families",
    status: "needs-input",
    prompt: "How many families have been temporarily displaced or relocated?",
  },
  {
    id: "s4",
    title: "Local Trade & Market Impact",
    status: "needs-input",
    prompt: "Any immediate impact on the local palengke or trading post you're aware of?",
  },
  {
    id: "s5",
    title: "Immediate Assistance Needed",
    status: "needs-input",
    prompt: "What's the most urgent relief need right now — food, water, shelter, or something else?",
  },
];
