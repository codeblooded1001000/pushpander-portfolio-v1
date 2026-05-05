"use client";

import { useRef } from "react";
import Image from "next/image";
import { useViewportAward } from "@/hooks/useViewportAward";

interface ContactProps {
  earn: (amount: number, capKey: string) => boolean;
}

const links = [
  {
    href: "mailto:pushpandersinghtanwar04@gmail.com",
    label: "📧 EMAIL — pushpandersinghtanwar04@gmail.com",
  },
  { href: "https://linkedin.com/in/pushpander/", label: "💼 LINKEDIN" },
  { href: "https://github.com/codeblooded1001000", label: "💾 GITHUB" },
  { href: "https://leetcode.com/u/pushpanderrr/", label: "🧠 LEETCODE" },
];

export default function Contact({ earn }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useViewportAward(sectionRef, "section-contact", 5, 0, { earn });

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-8 max-w-[1280px] mx-auto relative">
      <div className="flex items-center gap-6 mb-12 border-b-4 border-dashed border-navy pb-6">
        <svg
          viewBox="0 0 16 16"
          shapeRendering="crispEdges"
          className="w-20 h-20 flex-shrink-0"
        >
          <rect x="3" y="2" width="10" height="12" fill="#1B1B2A" />
          <rect x="4" y="3" width="8" height="8" fill="#7A8450" />
          <rect x="5" y="4" width="6" height="1" fill="#1B1B2A" />
          <rect x="5" y="6" width="6" height="1" fill="#1B1B2A" />
          <rect x="5" y="8" width="3" height="1" fill="#1B1B2A" />
          <rect x="6" y="12" width="4" height="2" fill="#F5E6D3" />
        </svg>
        <div>
          <h2 className="font-pixel text-[24px] text-navy">HIRE ME</h2>
          <div className="font-typewriter text-brown text-[18px] mt-2">
            {"// dunder mifflin reception is open"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-paper border-4 border-navy shadow-[8px_8px_0_#0F2540] p-10">
        <div>
          <h3 className="font-pixel text-[18px] text-navy mb-3">
            FREELANCE? FULL-TIME?<br />JUST A CHAT?
          </h3>
          <p className="font-typewriter text-[19px] text-navy-dark mb-6">
            Currently open for freelance backend gigs and exploring SDE2 roles.
            The owl reads everything within 24 hours, usually faster.
          </p>
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="bg-cream border-[3px] border-navy-dark py-3 px-4 font-pixel text-[10px] text-navy no-underline shadow-[3px_3px_0_#0F2540] transition-all duration-100 flex items-center gap-3 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_#0F2540] hover:bg-mustard"
                onClick={() => earn(30, "contact-click")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="bg-cream border-[3px] border-navy-dark p-6 text-center">
          <div className="bg-paper border-[3px] border-navy py-2 px-4 font-pixel text-[11px] text-navy inline-block mb-4 shadow-[3px_3px_0_#0F2540] rotate-[-2deg]">
            RECEPTION
          </div>
          <Image
            src="/sprites/pam.png"
            alt="Pam Beesly"
            width={240}
            height={300}
            unoptimized
            className="w-full max-w-[240px] h-auto mx-auto animate-bob"
          />
        </div>
      </div>
    </section>
  );
}
