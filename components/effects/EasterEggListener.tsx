"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useKeySequence } from "@/hooks/useKeySequence";
import SpeechBubble from "@/components/ui/SpeechBubble";

interface EasterEggListenerProps {
  earn: (amount: number, capKey: string) => boolean;
  onParkour: () => void;
}

export default function EasterEggListener({ earn, onParkour }: EasterEggListenerProps) {
  const [dwightBubble, setDwightBubble] = useState(false);
  const [stanleyBubble, setStanleyBubble] = useState(false);
  const [dundieLabels, setDundieLabels] = useState(false);
  const activeEffectsRef = useRef(new Set<string>());

  const applyPageEffect = useCallback((filter: string, duration: number) => {
    document.body.style.filter = filter;
    setTimeout(() => {
      document.body.style.filter = "";
    }, duration);
  }, []);

  const sequences = useMemo(
    () => [
      {
        keys: "parkour",
        action: () => {
          onParkour();
          earn(50, "parkour");
        },
      },
      {
        keys: "beets",
        action: () => {
          if (activeEffectsRef.current.has("beets")) return;
          activeEffectsRef.current.add("beets");
          earn(25, "egg-beets");
          applyPageEffect("hue-rotate(20deg) saturate(1.4)", 2500);
          setTimeout(() => activeEffectsRef.current.delete("beets"), 2500);
        },
      },
      {
        keys: "dundies",
        action: () => {
          if (activeEffectsRef.current.has("dundies")) return;
          activeEffectsRef.current.add("dundies");
          earn(25, "egg-dundies");
          setDundieLabels(true);
          const cards = document.querySelectorAll("[data-project-card]");
          cards.forEach((card) => {
            (card as HTMLElement).style.boxShadow =
              "0 0 20px #D4A93C, 6px 6px 0 #0F2540";
          });
          setTimeout(() => {
            cards.forEach((card) => {
              (card as HTMLElement).style.boxShadow = "6px 6px 0 #0F2540";
            });
            setDundieLabels(false);
            activeEffectsRef.current.delete("dundies");
          }, 2000);
        },
      },
      {
        keys: "schrute",
        action: () => {
          if (activeEffectsRef.current.has("schrute")) return;
          activeEffectsRef.current.add("schrute");
          earn(25, "egg-schrute");
          setDwightBubble(true);
          const dwight = document.querySelector("[data-sprite='dwight']");
          if (dwight) {
            (dwight as HTMLElement).style.transform = "scale(1.5)";
            (dwight as HTMLElement).style.transition = "transform 0.3s";
            setTimeout(() => {
              (dwight as HTMLElement).style.transform = "";
            }, 1500);
          }
          setTimeout(() => {
            setDwightBubble(false);
            activeEffectsRef.current.delete("schrute");
          }, 2000);
        },
      },
      {
        keys: "pretzel",
        action: () => {
          if (activeEffectsRef.current.has("pretzel")) return;
          activeEffectsRef.current.add("pretzel");
          earn(25, "egg-pretzel");
          setStanleyBubble(true);
          applyPageEffect("sepia(0.6)", 3000);
          setTimeout(() => {
            setStanleyBubble(false);
            activeEffectsRef.current.delete("pretzel");
          }, 3000);
        },
      },
    ],
    [earn, onParkour, applyPageEffect]
  );

  useKeySequence({ sequences });

  return (
    <>
      {/* Dwight "Identity theft" bubble — positioned near skills section dwight */}
      {dwightBubble && (
        <div className="fixed top-[30%] left-[10%] z-[500] pointer-events-none">
          <SpeechBubble className="max-w-[250px]">
            IDENTITY THEFT IS NOT A JOKE!
          </SpeechBubble>
        </div>
      )}

      {/* Stanley "Pretzel Day" bubble */}
      {stanleyBubble && (
        <div className="fixed top-[30%] right-[10%] z-[500] pointer-events-none">
          <SpeechBubble className="max-w-[200px]">
            PRETZEL DAY.
          </SpeechBubble>
        </div>
      )}

      {/* Dundies "BEST PROJECT" labels */}
      {dundieLabels && (
        <style>{`
          [data-project-card]::after {
            content: 'BEST PROJECT';
            position: absolute;
            top: -16px;
            left: 50%;
            transform: translateX(-50%);
            font-family: 'Press Start 2P', monospace;
            font-size: 8px;
            color: #D4A93C;
            background: #FAF1E0;
            padding: 2px 8px;
            border: 2px solid #D4A93C;
            z-index: 10;
            animation: float-up 2s ease-out forwards;
          }
        `}</style>
      )}
    </>
  );
}
