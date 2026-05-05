"use client";

import { useRef } from "react";
import Image from "next/image";
import { useViewportAward } from "@/hooks/useViewportAward";

interface BlogProps {
  earn: (amount: number, capKey: string) => boolean;
}

const posts = [
  { title: "Why I went from Spring Boot to NestJS - and stayed", date: "▸ Coming soon" },
  { title: "Reconciling 2,500 payments/month without losing your mind", date: "▸ Coming soon" },
  { title: "Building a 1M event/day telemetry pipeline on a single RabbitMQ cluster", date: "▸ Coming soon" },
  { title: "95% cache hit rate on Google Maps without breaking the budget", date: "▸ Coming soon" },
];

export default function Blog({ earn }: BlogProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useViewportAward(sectionRef, "section-blog", 5, 0, { earn });

  return (
    <section id="blog" ref={sectionRef} className="py-20 px-8 max-w-[1280px] mx-auto relative">
      <div className="flex items-center gap-6 mb-12 border-b-4 border-dashed border-navy pb-6">
        <svg
          viewBox="0 0 16 16"
          shapeRendering="crispEdges"
          className="w-20 h-20 flex-shrink-0"
        >
          <rect x="3" y="2" width="10" height="12" fill="#C8443D" />
          <rect x="3" y="2" width="10" height="2" fill="#A33530" />
          <rect x="5" y="6" width="6" height="1" fill="#F5E6D3" />
          <rect x="5" y="9" width="6" height="1" fill="#F5E6D3" />
          <rect x="5" y="12" width="4" height="1" fill="#F5E6D3" />
        </svg>
        <div>
          <h2 className="font-pixel text-[24px] text-navy">WRITING</h2>
          <div className="font-typewriter text-brown text-[18px] mt-2">
            {"// notes from the trenches"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        <div className="bg-paper border-4 border-navy shadow-[6px_6px_0_#0F2540] p-4 text-center">
          <Image
            src="/sprites/kevin.png"
            alt="Kevin Malone"
            width={100}
            height={160}
            unoptimized
            className="h-[160px] w-auto mx-auto mb-3"
          />
          <p className="font-typewriter text-[14px] text-navy-dark">
            &ldquo;Why waste time say lot word when few word do trick?&rdquo;
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <a
              key={post.title}
              href="#"
              className="bg-paper border-4 border-navy shadow-[4px_4px_0_#0F2540] p-5 no-underline text-inherit flex justify-between items-center gap-4 transition-all duration-100 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#0F2540] hover:bg-cream-dark"
            >
              <div>
                <h4 className="font-pixel text-[12px] text-navy mb-[6px]">
                  {post.title}
                </h4>
                <div className="font-mono text-[16px] text-brown">
                  {post.date}
                </div>
              </div>
              <span className="font-pixel text-[16px] text-red">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
