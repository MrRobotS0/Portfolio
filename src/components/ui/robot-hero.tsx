"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Robot } from "@/components/ui/robot";

// Spline usa WebGL — carrega só no cliente. Enquanto baixa, mostra o robô SVG.
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <Robot className="h-full w-full" />,
});

// Cena Spline do robô 3D interativo que segue o cursor (nexbot).
const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

/**
 * O robô 3D só aparece a partir de `lg` (ver hero.tsx) e depende de mouse.
 * Como `display:none` não impede o React de montar o componente, o runtime do
 * Spline (~1 MB) e a cena seriam baixados e o WebGL inicializado em todo
 * celular sem nada aparecer na tela — por isso a montagem é decidida em JS.
 * Quem pede menos movimento também fica com o SVG estático.
 */
function useSpline3D() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(desktop.matches && !calm.matches);

    sync();
    desktop.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  return enabled;
}

export function RobotHero({ className }: { className?: string }) {
  const spline3D = useSpline3D();

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* halo verde -> azul atrás do robô, no DNA do portfólio */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), color-mix(in srgb, var(--accent-2) 18%, transparent) 45%, transparent 70%)",
          opacity: 0.55,
        }}
      />

      {spline3D ? (
        <>
          <Spline scene={SCENE} className="!h-full !w-full" />
          {/* cobre a marca "Built with Spline" (canto inferior direito) */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-1 right-1 h-9 w-36 rounded-md bg-bg"
          />
        </>
      ) : (
        <Robot className="h-full w-full" />
      )}
    </div>
  );
}
