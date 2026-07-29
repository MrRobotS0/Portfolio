import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  sub?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  sub,
  center = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-[52px]", center && "text-center", className)}>
      <span
        className={cn(
          "mono mb-3.5 inline-flex items-center gap-2.5 text-[0.78rem] uppercase tracking-[0.06em] text-accent",
          center && "justify-center"
        )}
      >
        <span className="grad-line inline-block h-px w-[26px]" />
        {label}
      </span>
      <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold text-txt">
        {title}
      </h2>
      {sub ? (
        <p
          className={cn(
            "mt-3.5 max-w-[520px] text-base text-txt-mut",
            center && "mx-auto"
          )}
        >
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}
