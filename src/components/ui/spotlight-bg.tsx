import { cn } from "@/lib/utils";

/**
 * Fundo estilo ibelick — holofote suave vindo de cima + vinheta de sombra nas
 * bordas, dando profundidade (sensação 3D/iluminado). Sem grid quadriculado.
 */
export function SpotlightBg({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* holofote de cima (na cor da seção) */}
      <div
        className="absolute inset-x-0 top-0 h-[70%]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% -10%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 72%)",
        }}
      />
      {/* brilho de realce bem sutil no centro-topo */}
      <div
        className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 14%, transparent), transparent 68%)",
          opacity: 0.5,
        }}
      />
      {/* vinheta de sombra (profundidade nas bordas e base) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 90% at 50% 0%, transparent 38%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
