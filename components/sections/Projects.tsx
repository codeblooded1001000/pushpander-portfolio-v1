"use client";

import { useRef } from "react";
import Image from "next/image";
import { useViewportAward } from "@/hooks/useViewportAward";
import { ProjectThumbnail } from "@/components/ui/ProjectThumbnails";

interface ProjectsProps {
  earn: (amount: number, capKey: string) => boolean;
}

const projects = [
  {
    id: "pitstop",
    tag: "LIVE · SOLO BUILD",
    title: "Pitstop",
    liveUrl: "https://pitstop-umber.vercel.app/",
    desc: "Road trip planner for Indian highways that breaks long drives into smart, vehicle-aware checkpoints. Solo-built backend, frontend, design, and infra.",
    highlights: [
      "Hash-based route caching with ~95% hit rate (~Rs.0.20 per cached trip)",
      "3-layer cost defense to keep Google Maps spend flat at scale",
      "PostGIS spatial layer filtering 1,300+ checkpoints within 5km of route polyline in sub-100ms",
      "Vehicle range + fuel level aware planning logic",
    ],
    tech: [
      "NestJS",
      "PostgreSQL + PostGIS",
      "Redis",
      "Next.js",
      "Google Maps",
      "Mapbox",
    ],
  },
  {
    id: "burrow",
    tag: "LIVE · SOLO BUILD",
    title: "Burrow",
    liveUrl: "https://www.burrowapp.in",
    desc: "Corporate-verified flatmate finder for Gurgaon. Trust-first model: verify your work email, then list a room or browse listings. Solving the 'is this person actually who they say they are' problem in flat-hunting.",
    highlights: [
      "Email-domain verification gates the platform for listing and messaging",
      "Dual listing model: people with flats + people seeking flatmates",
      "Progressive data collection to reduce signup friction",
      "Built on Neon Postgres + Upstash Redis + Cloudflare R2 for cost-flat scaling",
    ],
    tech: [
      "NestJS",
      "Next.js 14",
      "PostgreSQL (Neon)",
      "Redis (Upstash)",
      "R2",
      "Google Maps",
      "GCP"
    ],
  },
  {
    id: "safedate",
    tag: "LIVE · SOLO BUILD",
    title: "SafeDate",
    liveUrl: "https://safedate-frontend.vercel.app/",
    desc: "Date planning + safety app for Indian metros. Discover verified date venues, share live check-ins with trusted contacts, and get nudged to confirm safety mid-date.",
    highlights: [
      "Zero-cost venue pipeline: OpenStreetMap + Foursquare + Unsplash",
      "Auto check-in nudges over SMS/push at user-defined intervals",
      "1,000+ pre-seeded venues across Delhi NCR, Mumbai, Bangalore at launch",
      "LinkedIn outreach drove first 200 users without a marketing budget",
    ],
    tech: ["Next.js", "PostgreSQL", "Socket.io", "NestJS", "Redis", "OSM API", "Foursquare API"],
  },
];

export default function Projects({ earn }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useViewportAward(sectionRef, "section-projects", 5, 0, { earn });

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-8 max-w-[1280px] mx-auto relative">
      <div className="absolute top-[60px] right-8 border-[3px] border-red text-red py-2 px-4 font-pixel text-[10px] rotate-[8deg] opacity-70">
        SHIPPED ✓
      </div>

      <div className="flex items-center gap-6 mb-12 border-b-4 border-dashed border-navy pb-6">
        <Image
          src="/sprites/jim.png"
          alt="Jim Halpert"
          width={80}
          height={110}
          unoptimized
          className="h-[110px] w-auto flex-shrink-0"
        />
        <div>
          <h2 className="font-pixel text-[24px] text-navy">SELECTED PROJECTS</h2>
          <div className="font-typewriter text-brown text-[18px] mt-2">
            {"// stuff that actually shipped to production"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} earn={earn} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  earn,
}: {
  project: (typeof projects)[0];
  earn: (amount: number, capKey: string) => boolean;
}) {
  return (
    <div
      data-project-card
      className="relative bg-paper border-4 border-navy shadow-[6px_6px_0_#0F2540] p-6 transition-all duration-100 cursor-pointer hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0_#0F2540] group"
      onClick={() => earn(10, `project-${project.id}`)}
    >
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title} live project`}
        className="absolute inset-0 z-10 flex items-center justify-center bg-navy/55 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-pixel text-[12px] bg-red text-cream border-2 border-cream px-4 py-2 shadow-[4px_4px_0_#0F2540]">
          LIVE ↗
        </span>
      </a>
      <div className="h-[160px] bg-cream border-[3px] border-navy-dark mb-4 flex items-center justify-center overflow-hidden group-hover:bg-cream-dark transition-colors duration-100">
        <ProjectThumbnail id={project.id} />
      </div>
      <span className="inline-block font-pixel text-[8px] bg-navy text-cream py-1 px-2 mb-3">
        {project.tag}
      </span>
      <h3 className="font-pixel text-[16px] text-navy mb-2">{project.title}</h3>
      <p className="text-[18px] text-navy-dark mb-4">{project.desc}</p>
      <ul className="list-none space-y-1 mb-4">
        {project.highlights.map((item) => (
          <li key={item} className="text-[16px] text-navy-dark pl-5 relative">
            <span className="absolute left-0 top-[3px] font-pixel text-[9px] text-red">
              ▸
            </span>
            {item}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-[6px]">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[14px] bg-cream-dark border-2 border-brown py-[2px] px-2 text-brown"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
