"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Desloca os filhos levemente na direção do cursor (profundidade). Um listener
 * por camada, no máximo uma escrita de transform por frame, e só enquanto a
 * camada está na tela — nada de re-render do React.
 */
export function Parallax({
  children,
  depth = 16,
  className,
}: {
  children?: ReactNode;
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let inView = true;

    const apply = () => {
      raf = 0;
      el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      if (!inView) return;
      tx = (e.clientX / window.innerWidth - 0.5) * depth;
      ty = (e.clientY / window.innerHeight - 0.5) * depth;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    io.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [depth]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 transition-transform duration-700 ease-out will-change-transform",
        className
      )}
    >
      {children}
    </div>
  );
}
