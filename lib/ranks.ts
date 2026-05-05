export const RANKS = [
  { min: 0, label: "TEMP" },
  { min: 50, label: "SALES REP" },
  { min: 150, label: "ASSISTANT TO THE REGIONAL MANAGER" },
  { min: 300, label: "ASSISTANT REGIONAL MANAGER" },
  { min: 600, label: "REGIONAL MANAGER" },
  { min: 1000, label: "CEO" },
] as const;

export function getRank(sb: number): string {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (sb >= RANKS[i].min) return RANKS[i].label;
  }
  return RANKS[0].label;
}

export function getNextRank(sb: number): { label: string; threshold: number } | null {
  for (const rank of RANKS) {
    if (sb < rank.min) return { label: rank.label, threshold: rank.min };
  }
  return null;
}
