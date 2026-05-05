interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function PixelCard({ children, className = "", hover = false }: PixelCardProps) {
  return (
    <div
      className={`bg-paper border-4 border-navy shadow-[6px_6px_0_#0F2540] p-6 transition-all duration-100 ${
        hover
          ? "hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0_#0F2540]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
