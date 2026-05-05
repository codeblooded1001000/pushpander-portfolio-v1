interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
  /** Tail anchor: `center` for bubbles above a centered character */
  tailAlign?: "left" | "center";
}

export default function SpeechBubble({
  children,
  className = "",
  tailAlign = "left",
}: SpeechBubbleProps) {
  const tailPosition =
    tailAlign === "center" ? "left-1/2 -translate-x-1/2" : "left-[30px]";

  return (
    <div
      className={`relative bg-paper border-[3px] border-navy py-[10px] px-[14px] font-pixel text-[9px] text-navy leading-[1.6] shadow-[4px_4px_0_#0F2540] ${className}`}
    >
      {children}
      <div
        className={`absolute bottom-[-14px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-navy ${tailPosition}`}
      />
    </div>
  );
}
