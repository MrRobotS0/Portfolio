import { cn } from "@/lib/utils";

/**
 * Fundo Aurora — blobs de luz animados na cor da seção (--accent / --accent-2).
 * Usa apenas transform/opacity + blur (performático). Respeita reduced-motion via CSS global.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* blob principal — verde/accent */}
      <div
        className="animate-aurora absolute left-[-6%] top-[10%] h-[520px] w-[520px] rounded-full blur-[60px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 66%)",
          opacity: 0.55,
        }}
      />
      {/* blob secundário — azul/accent-2 */}
      <div
        className="animate-aurora absolute right-[-8%] top-[38%] h-[460px] w-[460px] rounded-full blur-[60px] [animation-delay:-6s] [animation-duration:22s]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-2) 26%, transparent), transparent 66%)",
          opacity: 0.42,
        }}
      />
      {/* brilho central sutil */}
      <div
        className="animate-aurora absolute left-1/2 top-1/2 h-[360px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] [animation-delay:-11s] [animation-duration:26s]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)",
          opacity: 0.35,
        }}
      />
    </div>
  );
}
