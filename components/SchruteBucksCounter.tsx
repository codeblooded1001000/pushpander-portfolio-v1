"use client";

interface SchruteBucksCounterProps {
  total: number;
  rank: string;
  earnEvents: { amount: number; id: number }[];
}

export default function SchruteBucksCounter({
  total,
  rank,
  earnEvents,
}: SchruteBucksCounterProps) {
  return (
    <div className="group relative flex items-center gap-2 font-pixel text-[9px] text-cream">
      {/* Coin SVG */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        className={`${earnEvents.length > 0 ? "animate-scale-bump" : ""}`}
        shapeRendering="crispEdges"
      >
        <circle cx="8" cy="8" r="7" fill="#D4A93C" />
        <circle cx="8" cy="8" r="5" fill="#6B4E32" fillOpacity="0.3" />
        <text
          x="8"
          y="11"
          textAnchor="middle"
          fontSize="8"
          fontFamily="Press Start 2P"
          fill="#F5E6D3"
        >
          $
        </text>
      </svg>

      <span
        className={`relative inline-flex items-center ${earnEvents.length > 0 ? "animate-scale-bump" : ""}`}
      >
        {total} SB

        {/* Earn indicators (anchored under SB points) */}
        {earnEvents.map((ev) => (
          <span
            key={ev.id}
            className="absolute left-1/2 top-[calc(100%+8px)] z-[121] -translate-x-1/2 whitespace-nowrap font-pixel text-[10px] text-[#87B5D9] pointer-events-none"
            style={{
              animation: "sb-float-down 2.2s ease-out forwards",
              animationDelay: `${(ev.id % 4) * 110}ms`,
            }}
          >
            +{ev.amount}
          </span>
        ))}
      </span>
      <span className="hidden md:inline text-cream/70">· {rank}</span>

      <div className="pointer-events-none absolute right-0 top-[calc(100%+8px)] z-[120] w-[230px] border-2 border-cream/50 bg-navy-dark px-3 py-2 text-[8px] leading-[1.5] text-cream opacity-0 shadow-[4px_4px_0_#0F2540] transition-opacity duration-150 group-hover:opacity-100">
        Schrute Bucks are your fun score here - you earn them by exploring sections,
        triggering easter eggs, and interacting with cards.
      </div>

      <style>{`
        @keyframes sb-float-down {
          0% { opacity: 0; transform: translateX(-50%) translateY(0); }
          15% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-24px); }
        }
      `}</style>
    </div>
  );
}
