import type { AffectedFarm, HazardEvent, InsuranceCase } from "../types";

export const ACTIVE_HAZARD: HazardEvent = {
  id: "h-kristine",
  name: "Typhoon Kristine",
  signal: 2,
  dateISO: "2026-09-06",
  clusterName: "Cluster 4 — Alangilan & Balagtas",
  clusterId: "BTG-AL-04",
  source: "pagasa.dost.gov.ph",
  preImageDate: "28 Aug 2026",
  postImageDate: "07 Sep 2026",
};

export const AFFECTED_FARMS: AffectedFarm[] = [
  { id: "f1", farmId: "farm-1", farmerName: "Mang Tomas Reyes", crop: "Rice", areaHa: 2.4, estimatedLossPct: 62 },
  { id: "f2", farmId: "farm-2", farmerName: "Aling Puring Santos", crop: "Rice", areaHa: 1.8, estimatedLossPct: 45 },
  { id: "f3", farmId: "farm-3", farmerName: "Ernesto Villar", crop: "Corn", areaHa: 3.1, estimatedLossPct: 38 },
  { id: "f4", farmId: "farm-4", farmerName: "Ligaya Cruz", crop: "Rice", areaHa: 1.2, estimatedLossPct: 71 },
  { id: "f5", farmId: "farm-5", farmerName: "Rodel Manalo", crop: "Vegetables", areaHa: 0.9, estimatedLossPct: 25 },
];

/** Each farmer's agent-run consent + evidence pipeline. Different farmers sit at
 * different real stages — nobody triggered any of this from the dashboard. */
export const INSURANCE_CASES: InsuranceCase[] = [
  {
    id: "case-1",
    farmId: "farm-1",
    farmerName: "Mang Tomas Reyes",
    stage: "compiled",
    consented: true,
    messages: [
      { id: "m1", from: "agent", text: "Kumusta po kayo, Mang Tomas? Nakita namin sa satellite na tumama ang bagyo sa lugar niyo.", timeLabel: "10:14 AM" },
      { id: "m2", from: "farmer", text: "Ayos lang po kami, pero nasira po yung bukid namin.", timeLabel: "10:22 AM" },
      { id: "m3", from: "agent", text: "Pasensya na po. Gusto niyo po ba na i-file namin ang insurance claim niyo sa PCIC? Kami na po ang bahala sa mga papeles.", timeLabel: "10:23 AM" },
      { id: "m4", from: "farmer", text: "Opo, sige po.", timeLabel: "10:31 AM" },
      { id: "m5", from: "agent", text: "Salamat po! Nakumpleto na po namin ang mga dokumento at satellite evidence ng bukid niyo. Puwede na po kayong pumunta sa amin para i-verify bago namin ipadala sa PCIC.", timeLabel: "11:02 AM" },
    ],
    log: [
      { stage: "messaged", dateLabel: "Sep 06, 2026", timeLabel: "10:14 AM" },
      { stage: "replied", dateLabel: "Sep 06, 2026", timeLabel: "10:22 AM" },
      { stage: "consent", dateLabel: "Sep 06, 2026", timeLabel: "10:23 AM" },
      { stage: "compiled", dateLabel: "Sep 06, 2026", timeLabel: "11:02 AM" },
    ],
  },
  {
    id: "case-2",
    farmId: "farm-4",
    farmerName: "Ligaya Cruz",
    stage: "sent",
    consented: true,
    referenceNo: "PCIC-2026-551204",
    messages: [
      { id: "m1", from: "agent", text: "Kumusta po kayo, Aling Ligaya? Malubha ang tama ng bagyo sa Balagtas.", timeLabel: "09:40 AM" },
      { id: "m2", from: "farmer", text: "Grabe po talaga, halos lahat po ng palay namin nasira.", timeLabel: "09:52 AM" },
      { id: "m3", from: "agent", text: "Pasensya po talaga. Papayag po ba kayo na i-file namin agad ang claim niyo sa PCIC?", timeLabel: "09:53 AM" },
      { id: "m4", from: "farmer", text: "Opo, kailangan na namin agad.", timeLabel: "09:58 AM" },
      { id: "m5", from: "agent", text: "Naipadala na po ang inyong claim sa PCIC kasama ang satellite evidence. Aabisuhan namin kayo pag may update.", timeLabel: "10:20 AM" },
    ],
    log: [
      { stage: "messaged", dateLabel: "Sep 06, 2026", timeLabel: "09:40 AM" },
      { stage: "replied", dateLabel: "Sep 06, 2026", timeLabel: "09:52 AM" },
      { stage: "consent", dateLabel: "Sep 06, 2026", timeLabel: "09:53 AM" },
      { stage: "compiled", dateLabel: "Sep 06, 2026", timeLabel: "10:15 AM" },
      { stage: "sent", dateLabel: "Sep 06, 2026", timeLabel: "10:20 AM" },
    ],
  },
  {
    id: "case-3",
    farmId: "farm-2",
    farmerName: "Aling Puring Santos",
    stage: "consent",
    consented: true,
    messages: [
      { id: "m1", from: "agent", text: "Kumusta po kayo, Aling Puring? Kumusta ang bukid niyo matapos ang bagyo?", timeLabel: "10:05 AM" },
      { id: "m2", from: "farmer", text: "Medyo nasira po pero hindi masyadong grabe.", timeLabel: "10:18 AM" },
      { id: "m3", from: "agent", text: "Salamat sa update. Gusto niyo po ba na i-file namin ang insurance claim niyo?", timeLabel: "10:19 AM" },
      { id: "m4", from: "farmer", text: "Opo, pwede po.", timeLabel: "10:27 AM" },
    ],
    log: [
      { stage: "messaged", dateLabel: "Sep 06, 2026", timeLabel: "10:05 AM" },
      { stage: "replied", dateLabel: "Sep 06, 2026", timeLabel: "10:18 AM" },
      { stage: "consent", dateLabel: "Sep 06, 2026", timeLabel: "10:27 AM" },
    ],
  },
  {
    id: "case-4",
    farmId: "farm-3",
    farmerName: "Ernesto Villar",
    stage: "replied",
    consented: false,
    messages: [
      { id: "m1", from: "agent", text: "Kumusta po kayo, Mang Ernesto? Kumusta ang mais niyo matapos ang bagyo?", timeLabel: "10:10 AM" },
      { id: "m2", from: "farmer", text: "Nasira po yung ilang bahagi, pero okay pa yung iba.", timeLabel: "10:34 AM" },
    ],
    log: [
      { stage: "messaged", dateLabel: "Sep 06, 2026", timeLabel: "10:10 AM" },
      { stage: "replied", dateLabel: "Sep 06, 2026", timeLabel: "10:34 AM" },
    ],
  },
  {
    id: "case-5",
    farmId: "farm-5",
    farmerName: "Rodel Manalo",
    stage: "messaged",
    consented: false,
    messages: [
      { id: "m1", from: "agent", text: "Kumusta po kayo, Mang Rodel? Naapektuhan po ba ang gulay niyo ng bagyo?", timeLabel: "10:16 AM" },
    ],
    log: [{ stage: "messaged", dateLabel: "Sep 06, 2026", timeLabel: "10:16 AM" }],
  },
];
