"use client";

import { useRef } from "react";
import { useViewportAward } from "@/hooks/useViewportAward";

interface ExperienceProps {
  earn: (amount: number, capKey: string) => boolean;
}

const experiences = [
  {
    company: "Alt Mobility",
    role: "Software Engineer",
    meta: "Feb 2024 – Present · Delhi, India",
    bullets: [
      "Architected event-driven inventory module for in-house GMS using RabbitMQ for bidirectional sync with third-party IMS. Used Postgres row versioning with optimistic locking plus Strategy/Factory adapters for multi-tenant orchestration. Cut operational cycle from 4 days to 1.5 days.",
      "Built real-time telemetry pipeline processing 1M+ events/day from 1,000+ EVs using Node.js, RabbitMQ, and Postgres. Added retry + dead-letter flows to reduce data loss from 15% to under 2%.",
      "Designed PCI-DSS compliant payment system handling 2,500+ monthly transactions via Easebuzz webhooks. Automated reconciliation reduced payment failures from 12% to 3%.",
    ],
    stack: "NestJS · TypeScript · Postgres · Redis · RabbitMQ · Kafka",
  },
  {
    company: "Prodo Technologies",
    role: "Software Engineer",
    meta: "Apr 2023 – Jan 2024 · Gurugram, India",
    bullets: [
      "Built push notification system with Node.js, NestJS, and OneSignal for segmented campaigns to 10K+ users, improving CTR by 30% vs broadcast baseline.",
      "Implemented bidirectional sync between production DB and Zoho CRM via Kafka, processing 50K+ records/day with exactly-once delivery semantics.",
      "Added multi-currency support to payment flows using Currency Beacon API in Spring Boot, enabling 3 new international markets.",
    ],
    stack: "NestJS · Spring Boot · Node.js · Kafka · MongoDB",
  },
  {
    company: "Zapit.io",
    role: "Backend Developer (Intern)",
    meta: "Mar 2023 – Apr 2023 · Remote",
    bullets: [
      "Built RESTful APIs for UPI liquidity provider dashboard using Node.js, Express, and MongoDB to support real-time monitoring for 10+ financial partners.",
      "Implemented gRPC pub/sub for inter-service communication, reducing event delivery latency by 60% vs HTTP baseline.",
    ],
    stack: "Node.js · Express · MongoDB · gRPC",
  },
  {
    company: "Prodo Technologies",
    role: "Backend Developer (Intern)",
    meta: "Dec 2022 – Feb 2023 · Gurugram, India",
    bullets: [
      "Built internal analytics dashboard APIs with NestJS + MongoDB, integrating Zoho CRM data for sales workflows.",
      "Added Redis caching with TTL invalidation, reducing API response times by 50%.",
      "Created S3 image optimization pipeline (PNG to base64 with ~70% compression), reducing bandwidth costs proportionally.",
    ],
    stack: "NestJS · MongoDB · Redis · AWS S3",
  },
];

export default function Experience({ earn }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useViewportAward(sectionRef, "section-experience", 5, 0, { earn });

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-8 max-w-[1280px] mx-auto relative">
      <div className="flex items-center gap-6 mb-12 border-b-4 border-dashed border-navy pb-6">
        <svg
          viewBox="0 0 16 16"
          shapeRendering="crispEdges"
          className="w-20 h-20 flex-shrink-0"
        >
          <rect x="2" y="5" width="12" height="9" fill="#6B4E32" />
          <rect x="2" y="5" width="12" height="2" fill="#1B3A5C" />
          <rect x="5" y="3" width="6" height="2" fill="#1B3A5C" />
          <rect x="6" y="2" width="4" height="1" fill="#1B3A5C" />
          <rect x="7" y="9" width="2" height="2" fill="#D4A93C" />
        </svg>
        <div>
          <h2 className="font-pixel text-[24px] text-navy">WORK HISTORY</h2>
          <div className="font-typewriter text-brown text-[18px] mt-2">
            {"// professionally caffeinated since 2021"}
          </div>
        </div>
      </div>

      <div className="relative pl-10">
        {/* Dashed vertical line */}
        <div
          className="absolute left-[12px] top-0 bottom-0 w-[4px]"
          style={{
            background:
              "repeating-linear-gradient(0deg, #1B3A5C 0 8px, transparent 8px 14px)",
          }}
        />

        {experiences.map((exp) => (
          <div key={`${exp.company}-${exp.meta}`} className="relative mb-10 bg-paper border-4 border-navy shadow-[6px_6px_0_#0F2540] p-6">
            <div className="absolute left-[-38px] top-[24px] w-5 h-5 bg-red border-4 border-navy" />
            <h3 className="font-pixel text-[14px] text-navy mb-[6px]">{exp.company}</h3>
            <div className="font-typewriter text-red text-[18px] mb-1">{exp.role}</div>
            <div className="font-mono text-brown text-[16px] mb-4">{exp.meta}</div>
            <ul className="list-none pl-0 space-y-2">
              {exp.bullets.map((item, i) => (
                <li key={i} className="pl-6 relative text-[18px]">
                  <span className="absolute left-0 top-[4px] font-pixel text-[10px] text-red">
                    ▸
                  </span>
                  {item}
                </li>
              ))}
              <li className="pl-6 relative text-[18px]">
                <span className="absolute left-0 top-[4px] font-pixel text-[10px] text-red">
                  ▸
                </span>
                Stack: {exp.stack}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
