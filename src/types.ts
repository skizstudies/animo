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

export type PipelineStage = "messaged" | "replied" | "consent" | "evidence" | "sent";

export interface ConversationMessage {
  id: string;
  from: "agent" | "farmer";
  text: string;
  timeLabel: string;
}

export interface InsuranceCase {
  id: string;
  farmId: string;
  farmerName: string;
  stage: PipelineStage;
  consented: boolean;
  messages: ConversationMessage[];
}

export interface DamageReportSection {
  id: string;
  title: string;
  status: "ai-filled" | "needs-input";
  content?: string;
  prompt?: string;
}
