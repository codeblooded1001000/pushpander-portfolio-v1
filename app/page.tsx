"use client";

import { useState, useCallback, useRef } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Incidents from "@/components/sections/Incidents";
import Testimonials from "@/components/sections/Testimonials";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Blog from "@/components/sections/Blog";
import Footer from "@/components/sections/Footer";
import ParkourOverlay from "@/components/effects/ParkourOverlay";
import EasterEggListener from "@/components/effects/EasterEggListener";
import RankUpToast from "@/components/effects/RankUpToast";
import { useSchruteBucks } from "@/hooks/useSchruteBucks";

export default function Home() {
  const { total, rank, earn, earnEvents, rankUp } = useSchruteBucks();
  const [parkourActive, setParkourActive] = useState(false);
  const parkourCooldownRef = useRef(false);

  // Stanley click counter
  const [, setStanleyClicks] = useState(0);
  const [stanleyBubble, setStanleyBubble] = useState<string | null>(null);

  // Mobile parkour: 5 rapid taps on Michael
  const tapTimesRef = useRef<number[]>([]);

  const handleParkour = useCallback(() => {
    if (parkourActive || parkourCooldownRef.current) return;
    setParkourActive(true);
  }, [parkourActive]);

  const handleParkourComplete = useCallback(() => {
    setParkourActive(false);
    parkourCooldownRef.current = true;
    setTimeout(() => {
      parkourCooldownRef.current = false;
    }, 10000);
  }, []);

  const handleStanleyClick = useCallback(() => {
    setStanleyClicks((prev) => {
      const next = prev + 1;
      if (next === 5) {
        setStanleyBubble("Did I stutter?");
        earn(10, "stanley-5");
        setTimeout(() => setStanleyBubble(null), 2500);
      } else if (next === 10) {
        setStanleyBubble("I have been here for 18 years. Leave me alone.");
        earn(20, "stanley-10");
        setTimeout(() => setStanleyBubble(null), 2500);
      } else if (next === 20) {
        setStanleyBubble("Pretzel Day.");
        earn(50, "stanley-20");
        document.body.style.filter = "sepia(0.6)";
        setTimeout(() => {
          setStanleyBubble(null);
          document.body.style.filter = "";
        }, 3000);
      }
      return next;
    });
  }, [earn]);

  const handleMichaelTap = useCallback(() => {
    const now = Date.now();
    tapTimesRef.current = [...tapTimesRef.current.filter((t) => now - t < 1500), now];
    if (tapTimesRef.current.length >= 5) {
      tapTimesRef.current = [];
      handleParkour();
    }
  }, [handleParkour]);

  return (
    <>
      <Nav total={total} rank={rank} earnEvents={earnEvents} />

      <Hero onMichaelTap={handleMichaelTap} />

      <Projects earn={earn} />
      <Experience earn={earn} />
      <Incidents earn={earn} />
      <Testimonials
        earn={earn}
        onStanleyClick={handleStanleyClick}
        stanleyBubble={stanleyBubble}
      />
      <Skills earn={earn} />
      <Contact earn={earn} />
      <Blog earn={earn} />
      <Footer />

      <ParkourOverlay active={parkourActive} onComplete={handleParkourComplete} />
      <EasterEggListener earn={earn} onParkour={handleParkour} />
      <RankUpToast rank={rankUp} />

    </>
  );
}
