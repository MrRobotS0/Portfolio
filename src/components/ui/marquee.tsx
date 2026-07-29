import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
}

/** Marquee infinito de tecnologias (pausa no hover). */
export function Marquee({ items, reverse = false, className }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [--marquee-gap:2.5rem]",
        className
      )}
    >
      {/* fade nas bordas */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <div
        className={cn(
          "animate-marquee flex shrink-0 items-center gap-[var(--marquee-gap)] pr-[var(--marquee-gap)] group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="mono whitespace-nowrap text-lg font-medium text-txt-mut transition-colors hover:text-accent"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
