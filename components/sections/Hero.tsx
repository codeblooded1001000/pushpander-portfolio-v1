import Image from "next/image";
import PixelButton from "@/components/ui/PixelButton";
import SpeechBubble from "@/components/ui/SpeechBubble";

interface HeroProps {
  onMichaelTap?: () => void;
}

export default function Hero({ onMichaelTap }: HeroProps) {
  return (
    <section
      id="home"
      className="min-h-screen pt-[120px] px-8 pb-[60px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-[1280px] mx-auto relative"
    >
      <div className="absolute top-[90px] left-8 font-pixel text-[8px] text-red tracking-[2px]">
      BEARS · BEETS · BACKEND SYSTEMS
      </div>

      <div>
        <h1 className="font-pixel text-[24px] md:text-[32px] text-navy mb-6 leading-[1.6] [text-shadow:4px_4px_0_#C8443D]">
          HEY, I&apos;M<br />PUSHPANDER.
        </h1>
        <p className="font-typewriter text-[24px] text-brown mb-4">
          Backend engineer building event-driven systems that don&apos;t fall over.
        </p>
        <p className="text-[22px] text-navy-dark mb-8 max-w-[560px]">
        Backend engineer working across event-driven systems, payments, telemetry, and spatial queries. Day job: an EV leasing startup. Side projects: a road trip planner doing sub-100ms PostGIS lookups, a flatmate finder built on corporate email verification, and a date-safety app running on zero-budget infra. Three years in, two startups, one ongoing love affair with NestJS and Postgres.
        </p>
        <div className="flex gap-4 flex-wrap">
          <PixelButton href="#projects" primary>
            SEE PROJECTS →
          </PixelButton>
          <PixelButton href="#contact">HIRE ME</PixelButton>
          <PixelButton
            href="/sprites/Pushpander_Singh_Resume.pdf"
            download
            className="group bg-mustard text-navy border-brown shadow-[4px_4px_0_#6B4E32] hover:shadow-[2px_2px_0_#6B4E32]"
          >
            <span className="relative inline-grid place-items-center">
              <span className="col-start-1 row-start-1 transition-opacity duration-150 group-hover:opacity-0">
                GRAB MY PERSONNEL FILE →
              </span>
              <span className="col-start-1 row-start-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                DOWNLOAD RESUME
              </span>
            </span>
          </PixelButton>
        </div>
      </div>

      <div className="relative h-[360px] md:h-[480px] bg-paper border-4 border-navy shadow-[8px_8px_0_#0F2540] p-4 overflow-hidden">
        {/* Wall */}
        <div className="absolute top-0 left-0 right-0 h-[70%] bg-gradient-to-b from-paper to-cream-dark" />

        {/* Sign */}
        <div className="absolute top-[30px] left-[30px] bg-paper border-[3px] border-navy py-2 px-3 font-pixel text-[8px] text-navy rotate-[-2deg] z-[2]">
          DUNDER<br />MIFFLIN
        </div>

        {/* Window */}
        <div className="absolute top-[30px] right-[40px] w-[100px] h-[80px] bg-gradient-to-b from-[#87B5D9] to-[#C8DDED] border-4 border-brown shadow-[inset_0_0_0_2px_#FAF1E0] z-[2]">
          <div className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-brown -translate-x-1/2" />
          <div className="absolute top-1/2 left-0 right-0 h-[4px] bg-brown -translate-y-1/2" />
        </div>

        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-beige border-t-4 border-brown">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent 0 47px, #6B4E32 47px 48px), repeating-linear-gradient(0deg, transparent 0 23px, #6B4E32 23px 24px)",
            }}
          />
        </div>

        {/* Desk */}
        <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[280px] h-[80px] bg-brown border-4 border-navy-dark z-[3]">
          <div className="absolute bottom-[-40px] left-[10px] w-[20px] h-[40px] bg-brown border-4 border-navy-dark border-t-0" />
          <div className="absolute bottom-[-40px] right-[10px] w-[20px] h-[40px] bg-brown border-4 border-navy-dark border-t-0" />
        </div>

        {/* Computer */}
        <div className="absolute bottom-[28%] left-1/2 translate-x-[-30%] w-[60px] h-[50px] bg-cream-dark border-[3px] border-navy-dark z-[4]">
          <div
            className="absolute inset-[4px] bg-navy"
            style={{
              backgroundImage:
                "linear-gradient(0deg, transparent 50%, rgba(255,255,255,0.05) 50%)",
              backgroundSize: "100% 4px",
            }}
          />
        </div>

        {/* Michael sprite — wrapper centers; image sized by height + w-auto (fixed width was shrinking wide sprites via object-contain) */}
        <div
          className="absolute bottom-[18%] left-1/2 z-[5] w-max -translate-x-1/2 cursor-pointer"
          onClick={onMichaelTap}
        >
          <Image
            src="/sprites/michael.png"
            alt="Michael Scott"
            width={120}
            height={180}
            unoptimized
            className="h-[220px] w-auto max-h-[42vh] object-bottom md:h-[260px] md:max-h-none animate-bob [image-rendering:pixelated]"
          />
        </div>

        {/* Speech bubble — above head; offsets track taller sprite (220 / 260) */}
        <SpeechBubble
          tailAlign="center"
          className="absolute left-1/2 z-[5] max-w-[180px] -translate-x-1/2 top-[max(6px,calc(82%-262px))] md:top-[max(6px,calc(82%-318px))]"
        >
          WORLD&apos;S BEST<br />BACKEND ENGINEER.
        </SpeechBubble>
      </div>
    </section>
  );
}
