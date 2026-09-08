import type { PipelineStage } from "../types";

export const STAGE_ORDER: PipelineStage[] = ["messaged", "replied", "consent", "compiled", "sent"];

export const STAGE_LABEL: Record<PipelineStage, string> = {
  messaged: "Awaiting reply",
  replied: "Awaiting consent",
  consent: "Gathering evidence",
  compiled: "Ready for review",
  sent: "Sent to PCIC",
};
