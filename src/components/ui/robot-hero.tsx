"use client";

import dynamic from "next/dynamic";
import { Robot } from "@/components/ui/robot";

// Spline usa WebGL — carrega só no cliente. Enquanto baixa, mostra o robô SVG.
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <Robot className="h-full w-full" />,
});

// Cena Spline do robô 3D interativo que segue o cursor (nexbot).
const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function RobotHero({ className }: { className?: string }) {
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
      <Spline scene={SCENE} className="!h-full !w-full" />

      {/* cobre a marca "Built with Spline" (canto inferior direito) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-1 right-1 h-9 w-36 rounded-md bg-bg"
      />
    </div>
  );
}
