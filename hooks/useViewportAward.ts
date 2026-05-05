"use client";

import { useEffect, useRef } from "react";

interface ViewportAwardConfig {
  earn: (amount: number, capKey: string) => boolean;
}

export function useViewportAward(
  ref: React.RefObject<HTMLElement | null>,
  capKey: string,
  amount: number,
  delay: number,
  { earn }: ViewportAwardConfig
) {
  const awardedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || awardedRef.current) return;

    let timer: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !awardedRef.current) {
            timer = setTimeout(() => {
              awardedRef.current = true;
              earn(amount, capKey);
              observer.disconnect();
            }, delay);
          } else if (!entry.isIntersecting && timer) {
            clearTimeout(timer);
            timer = null;
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [ref, capKey, amount, delay, earn]);
}
