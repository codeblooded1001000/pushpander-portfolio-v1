"use client";

import { useEffect, useRef } from "react";

interface KeySequenceConfig {
  sequences: { keys: string; action: () => void }[];
  bufferTimeout?: number;
}

export function useKeySequence({ sequences, bufferTimeout = 3000 }: KeySequenceConfig) {
  const bufferRef = useRef("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (timerRef.current) clearTimeout(timerRef.current);

      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-10);

      timerRef.current = setTimeout(() => {
        bufferRef.current = "";
      }, bufferTimeout);

      for (const seq of sequences) {
        if (bufferRef.current.endsWith(seq.keys)) {
          seq.action();
          bufferRef.current = "";
          break;
        }
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [sequences, bufferTimeout]);
}
