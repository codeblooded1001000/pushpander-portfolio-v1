"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useViewportAward } from "@/hooks/useViewportAward";

interface SkillsProps {
  earn: (amount: number, capKey: string) => boolean;
}

const skillCategories = [
  { name: "LANGUAGES", items: ["TypeScript", "JavaScript", "C++", "Java", "SQL"] },
  { name: "BACKEND", items: ["NestJS", "Node.js", "Express", "Spring Boot"] },
  { name: "DATA", items: ["PostgreSQL", "MongoDB", "Redis", "PostGIS"] },
  { name: "MESSAGING", items: ["RabbitMQ", "Kafka", "gRPC", "Webhooks"] },
  { name: "INFRA", items: ["AWS", "GCP", "Docker", "Kubernetes"] },
  { name: "OBSERVABILITY", items: ["Grafana", "Loki", "Elasticsearch"] },
];

export default function Skills({ earn }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useViewportAward(sectionRef, "section-skills", 5, 0, { earn });

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-8 max-w-[1280px] mx-auto relative">
      <div className="flex items-center gap-6 mb-12 border-b-4 border-dashed border-navy pb-6">
        <svg
          viewBox="0 0 16 16"
          shapeRendering="crispEdges"
          className="w-20 h-20 flex-shrink-0"
        >
          <rect x="6" y="2" width="2" height="3" fill="#7A8450" />
          <rect x="8" y="2" width="2" height="3" fill="#7A8450" />
          <rect x="5" y="5" width="6" height="2" fill="#A33530" />
          <rect x="4" y="7" width="8" height="4" fill="#A33530" />
          <rect x="5" y="11" width="6" height="2" fill="#A33530" />
          <rect x="6" y="13" width="4" height="1" fill="#A33530" />
          <rect x="7" y="14" width="2" height="1" fill="#A33530" />
        </svg>
        <div>
          <h2 className="font-pixel text-[24px] text-navy">TECH STACK</h2>
          <div className="font-typewriter text-brown text-[18px] mt-2">
            {"// fact: these tools are the best at what they do"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        <div className="bg-paper border-4 border-navy shadow-[6px_6px_0_#0F2540] p-4 text-center">
          <Image
            data-sprite="dwight"
            src="/sprites/dwight.png"
            alt="Dwight Schrute"
            width={100}
            height={160}
            unoptimized
            className="h-[160px] w-auto mx-auto mb-3"
          />
          <p className="font-typewriter text-[15px] text-navy-dark">
            &ldquo;FACT: These are the only frameworks worth your time.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat) => (
            <SkillCategory key={cat.name} category={cat} earn={earn} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCategory({
  category,
  earn,
}: {
  category: (typeof skillCategories)[0];
  earn: (amount: number, capKey: string) => boolean;
}) {
  return (
    <div className="bg-paper border-4 border-navy shadow-[6px_6px_0_#0F2540] p-5">
      <h4 className="font-pixel text-[11px] text-red mb-3 border-b-2 border-cream-dark pb-2">
        {category.name}
      </h4>
      <ul className="list-none space-y-1">
        {category.items.map((item) => (
          <SkillPill key={item} name={item} categoryName={category.name} earn={earn} />
        ))}
      </ul>
    </div>
  );
}

function SkillPill({
  name,
  categoryName,
  earn,
}: {
  name: string;
  categoryName: string;
  earn: (amount: number, capKey: string) => boolean;
}) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    timerRef.current = setTimeout(() => {
      earn(2, `skill-${categoryName}-${name}`);
    }, 1000);
  }, [earn, categoryName, name]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return (
    <li
      className={`py-1 text-[18px] text-navy-dark flex items-center transition-colors duration-100 ${
        hovered ? "text-red" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="text-mustard mr-2">◆</span>
      {name}
    </li>
  );
}
