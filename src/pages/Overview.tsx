import { useState } from "react";
import { InsuranceIcon, PrinterIcon, RecoveryIcon, SendIcon, ShieldIcon, UsersIcon } from "../components/layout/icons";
import { StatBreakdownModal } from "../components/overview/StatBreakdownModal";
import { StatTile } from "../components/overview/StatTile";
import { FARMS } from "../data/mockFarms";
import { INSURANCE_CASES } from "../data/mockInsurance";
import { getPolicy, POLICIES } from "../data/mockPolicies";
import { REPORT_HISTORY } from "../data/mockReportsHistory";
import { STAGE_LABEL } from "../data/pipelineStages";
import type { PipelineStage } from "../types";

export function Overview() {
  const [showNolBreakdown, setShowNolBreakdown] = useState(false);
  const activeFarmers = FARMS.filter((f) => f.status === "active").length;

  const insuredCount = POLICIES.filter((p) => p.status === "active").length;
  const optedOutCount = POLICIES.filter((p) => p.status === "opted-out").length;

  const submittedReports = REPORT_HISTORY.filter((r) => r.status === "submitted").length;
  const processingReports = REPORT_HISTORY.filter((r) => r.status === "processing").length;

  const nolCases = INSURANCE_CASES.filter((c) => getPolicy(c.farmId)?.status === "active");
  const pendingReview = nolCases.filter((c) => c.stage === "compiled").length;
  const stageCounts = (Object.keys(STAGE_LABEL) as PipelineStage[])
    .map((stage) => ({ stage, count: nolCases.filter((c) => c.stage === stage).length }))
    .filter((s) => s.count > 0);

  return (
    <div id="print-area" className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
      <div className="panel-corners flex shrink-0 flex-wrap items-center gap-4 rounded-[6px] border border-border bg-card px-5 py-4 shadow-[var(--shadow-sm)]">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[10px] bg-sidebar">
          <img src="/animo-logo.png" alt="ANIMO" className="h-full w-full object-contain" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-[18.5px] font-extrabold text-ink">ANIMO</h1>
          <p className="text-[14.5px] text-ink-soft">Agentic AI orchestrating PCIC insurance and LGU disaster reporting for farming cooperatives.</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-[20px] bg-warning/14 px-3 py-1.5 font-mono text-[12px] font-bold text-text-warn">
            <InsuranceIcon className="h-3.5 w-3.5" /> Insurance
          </span>
          <span className="flex items-center gap-1.5 rounded-[20px] bg-success/12 px-3 py-1.5 font-mono text-[12px] font-bold text-text-success">
            <RecoveryIcon className="h-3.5 w-3.5" /> Reports
          </span>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="no-print flex shrink-0 items-center gap-2 rounded-[4px] border border-border bg-bg px-3.5 py-2.5 font-mono text-[12.5px] font-bold text-ink-soft hover:bg-hover hover:text-ink"
        >
          <PrinterIcon className="h-3.5 w-3.5" />
          Print / Save as PDF
        </button>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-4">
        <StatTile icon={UsersIcon} value={activeFarmers} label="Active farmers" accent="tech" caption={`${FARMS.length} parcels mapped`} />
        <StatTile
          icon={ShieldIcon}
          value={insuredCount}
          label="Insurances approved"
          accent="success"
          caption={`${optedOutCount} opted out at registration`}
        />
        <StatTile
          icon={RecoveryIcon}
          value={submittedReports}
          label="Reports submitted to LGU"
          accent="success"
          caption={`${processingReports} still processing`}
        />
        <StatTile
          icon={SendIcon}
          value={pendingReview}
          label="Notice of Loss — awaiting review"
          accent="warning"
          caption={`${nolCases.length} cases in the pipeline — tap for the breakdown`}
          onClick={() => setShowNolBreakdown(true)}
        />
      </div>

      {showNolBreakdown && (
        <StatBreakdownModal
          title="Notice of Loss pipeline"
          rows={stageCounts.map(({ stage, count }) => ({ label: STAGE_LABEL[stage], count }))}
          onClose={() => setShowNolBreakdown(false)}
        />
      )}
    </div>
  );
}
