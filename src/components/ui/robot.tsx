/**
 * Robô mascote — SVG original, tingido no degradê verde -> azul do portfólio.
 * Animações em CSS puro (flutua, olhos piscam, antena pulsa): rodam no
 * compositor, param sozinhas com `display:none` e respeitam reduced-motion
 * pela regra global — sem JS por frame.
 */
export function Robot({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div aria-hidden className="robot-float relative h-full w-full">
        <svg
          viewBox="0 0 240 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="robot-sway relative mx-auto h-full w-auto max-w-full"
        >
          <defs>
            <linearGradient id="rb-accent" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--accent)" />
              <stop offset="1" stopColor="var(--accent-2)" />
            </linearGradient>
            <linearGradient id="rb-metal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1a1a1f" />
              <stop offset="1" stopColor="#0c0c0e" />
            </linearGradient>
            <radialGradient id="rb-face" cx="0.5" cy="0.4" r="0.7">
              <stop offset="0" stopColor="#0b0d12" />
              <stop offset="1" stopColor="#050507" />
            </radialGradient>
            {/* sombra no chão — elipse com degradê, sem filtro */}
            <radialGradient id="rb-floor" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#000" stopOpacity="0.55" />
              <stop offset="1" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="120" cy="252" rx="62" ry="7" fill="url(#rb-floor)" />

          {/* antena */}
          <line x1="120" y1="30" x2="120" y2="52" stroke="var(--line-2)" strokeWidth="3" />
          <circle className="robot-blip" cx="120" cy="24" r="7" fill="url(#rb-accent)" />

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
          <g className="robot-blink">
            <circle cx="98" cy="104" r="11" fill="url(#rb-accent)" />
            <circle cx="142" cy="104" r="11" fill="url(#rb-accent)" />
            <circle cx="98" cy="104" r="11" fill="var(--accent)" opacity="0.35" />
            <circle cx="142" cy="104" r="11" fill="var(--accent)" opacity="0.35" />
            {/* reflexo */}
            <circle cx="94" cy="100" r="2.5" fill="#fff" opacity="0.55" />
            <circle cx="138" cy="100" r="2.5" fill="#fff" opacity="0.55" />
          </g>

          {/* boca / visor de ondas */}
          <rect x="100" y="126" width="40" height="6" rx="3" fill="var(--accent)" opacity="0.55" />

          {/* corpo */}
          <rect x="74" y="176" width="92" height="66" rx="20" fill="url(#rb-metal)" stroke="var(--line-2)" strokeWidth="2.5" />
          <rect x="90" y="192" width="60" height="34" rx="12" fill="url(#rb-face)" stroke="var(--line)" strokeWidth="1.5" />
          {/* núcleo pulsante no peito */}
          <circle className="robot-core" cx="120" cy="209" r="9" fill="url(#rb-accent)" />
        </svg>
      </div>
    </div>
  );
}
