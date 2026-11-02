import { cn } from "@/lib/utils";

/*
 * Cenário do hero — tudo em CSS, só transform/opacity animados e máscaras
 * estáticas: cada camada é rasterizada uma vez e a GPU só gira/move a textura.
 * As animações (classes .stage-*) vivem em globals.css.
 */

/** Portal de anéis de luz girando atrás do robô. */
export function Portal({ className, burst }: { className?: string; burst?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "stage-portal pointer-events-none absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2",
        className
      )}
    >
      {/* anel externo — arco de energia correndo com um ponto de luz */}
      <div className="stage-spin-slow absolute inset-0">
        <div className="stage-arc absolute inset-0 rounded-full" />
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_3px_var(--accent)]" />
      </div>
      <div className="absolute inset-0 rounded-full border border-line" />

      {/* anel tracejado, sentido contrário */}
      <div className="stage-spin-rev absolute inset-[11%] rounded-full border border-dashed border-line-2 opacity-60" />

      {/* anel de marcações, tipo mostrador */}
      <div className="stage-spin-slower stage-ticks absolute inset-[22%] rounded-full" />

      {/* segundo arco, menor e mais rápido, na cor secundária */}
      <div className="stage-spin-fast absolute inset-[31%]">
        <div className="stage-arc stage-arc-2 absolute inset-0 rounded-full" />
      </div>

      {/* chão de luz sob o robô */}
      <div className="absolute bottom-[14%] left-1/2 h-[10%] w-[52%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_45%,transparent),transparent)]" />

      {/* onda de choque quando o robô 3D chega */}
      {burst ? <div className="stage-burst absolute inset-[18%] rounded-full border-2 border-accent" /> : null}
    </div>
  );
}

/** Feixe de luz descendo do topo sobre o robô. */
export function LightBeam({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("stage-beam pointer-events-none absolute", className)}
      style={{
        background:
          "linear-gradient(to bottom, color-mix(in srgb, var(--accent) 22%, transparent), color-mix(in srgb, var(--accent-2) 6%, transparent) 60%, transparent)",
        clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)",
      }}
    />
  );
}

/** Chão em grade com perspectiva, deslizando rumo ao horizonte. */
export function GridFloor({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden", className)}
      style={{
        perspective: "520px",
        maskImage: "linear-gradient(to top, #000 10%, transparent 85%)",
        WebkitMaskImage: "linear-gradient(to top, #000 10%, transparent 85%)",
      }}
    >
      <div
        className="absolute inset-x-[-50%] bottom-[-10%] h-[140%] origin-bottom"
        style={{ transform: "rotateX(62deg)" }}
      >
        <div
          className="stage-grid absolute inset-x-0 top-[-64px] bottom-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in srgb, var(--accent) 22%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--accent) 22%, transparent) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>
    </div>
  );
}
