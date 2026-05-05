"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getRank } from "@/lib/ranks";

const STORAGE_KEY = "pushpander_sb";
const CYCLE_CAP = 800;

interface EarnEvent {
  amount: number;
  id: number;
}

export function useSchruteBucks() {
  const [total, setTotal] = useState(0);
  const [rank, setRank] = useState("TEMP");
  const [earnEvents, setEarnEvents] = useState<EarnEvent[]>([]);
  const [rankUp, setRankUp] = useState<string | null>(null);
  const eventIdRef = useRef(0);
  const capsRef = useRef<Set<string>>(new Set());

  const normalizeScore = useCallback((value: number) => {
    // Keep SB on a rolling 0..799 cycle.
    return ((value % CYCLE_CAP) + CYCLE_CAP) % CYCLE_CAP;
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const val = parseInt(stored, 10);
      const normalized = Number.isNaN(val) ? 0 : normalizeScore(val);
      setTotal(normalized);
      setRank(getRank(normalized));
    }
  }, [normalizeScore]);

  const earn = useCallback(
    (amount: number, capKey: string) => {
      if (capsRef.current.has(capKey)) return false;
      capsRef.current.add(capKey);

      setTotal((prev) => {
        const nextRaw = prev + amount;
        const next = normalizeScore(nextRaw);
        localStorage.setItem(STORAGE_KEY, String(next));
        const oldRank = getRank(prev);
        const newRank = getRank(next);
        if (newRank !== oldRank) {
          setRankUp(newRank);
          setTimeout(() => setRankUp(null), 3500);
        }
        setRank(newRank);
        return next;
      });

      const id = ++eventIdRef.current;
      setEarnEvents((prev) => [...prev, { amount, id }]);
      setTimeout(() => {
        setEarnEvents((prev) => prev.filter((e) => e.id !== id));
      }, 2600);

      return true;
    },
    [normalizeScore]
  );

  const hasCap = useCallback((capKey: string) => {
    return capsRef.current.has(capKey);
  }, []);

  return { total, rank, earn, earnEvents, rankUp, hasCap };
}
