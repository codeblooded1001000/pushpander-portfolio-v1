interface PixelButtonProps {
  children: React.ReactNode;
  href?: string;
  primary?: boolean;
  className?: string;
  onClick?: () => void;
  download?: boolean;
}

export default function PixelButton({
  children,
  href,
  primary = false,
  className = "",
  onClick,
  download = false,
}: PixelButtonProps) {
  const base = `font-pixel text-[10px] py-[14px] px-5 no-underline border-[3px] transition-all duration-100 cursor-pointer inline-block
    hover:translate-x-[2px] hover:translate-y-[2px]
    active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0_0_0_#0F2540]`;

  const variant = primary
    ? "bg-red text-cream border-red-dark shadow-[4px_4px_0_#A33530] hover:shadow-[2px_2px_0_#A33530]"
    : "bg-cream text-navy-dark border-navy-dark shadow-[4px_4px_0_#0F2540] hover:shadow-[2px_2px_0_#0F2540]";

  if (href) {
    return (
      <a
        href={href}
        className={`${base} ${variant} ${className}`}
        onClick={onClick}
        download={download}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={`${base} ${variant} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
