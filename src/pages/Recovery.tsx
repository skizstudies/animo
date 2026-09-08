import { useMemo, useState } from "react";
import { GapContextBanner } from "../components/recovery/GapContextBanner";
import { GapList } from "../components/recovery/GapList";
import { MatchCard } from "../components/recovery/MatchCard";
import { BUYER_GAPS, FARMER_CANDIDATES } from "../data/mockRecovery";
import { rankMatches } from "../lib/scoreMatch";

type Step = "gaps" | "matches";

interface RecoveryProps {
  onViewFarm: (farmId: string) => void;
}

export function Recovery({ onViewFarm }: RecoveryProps) {
  const [step, setStep] = useState<Step>("gaps");
  const [selectedGapId, setSelectedGapId] = useState<string | null>(null);
  const [approvals, setApprovals] = useState<Record<string, string>>({});

  const selectedGap = BUYER_GAPS.find((g) => g.id === selectedGapId) ?? null;
  const matches = useMemo(() => (selectedGap ? rankMatches(selectedGap, FARMER_CANDIDATES) : []), [selectedGap]);

  function openGap(gapId: string) {
    setSelectedGapId(gapId);
    setStep("matches");
  }

  function approve(farmerId: string) {
    if (!selectedGap) return;
    setApprovals((prev) => ({ ...prev, [selectedGap.id]: farmerId }));
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1">
      {step === "gaps" || !selectedGap ? (
        <GapList gaps={BUYER_GAPS} approvals={approvals} onSelect={openGap} />
      ) : (
        <>
          <GapContextBanner gap={selectedGap} onBack={() => setStep("gaps")} />
          <div className="panel-corners flex flex-1 flex-col gap-3 rounded-[6px] border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
            <div className="shrink-0">
              <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">
                AI-ranked candidates
              </span>
              <h3 className="mt-0.5 text-[15px] font-extrabold text-ink">Cooperative farmers who can cover this</h3>
            </div>
            <div className="flex flex-col gap-2.5 overflow-y-auto">
              {matches.map((match, i) => (
                <MatchCard
                  key={match.farmer.id}
                  rank={i + 1}
                  match={match}
                  approved={approvals[selectedGap.id] === match.farmer.id}
                  disabled={Boolean(approvals[selectedGap.id]) && approvals[selectedGap.id] !== match.farmer.id}
                  onApprove={() => approve(match.farmer.id)}
                  onViewFarm={() => onViewFarm(match.farmer.farmId)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
