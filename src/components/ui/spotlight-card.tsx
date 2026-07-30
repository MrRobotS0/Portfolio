"use client";

import React, { useRef, type ReactNode, type PointerEvent } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "green" | "cyan" | "accent";
  href?: string;
}

// hue base/spread — mantidos na família verde -> azul do site
const glowColorMap: Record<
  NonNullable<GlowCardProps["glowColor"]>,
  { base: number; spread: number }
> = {
  accent: { base: 140, spread: 110 }, // verde (140) -> azul (250)
  green: { base: 135, spread: 60 },
  cyan: { base: 175, spread: 55 },
  blue: { base: 210, spread: 40 },
};

/**
 * Spotlight / GlowCard — holofote que segue o cursor iluminando a borda e o
 * fundo do card. Coordenadas locais (funciona sob transform/animação), hue na
 * família verde->azul do site. O CSS de [data-glow] vive em globals.css.
 */
const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "accent",
  href,
}) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const { base, spread } = glowColorMap[glowColor];

  function syncPointer(e: PointerEvent<HTMLElement>) {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", (e.clientX - r.left).toFixed(1));
    el.style.setProperty("--y", (e.clientY - r.top).toFixed(1));
    el.style.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(3));
  }

  const style = {
    "--base": base,
    "--spread": spread,
    "--border": "1.5",
    "--size": "260",
    "--saturation": "75",
    backgroundColor: "hsl(240 6% 6.7% / 0.92)",
    position: "relative",
    touchAction: "none",
  } as React.CSSProperties;

  const common = {
    ref: cardRef as React.Ref<never>,
    "data-glow": true,
    onPointerMove: syncPointer,
    style,
    className: `relative flex flex-col rounded-[14px] backdrop-blur-[3px] ${className}`,
  };

  if (href) {
    return (
      <a
        {...common}
        href={href}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return <div {...common}>{children}</div>;
};

export { GlowCard };
