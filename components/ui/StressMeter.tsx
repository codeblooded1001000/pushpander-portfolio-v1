interface StressMeterProps {
  level: number; // 1-10
}

export default function StressMeter({ level }: StressMeterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-pixel text-[8px] text-navy-dark">STRESS</span>
      <div className="flex gap-[2px]">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className={`w-[10px] h-[14px] border border-navy-dark ${
              i < level ? "bg-red" : "bg-cream-dark"
            }`}
          />
        ))}
      </div>
      <span className="font-mono text-sm text-navy-dark">{level}/10</span>
    </div>
  );
}
