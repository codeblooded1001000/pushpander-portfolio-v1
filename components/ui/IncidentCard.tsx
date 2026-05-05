"use client";

import { useRef } from "react";
import StressMeter from "./StressMeter";
import { useViewportAward } from "@/hooks/useViewportAward";

interface IncidentData {
  id: string;
  severity: "SEV1" | "SEV2" | "SEV3";
  ttd: string;
  ttr: string;
  stress: number;
  title: string;
  whatHappened: string;
  impact: string;
  rootCause: string;
  whatIDid: string[];
  whatWeLearned: string;
}

interface IncidentCardProps {
  data: IncidentData;
  earn: (amount: number, capKey: string) => boolean;
}

export default function IncidentCard({ data, earn }: IncidentCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  useViewportAward(ref, `incident-${data.id}`, 20, 3000, { earn });

  const severityStyles = {
    SEV1: "bg-red text-cream",
    SEV2: "bg-mustard text-navy",
    SEV3: "bg-mustard/60 text-navy",
  };

  return (
    <div
      ref={ref}
      className="relative bg-paper border-4 border-navy shadow-[6px_6px_0_#0F2540] p-6 mb-6"
    >
      {data.severity === "SEV1" && (
        <div className="absolute top-4 right-4 border-[3px] border-red text-red font-pixel text-[9px] px-3 py-1 rotate-[8deg] opacity-80">
          URGENT
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span
          className={`font-pixel text-[9px] px-2 py-1 ${severityStyles[data.severity]}`}
        >
          {data.severity}
        </span>
        <span className="font-pixel text-[8px] text-brown">INC-{data.id}</span>
        <span className="font-mono text-sm text-navy-dark">TTD: {data.ttd}</span>
        <span className="font-mono text-sm text-navy-dark">TTR: {data.ttr}</span>
        <StressMeter level={data.stress} />
      </div>

      <h3 className="font-pixel text-[13px] text-navy mb-5 leading-relaxed pr-20">
        {data.title}
      </h3>

      <div className="space-y-4">
        <IncidentRow label="WHAT HAPPENED" content={data.whatHappened} />
        <IncidentRow label="IMPACT" content={data.impact} />
        <IncidentRow label="ROOT CAUSE" content={data.rootCause} />
        <div>
          <h4 className="font-pixel text-[9px] text-red border-l-4 border-red pl-3 mb-2">
            WHAT I DID
          </h4>
          <ol className="list-decimal list-inside space-y-1 pl-3 font-mono text-lg text-navy-dark">
            {data.whatIDid.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
        <IncidentRow label="WHAT WE LEARNED" content={data.whatWeLearned} />
      </div>
    </div>
  );
}

function IncidentRow({ label, content }: { label: string; content: string }) {
  return (
    <div>
      <h4 className="font-pixel text-[9px] text-red border-l-4 border-red pl-3 mb-2">
        {label}
      </h4>
      <p className="font-mono text-lg text-navy-dark pl-3">{content}</p>
    </div>
  );
}
