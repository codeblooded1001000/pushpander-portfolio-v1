"use client";

import { useRef } from "react";
import IncidentCard from "@/components/ui/IncidentCard";
import { useViewportAward } from "@/hooks/useViewportAward";

interface IncidentsProps {
  earn: (amount: number, capKey: string) => boolean;
}

const incidents = [
  {
    id: "001",
    severity: "SEV1" as const,
    ttd: "8m",
    ttr: "42m",
    stress: 9,
    title: "Payment reconciliation pipeline silently dropped 3% of Easebuzz webhook events",
    whatHappened:
      "Our reconciliation job stopped marking ~3% of successful Easebuzz transactions as settled. Payments completed on gateway, but our system kept them as pending and users received duplicate reminders.",
    impact:
      "~75 transactions/day were misclassified for 3 days before alerts. Around Rs.4.2L looked unreconciled, support tickets rose by ~40%, and user trust took a hit even though no money was actually lost.",
    rootCause:
      "Easebuzz changed webhook field casing in a minor SDK update (`paymentStatus` to `payment_status`). Our parser lacked fallback mapping; failures were logged but not alerted, so signal got buried.",
    whatIDid: [
      "Cut off auto-retry reminders to stop spamming users.",
      "Ran a one-off backfill script over raw webhook payloads from S3 archive and reconciled against Postgres.",
      "Added PagerDuty schema-validation alert if parse failures exceed 0.5% in any 5-minute window.",
      "Published customer communication through support within 2 hours of resolution.",
    ],
    whatWeLearned:
      "Parse-failure logs without alerting create fake confidence. Every external integration now has a parse-failure SLI with a hard threshold.",
  },
  {
    id: "002",
    severity: "SEV2" as const,
    ttd: "2m",
    ttr: "18m",
    stress: 6,
    title: "Webhook retry storm DDOSed our own service during a partner outage",
    whatHappened:
      "A downstream partner API went down for 11 minutes. Our unbounded retry logic stacked retries and then burst 12K queued attempts in 90 seconds when service recovered.",
    impact:
      "Partner-dependent flows saw 18 minutes of effective downtime. RabbitMQ queue depth spiked 40x; there was no data loss but recovery extended due to self-inflicted throttling.",
    rootCause:
      "Retry strategy had exponential backoff but no jitter, no max attempts, and no circuit breaker. Failures kept amplifying traffic while dependency remained down.",
    whatIDid: [
      "Paused webhook consumers in RabbitMQ to stop storm expansion.",
      "Drained dead-letter queue to a holding table for controlled replay.",
      "Restored traffic gradually (10% to 50% to 100% over 15 minutes).",
      "Shipped circuit breaker with bulkhead + jitter; capped retries at 5.",
    ],
    whatWeLearned:
      "Retries without circuit breakers amplify dependency outages. Bulkheads and bounded retries are now defaults for partner integrations.",
  },
  {
    id: "003",
    severity: "SEV1" as const,
    ttd: "31m",
    ttr: "47m",
    stress: 10,
    title: "Multi-tenant adapter leaked partial inventory data across tenants for 47 minutes",
    whatHappened:
      "A routing refactor in our GMS inventory adapter caused some `getInventoryByLocation` reads to resolve against the wrong tenant schema. Tenant A could briefly see line items from Tenant B.",
    impact:
      "6 tenants were affected and around 200-300 line items were exposed read-only. No write corruption occurred, but disclosures were required for enterprise clients plus a security review.",
    rootCause:
      "Tenant context moved from request scope to a singleton cache of last seen tenant for perceived performance gains. Under concurrency, stale tenant IDs leaked across requests on the same Node worker.",
    whatIDid: [
      "Reverted the offending commit immediately after pattern confirmation in logs.",
      "Extracted affected request IDs and mapped exposure per tenant.",
      "Partnered with compliance to draft disclosures for impacted enterprise tenants.",
      "Replaced singleton helper with AsyncLocalStorage request scoping.",
      "Added integration test: 200 concurrent requests across 5 tenants with zero cross-contamination assertion.",
    ],
    whatWeLearned:
      "Tenant context is security-critical state and must remain request-scoped. Any performance optimization touching tenant scoping now goes through security-sensitive review.",
  },
  {
    id: "004",
    severity: "SEV3" as const,
    ttd: "12m",
    ttr: "90m",
    stress: 4,
    title: "RabbitMQ queue grew unbounded during a traffic spike from fleet sync",
    whatHappened:
      "A scheduled bulk fleet sync started during a manual backfill. Producers outran consumers and telemetry queue depth climbed from ~500 to ~480K in about 25 minutes.",
    impact:
      "No data loss due to durable RabbitMQ queues, but consumer lag reached 22 minutes and broker disk usage rose from 18% to 71%. Real-time dashboards lagged for roughly 90 minutes.",
    rootCause:
      "Two heavy workloads collided against consumers sized for steady-state traffic. Producer-side backpressure and queue-depth autoscaling were missing.",
    whatIDid: [
      "Scaled consumer deployment 3x to process backlog faster.",
      "Paused backfill job until spike passed.",
      "Monitored broker disk closely and prepared failover if usage crossed 85%.",
      "Added producer-side rate limit for bulk sync and queue-depth autoscaler for consumers.",
    ],
    whatWeLearned:
      "Steady-state capacity planning is not enough for bursty systems. Backfills now avoid peak fleet-write windows and rate limits protect queue health.",
  },
];

const playbook = [
  "Acknowledge alert within 5 min",
  "Communicate in #incidents Slack",
  "Mitigate before finding root cause",
  "Page in help early, not late",
  "Blameless post-mortem within 48h",
  "Track action items to completion",
];

export default function Incidents({ earn }: IncidentsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useViewportAward(sectionRef, "section-incidents", 5, 0, { earn });

  return (
    <section
      id="incidents"
      ref={sectionRef}
      className="py-20 px-8 max-w-[1280px] mx-auto relative overflow-hidden"
    >
      {/* Background fire flicker */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none animate-flicker bg-[radial-gradient(ellipse_at_bottom,_rgba(200,68,61,0.2)_0%,_transparent_70%)]" />

      <div className="flex items-center gap-6 mb-8 border-b-4 border-dashed border-navy pb-6">
        {/* Fire extinguisher SVG */}
        <svg
          viewBox="0 0 16 16"
          className="w-20 h-20 flex-shrink-0"
          shapeRendering="crispEdges"
        >
          <rect x="7" y="1" width="2" height="2" fill="#1B3A5C" />
          <rect x="6" y="3" width="4" height="1" fill="#1B3A5C" />
          <rect x="5" y="4" width="6" height="2" fill="#C8443D" />
          <rect x="5" y="6" width="6" height="6" fill="#C8443D" />
          <rect x="6" y="12" width="4" height="2" fill="#C8443D" />
          <rect x="7" y="14" width="2" height="1" fill="#1B3A5C" />
          <rect x="11" y="5" width="2" height="1" fill="#1B3A5C" />
          <rect x="12" y="5" width="1" height="3" fill="#1B3A5C" />
          <rect x="7" y="6" width="2" height="1" fill="#A33530" />
          <rect x="7" y="8" width="2" height="1" fill="#A33530" />
        </svg>
        <div>
          <h2 className="font-pixel text-[24px] text-navy">STRESS RELIEF</h2>
          <div className="font-typewriter text-brown text-[18px] mt-2">
            {"// when production catches fire, stay calm. unlike michael."}
          </div>
        </div>
      </div>

      {/* Intro band */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-[22px] animate-wobble inline-block">🔥</span>
        <p className="font-typewriter text-[22px] italic text-navy-dark">
          &ldquo;How I handle incidents, post-mortems, and 3 AM PagerDuty calls.&rdquo;
        </p>
        <span className="text-[22px] animate-wobble inline-block">🔥</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
        {/* Incident cards */}
        <div>
          {incidents.map((incident) => (
            <IncidentCard key={incident.id} data={incident} earn={earn} />
          ))}
        </div>

        {/* Sidebar — Playbook */}
        <div className="order-first lg:order-last">
          <div className="bg-paper border-4 border-navy shadow-[6px_6px_0_#0F2540] p-5 sticky top-[100px]">
            <h3 className="font-pixel text-[11px] text-navy mb-4 border-b-2 border-cream-dark pb-3">
              INCIDENT RESPONSE<br />PLAYBOOK
            </h3>
            <ul className="space-y-3">
              {playbook.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[16px] text-navy-dark"
                >
                  <span className="text-olive font-pixel text-[8px] mt-1 flex-shrink-0">
                    ✓
                  </span>
                  <span className="font-mono">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
