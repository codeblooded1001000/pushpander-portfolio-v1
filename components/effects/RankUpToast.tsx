"use client";

interface RankUpToastProps {
  rank: string | null;
}

export default function RankUpToast({ rank }: RankUpToastProps) {
  if (!rank) return null;

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[200] animate-slide-down pointer-events-none">
      <div className="bg-paper border-4 border-navy shadow-[6px_6px_0_#0F2540] px-8 py-4 mt-4 text-center">
        <div className="font-pixel text-[8px] text-brown mb-1">PROMOTED TO</div>
        <div className="font-pixel text-[14px] text-navy">{rank}</div>
      </div>
    </div>
  );
}
