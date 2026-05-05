"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SPRITES } from "@/lib/sprites";

interface ParkourOverlayProps {
  active: boolean;
  onComplete: () => void;
}

const SPEECH_LINES = ["PARKOUR!", "PARKOUR.", "PAAAARKOUR!", "I'M FINE!"];

/** Horizontal crossing time — same for every runner so pace matches foot cycle */
const RUN_DURATION_MS = 5200;
/** Total overlay time before final card (must be ≥ max(delay) + RUN_DURATION_MS) */
const PARKOUR_PHASE_MS = 6200;
const FINAL_HOLD_MS = 1500;

/** How many full 3-frame walk cycles happen over one crossing */
const WALK_CYCLES_PER_CROSS = 5;

interface Runner {
  id: string;
  frames: readonly string[];
  y: number;
  delay: number;
  /** Screen-space travel direction */
  direction: "ltr" | "rtl";
  /** Mirror sprite only (not motion) — parent scaleX would invert translateX and flip travel */
  flipSprite: boolean;
}

interface Bubble {
  id: number;
  text: string;
  x: number;
  y: number;
}

function walkFrameIndex(elapsedMs: number, delayMs: number): number {
  const t = elapsedMs - delayMs;
  if (t <= 0) return 0;
  if (t >= RUN_DURATION_MS) return 0;
  const progress = t / RUN_DURATION_MS;
  const totalSteps = WALK_CYCLES_PER_CROSS * 3;
  return Math.floor(progress * totalSteps) % 3;
}

export default function ParkourOverlay({ active, onComplete }: ParkourOverlayProps) {
  const [runners, setRunners] = useState<Runner[]>([]);
  const [frameIndices, setFrameIndices] = useState<Record<string, number>>({
    michael: 0,
    dwight: 0,
    andy: 0,
  });
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [showFinal, setShowFinal] = useState(false);
  const [shakeOffset, setShakeOffset] = useState({ x: 0, y: 0 });
  const bubbleIdRef = useRef(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const lastFramesRef = useRef({ michael: -1, dwight: -1, andy: -1 });

  const startParkour = useCallback(() => {
    const runnerDefs: Runner[] = [
      {
        id: "michael",
        frames: SPRITES.michaelRun,
        y: 30,
        delay: 0,
        direction: "ltr",
        flipSprite: false,
      },
      {
        id: "dwight",
        frames: SPRITES.dwightRun,
        y: 46,
        delay: 450,
        direction: "rtl",
        flipSprite: true,
      },
      {
        id: "andy",
        frames: SPRITES.andyRun,
        y: 62,
        delay: 900,
        direction: "ltr",
        flipSprite: false,
      },
    ];

    setRunners(runnerDefs);
    setFrameIndices({ michael: 0, dwight: 0, andy: 0 });
    lastFramesRef.current = { michael: -1, dwight: -1, andy: -1 };
    setShowFinal(false);
    setShakeOffset({ x: 0, y: 0 });

    document.body.style.overflow = "hidden";
    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;

      const next = {
        michael: walkFrameIndex(elapsed, 0),
        dwight: walkFrameIndex(elapsed, 450),
        andy: walkFrameIndex(elapsed, 900),
      };
      const prev = lastFramesRef.current;
      if (next.michael !== prev.michael || next.dwight !== prev.dwight || next.andy !== prev.andy) {
        lastFramesRef.current = next;
        setFrameIndices(next);
      }

      if (elapsed < PARKOUR_PHASE_MS) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    const bubbleInterval = setInterval(() => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      const text = SPEECH_LINES[Math.floor(Math.random() * SPEECH_LINES.length)];
      const id = ++bubbleIdRef.current;
      const x = 80 + Math.random() * Math.max(120, w - 280);
      const y = 18 + Math.random() * 42;
      setBubbles((prev) => [...prev, { id, text, x, y }]);
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== id));
      }, 900);
    }, 950);

    const shakeInterval = setInterval(() => {
      setShakeOffset({ x: 1, y: -1 });
      setTimeout(() => setShakeOffset({ x: 0, y: 0 }), 280);
    }, 2400);

    const endTimer = setTimeout(() => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(bubbleInterval);
      clearInterval(shakeInterval);
      setRunners([]);
      setBubbles([]);
      setShakeOffset({ x: 0, y: 0 });
      setShowFinal(true);

      setTimeout(() => {
        setShowFinal(false);
        document.body.style.overflow = "";
        onComplete();
      }, FINAL_HOLD_MS);
    }, PARKOUR_PHASE_MS);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(bubbleInterval);
      clearInterval(shakeInterval);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    if (active) {
      const cleanup = startParkour();
      return cleanup;
    }
  }, [active, startParkour]);

  if (!active && !showFinal) return null;

  const sceneTransform = `translate3d(${shakeOffset.x}px, ${shakeOffset.y}px, 0)`;

  return (
    <>
      {/* One shaken layer: dimmer + runners + bubbles stay aligned */}
      <div
        className="fixed inset-0 z-[9000] pointer-events-none"
        style={{ transform: sceneTransform }}
      >
        <div
          className="absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out pointer-events-auto"
          style={{ opacity: active ? 1 : 0 }}
        />

        {runners.map((runner) => (
          <div key={runner.id} className="fixed left-0 z-[1]" style={{ top: `${runner.y}vh` }}>
            <div
              className="will-change-transform"
              style={{
                animationName: runner.direction === "ltr" ? "parkour-ltr" : "parkour-rtl",
                animationDuration: `${RUN_DURATION_MS}ms`,
                animationTimingFunction: "linear",
                animationDelay: `${runner.delay}ms`,
                animationFillMode: "forwards",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={runner.frames[frameIndices[runner.id] ?? 0]}
                alt={runner.id}
                style={{
                  height: "200px",
                  width: "auto",
                  imageRendering: "pixelated",
                  transform: runner.flipSprite ? "scaleX(-1)" : undefined,
                }}
              />
            </div>
          </div>
        ))}

        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="fixed z-[2] bg-paper border-[3px] border-navy px-3 py-2 font-pixel text-[10px] text-navy shadow-[3px_3px_0_#0F2540] pointer-events-none"
            style={{ left: bubble.x, top: `${bubble.y}vh` }}
          >
            {bubble.text}
          </div>
        ))}
      </div>

      {showFinal && (
        <div className="fixed inset-0 z-[9002] flex items-center justify-center">
          <div className="bg-paper border-4 border-navy shadow-[8px_8px_0_#0F2540] px-12 py-8">
            <span className="font-pixel text-[28px] text-navy">PARKOUR.</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes parkour-ltr {
          from { transform: translate3d(-22vw, 0, 0); }
          to { transform: translate3d(122vw, 0, 0); }
        }
        @keyframes parkour-rtl {
          from { transform: translate3d(122vw, 0, 0); }
          to { transform: translate3d(-22vw, 0, 0); }
        }
      `}</style>
    </>
  );
}
