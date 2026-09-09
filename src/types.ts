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
  /** Real Sentinel-2 evidence from the GIS workstream — only populated for
   * farms with a live satellite reading, not every mock entry. */
  ndviMean?: number;
  ndviBaseline?: number;
  evidenceImagePath?: string;
}

export interface Farm {
  id: string;
  farmerName: string;
  barangay: string;
  crop: string;
  areaHa: number;
  status: "active" | "inactive";
  /** Real pin coordinates from the GIS workstream — only populated for
   * mapped parcels, not every mock entry. */
  lat?: number;
  lng?: number;
}

export type PipelineStage = "messaged" | "replied" | "consent" | "compiled" | "sent";

export interface ConversationMessage {
  id: string;
  from: "agent" | "farmer";
  text: string;
  timeLabel: string;
}

export interface StageLogEntry {
  stage: PipelineStage;
  dateLabel: string;
  timeLabel: string;
}

export interface InsuranceCase {
  id: string;
  farmId: string;
  farmerName: string;
  stage: PipelineStage;
  consented: boolean;
  messages: ConversationMessage[];
  /** One entry per stage reached so far, in order — the audit trail of when
   * each phase actually happened, not just what the current stage is. */
  log: StageLogEntry[];
  /** Set once the package is sent — either seeded already-sent, or filled in
   * client-side the moment an officer approves a compiled case. */
  referenceNo?: string;
}

export type PolicyStatus = "active" | "opted-out";

export interface InsurancePolicy {
  id: string;
  farmId: string;
  status: PolicyStatus;
  /** Set once, at registration — the moment the parcel was mapped and the
   * agent auto-drafted and submitted the Application for Crop Insurance
   * (ACI), months before any storm. Present only when status is "active";
   * an opted-out farmer never had one drafted. */
  policyNo?: string;
  crop?: string;
  plantingDateLabel?: string;
  baselineImageDateLabel?: string;
  registeredDateLabel?: string;
}

export type ReportStatus = "submitted" | "processing";

export interface ReportHistoryEntry {
  id: string;
  clusterId: string;
  hazardName: string;
  recipient: string;
  status: ReportStatus;
  /** Assigned once the LGU actually receives it — absent while "processing". */
  referenceNo?: string;
  receivedLabel: string;
  sections: DamageReportSection[];
}

export interface DamageReportSection {
  id: string;
  title: string;
  status: "ai-filled" | "needs-input";
  content?: string;
  prompt?: string;
  /** When the agent drafted this section (ai-filled only — needs-input
   * sections get their timestamp at answer time, not seeded). */
  dateLabel?: string;
  timeLabel?: string;
}
