"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Robô mascote — SVG original, animado (flutua, olhos piscam, antena pulsa),
 * tingido no degradê verde -> azul do portfólio. Leve, sem WebGL.
 */
export function Robot({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={className}>
      <motion.div
        aria-hidden
        className="relative h-full w-full"
        animate={reduce ? {} : { y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* halo atrás do robô */}
        <div
          className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent) 34%, transparent), transparent 68%)",
            opacity: 0.6,
          }}
        />

        <motion.svg
          viewBox="0 0 240 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative mx-auto h-full w-auto max-w-full drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
          animate={reduce ? {} : { rotate: [-2.2, 2.2, -2.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="rb-accent" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--accent)" />
              <stop offset="1" stopColor="var(--accent-2)" />
            </linearGradient>
            <linearGradient id="rb-metal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#17171b" />
              <stop offset="1" stopColor="#0c0c0e" />
            </linearGradient>
            <radialGradient id="rb-face" cx="0.5" cy="0.4" r="0.7">
              <stop offset="0" stopColor="#0b0d12" />
              <stop offset="1" stopColor="#050507" />
            </radialGradient>
          </defs>

          {/* antena */}
          <line x1="120" y1="30" x2="120" y2="52" stroke="var(--line-2)" strokeWidth="3" />
          <motion.circle
            cx="120"
            cy="24"
            r="7"
            fill="url(#rb-accent)"
            animate={reduce ? {} : { opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* orelhas / fones */}
          <rect x="40" y="96" width="16" height="44" rx="7" fill="url(#rb-metal)" stroke="var(--line-2)" strokeWidth="2" />
          <rect x="184" y="96" width="16" height="44" rx="7" fill="url(#rb-metal)" stroke="var(--line-2)" strokeWidth="2" />
          <circle cx="48" cy="118" r="3" fill="url(#rb-accent)" />
          <circle cx="192" cy="118" r="3" fill="url(#rb-accent)" />

          {/* cabeça */}
          <rect x="52" y="52" width="136" height="112" rx="30" fill="url(#rb-metal)" stroke="var(--line-2)" strokeWidth="2.5" />

          {/* painel do rosto */}
          <rect x="66" y="70" width="108" height="76" rx="22" fill="url(#rb-face)" stroke="var(--line)" strokeWidth="1.5" />

          {/* olhos (piscam) */}
          <motion.g
            animate={reduce ? {} : { scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.86, 0.9, 0.94, 1], ease: "easeInOut" }}
            style={{ transformOrigin: "120px 104px" }}
          >
            <circle cx="98" cy="104" r="11" fill="url(#rb-accent)" />
            <circle cx="142" cy="104" r="11" fill="url(#rb-accent)" />
            <circle cx="98" cy="104" r="11" fill="var(--accent)" opacity="0.35" />
            <circle cx="142" cy="104" r="11" fill="var(--accent)" opacity="0.35" />
          </motion.g>

          {/* boca / visor de ondas */}
          <rect x="100" y="126" width="40" height="6" rx="3" fill="var(--accent)" opacity="0.55" />

          {/* corpo */}
          <rect x="74" y="176" width="92" height="66" rx="20" fill="url(#rb-metal)" stroke="var(--line-2)" strokeWidth="2.5" />
          <rect x="90" y="192" width="60" height="34" rx="12" fill="url(#rb-face)" stroke="var(--line)" strokeWidth="1.5" />
          {/* núcleo pulsante no peito */}
          <motion.circle
            cx="120"
            cy="209"
            r="9"
            fill="url(#rb-accent)"
            animate={reduce ? {} : { opacity: [0.5, 1, 0.5], scale: [0.9, 1.08, 0.9] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "120px 209px" }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
