"use client";

import { useRef } from "react";
import Image from "next/image";
import SpeechBubble from "@/components/ui/SpeechBubble";
import { useViewportAward } from "@/hooks/useViewportAward";

interface TestimonialsProps {
  earn: (amount: number, capKey: string) => boolean;
  onStanleyClick: () => void;
  stanleyBubble?: string | null;
}

const testimonials = [
  {
    id: "t1",
    text: "I've worked with Pushpander across two companies now and the pattern's the same: he picks up ambiguous, half-spec'd backend problems and ships them clean. The inventory module he architected at Alt is the kind of thing most engineers would over-engineer or under-think - he somehow does neither. Also, he asks the right questions in design reviews. The annoying right questions.",
    avatar: "M",
    name: "Mehul",
    title: "SDE-3 @ Alt Mobility",
  },
  {
    id: "t2",
    text: "Working alongside Pushpander on the GMS rollout was the calmest cross-team launch I've been part of. He sweats the unsexy stuff - schema versioning, retry semantics, dead-letter handling - which means by the time you're on call, there's nothing weird to figure out at 2 AM. Solid teammate, faster than he gives himself credit for.",
    avatar: "S",
    name: "Shailesh Kumar",
    title: "SDE-2 @ Alt Mobility",
  },
  {
    id: "t3",
    text: "Pushpander and I built Verinet - a corporate-verified social platform - together over a few months, and I learned more about backend system design from him in that window than from any course. He thinks in trade-offs, not absolutes. Want a Postgres-vs-Redis call broken down with actual reasoning? He'll give it to you in five minutes flat.",
    avatar: "A",
    name: "Abhinav Ashish",
    title: "DAA @ ZS",
  },
  {
    id: "t4",
    text: "Knew Pushpander since college and watched him grow through Prodo and Alt Mobility. What's stayed consistent: he's curious about systems other people consider boring - payment reconciliation, queue ordering guarantees, telemetry pipelines. That's the rarest quality in a backend engineer. The boring infra is where the real money and real failures live.",
    avatar: "P",
    name: "Prateek Jha",
    title: "Software Engineer @ Zomato",
  },
];

export default function Testimonials({
  earn,
  onStanleyClick,
  stanleyBubble,
}: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useViewportAward(sectionRef, "section-testimonials", 5, 0, { earn });

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 px-8 max-w-[1280px] mx-auto relative">
      <div className="flex items-center gap-6 mb-12 border-b-4 border-dashed border-navy pb-6">
        <svg
          viewBox="0 0 16 16"
          shapeRendering="crispEdges"
          className="w-20 h-20 flex-shrink-0"
        >
          <rect x="1" y="1" width="14" height="14" fill="#F5E6D3" />
          <rect x="1" y="1" width="14" height="1" fill="#1B3A5C" />
          <rect x="1" y="14" width="14" height="1" fill="#1B3A5C" />
          <rect x="1" y="1" width="1" height="14" fill="#1B3A5C" />
          <rect x="14" y="1" width="1" height="14" fill="#1B3A5C" />
          <rect x="3" y="3" width="2" height="2" fill="#1B3A5C" />
          <rect x="7" y="3" width="2" height="2" fill="#1B3A5C" />
          <rect x="11" y="3" width="2" height="2" fill="#1B3A5C" />
          <rect x="3" y="7" width="2" height="2" fill="#1B3A5C" />
          <rect x="11" y="7" width="2" height="2" fill="#1B3A5C" />
          <rect x="3" y="11" width="2" height="2" fill="#1B3A5C" />
          <rect x="7" y="11" width="2" height="2" fill="#1B3A5C" />
          <rect x="11" y="11" width="2" height="2" fill="#1B3A5C" />
        </svg>
        <div>
          <h2 className="font-pixel text-[24px] text-navy">WHAT FOLKS SAY</h2>
          <div className="font-typewriter text-brown text-[18px] mt-2">
            {"// kind words from people I've worked with"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        <div
          className="bg-paper border-4 border-navy shadow-[6px_6px_0_#0F2540] p-4 text-center md:sticky md:top-[100px] cursor-pointer overflow-visible"
          onClick={onStanleyClick}
        >
          <div className="relative mx-auto w-fit max-w-full pt-1">
            {stanleyBubble && (
              <SpeechBubble
                tailAlign="center"
                className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-10 max-w-[min(260px,calc(100vw-4rem))] -translate-x-1/2 text-left"
              >
                {stanleyBubble}
              </SpeechBubble>
            )}
            <Image
              src="/sprites/stanley.png"
              alt="Stanley Hudson"
              width={100}
              height={160}
              unoptimized
              className="relative z-0 mx-auto mb-3 h-[160px] w-auto"
            />
          </div>
          <div className="font-typewriter text-[16px] text-navy-dark bg-cream-dark p-3 border-2 border-brown">
            &ldquo;I have been here for 18 years. He&apos;s good. Now leave me
            alone.&rdquo;<br />— Stanley
          </div>
        </div>

        <div>
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} earn={earn} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  earn,
}: {
  testimonial: (typeof testimonials)[0];
  earn: (amount: number, capKey: string) => boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useViewportAward(ref, `testimonial-${testimonial.id}`, 15, 2000, { earn });

  return (
    <div
      ref={ref}
      className="relative bg-paper border-4 border-navy shadow-[6px_6px_0_#0F2540] p-6 mb-6"
    >
      <span className="absolute top-[-20px] left-4 font-pixel text-[60px] text-red bg-cream px-2 leading-none">
        &ldquo;
      </span>
      <p className="font-typewriter text-[19px] text-navy-dark mb-4 mt-3">
        {testimonial.text}
      </p>
      <div className="flex items-center gap-3 border-t-2 border-dashed border-brown pt-3">
        <div className="w-12 h-12 bg-navy border-[3px] border-navy-dark flex items-center justify-center text-cream font-pixel text-[14px] flex-shrink-0">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-pixel text-[11px] text-navy">
            {testimonial.name}
          </div>
          <div className="font-mono text-[16px] text-brown">
            {testimonial.title}
          </div>
        </div>
      </div>
    </div>
  );
}
