"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  beam?: boolean;
  tilt?: boolean;
  maxTilt?: number;
}

/**
 * Card com efeito premium:
 *  - spotlight radial que segue o cursor (herda a cor --accent da seção)
 *  - tilt 3D sutil (apenas ponteiro fino, respeita reduced-motion)
 *  - border beam opcional (luz correndo pela borda no hover)
 */
export function TiltCard({
  children,
  className,
  href,
  beam = false,
  tilt = true,
  maxTilt = 5,
}: TiltCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  function handleMove(e: PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (tilt && !reduce && e.pointerType === "mouse") {
      el.style.setProperty("--rx", `${(py - 0.5) * -maxTilt}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * maxTilt}deg`);
    }
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  const common = {
    ref: ref as React.Ref<never>,
    onPointerMove: handleMove,
    onPointerLeave: handleLeave,
    className: cn(
      "card-glow group relative block rounded-card border border-line bg-surface transition-[transform,border-color] duration-200 will-change-transform hover:border-line-2",
      className
    ),
    style: {
      transform:
        "perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
      transformStyle: "preserve-3d" as const,
    },
  };

  const inner = (
    <>
      {children}
      {beam ? <span aria-hidden className="beam" /> : null}
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        {...common}
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <article {...common}>{inner}</article>
  );
}
