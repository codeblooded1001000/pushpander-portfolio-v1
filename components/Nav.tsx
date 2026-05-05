"use client";

import { useState } from "react";
import SchruteBucksCounter from "./SchruteBucksCounter";

interface NavProps {
  total: number;
  rank: string;
  earnEvents: { amount: number; id: number }[];
}

export default function Nav({ total, rank, earnEvents }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#incidents", label: "Incidents" },
    { href: "#testimonials", label: "Praise" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Hire Me" },
    { href: "#blog", label: "Blog" },
  ];

  return (
    <nav className="sticky top-0 w-full bg-navy border-b-4 border-navy-dark z-[100] px-6 py-3 flex justify-between items-center relative">
      <div className="min-w-0 font-pixel text-[12px] text-cream flex items-center gap-3">
        <svg
          className="w-6 h-6 flex-shrink-0"
          viewBox="0 0 16 16"
          shapeRendering="crispEdges"
        >
          <rect x="3" y="4" width="8" height="9" fill="#F5E6D3" />
          <rect x="3" y="4" width="8" height="1" fill="#1B3A5C" />
          <rect x="3" y="12" width="8" height="1" fill="#1B3A5C" />
          <rect x="3" y="4" width="1" height="9" fill="#1B3A5C" />
          <rect x="10" y="4" width="1" height="9" fill="#1B3A5C" />
          <rect x="11" y="6" width="2" height="1" fill="#1B3A5C" />
          <rect x="13" y="6" width="1" height="4" fill="#1B3A5C" />
          <rect x="11" y="10" width="2" height="1" fill="#1B3A5C" />
          <rect x="5" y="7" width="4" height="1" fill="#C8443D" />
          <rect x="5" y="9" width="4" height="1" fill="#C8443D" />
        </svg>
        <span className="inline text-[10px] sm:text-[12px] whitespace-nowrap">PUSHPANDER.EXE</span>
      </div>

      <ul className="hidden md:flex list-none gap-5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-pixel text-[9px] text-cream no-underline py-[6px] px-[10px] border-2 border-transparent transition-all duration-100 hover:bg-red hover:border-cream hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_#0F2540]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <SchruteBucksCounter total={total} rank={rank} earnEvents={earnEvents} />
        </div>

        <button
          type="button"
          className="md:hidden flex items-center justify-center w-10 h-10 border-2 border-cream text-cream active:translate-y-[1px]"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="font-pixel text-[12px] leading-none">≡</span>
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-navy border-t-2 border-navy-dark border-b-4 border-navy-dark px-6 py-4">
          <ul className="list-none space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block font-pixel text-[10px] text-cream no-underline py-2 px-3 border-2 border-cream/20 hover:bg-red hover:border-cream"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="sm:hidden mt-4 pt-3 border-t-2 border-navy-dark">
            <SchruteBucksCounter total={total} rank={rank} earnEvents={earnEvents} />
          </div>
        </div>
      )}
    </nav>
  );
}
