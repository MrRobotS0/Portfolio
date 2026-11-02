"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";
import { Robot } from "@/components/ui/robot";
import { Portal } from "@/components/ui/hero-stage";

// Spline usa WebGL — carrega só no cliente, e só quando o hero está à vista.
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

// Cena Spline do robô 3D interativo que segue o cursor (nexbot).
const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

// Por padrão a cena publicada renderiza no DPR nativo (2x/3x em telas retina =
// 4-9x mais pixels). Para um robô decorativo, 1.25 é visualmente igual e bem
// mais barato; se a máquina sofrer, a qualidade adaptativa desce para 1.
const START_DPR = 1.25;
const LOW_DPR = 1;

// Qualidade adaptativa: mede o FPS da página logo depois que a cena entra.
const SAMPLE_MS = 2000;
const FPS_LOWER_DPR = 45;
const FPS_GIVE_UP = 28;

// Sem interação, o 3D entra sozinho depois deste tempo do `load`.
const AUTO_MOUNT_MS = 2500;

// Quanto tempo depois do último evento de scroll o render volta.
const SCROLL_IDLE_MS = 180;

// O canvas é mais alto que a caixa e o excesso é cortado por overflow:hidden:
// a marca "Built with Spline" (canto inferior) fica fora da área visível.
const WATERMARK_CLIP = 52;

type SplineApp = Application & {
  // API interna do runtime (1.12.x) — usada em best-effort para o DPR.
  _renderer?: { setPixelRatio?: (value: number) => void };
};

function onIdle(cb: () => void) {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };

  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(cb, { timeout: 1500 });
    return () => w.cancelIdleCallback?.(id);
  }

  const id = window.setTimeout(cb, 300);
  return () => window.clearTimeout(id);
}

/**
 * Espera a página terminar de carregar e o usuário dar sinal de vida (ou um
 * tempo curto passar). Assim os ~3,4 MB do Spline e a compilação de shaders
 * nunca disputam a thread principal com o primeiro paint e a hidratação.
 */
function afterLoadAndIntent(cb: () => void) {
  let done = false;
  let timer = 0;
  const intents = ["pointermove", "pointerdown", "keydown", "scroll", "touchstart"];

  const fire = () => {
    if (done) return;
    done = true;
    cleanup();
    cb();
  };

  const arm = () => {
    timer = window.setTimeout(fire, AUTO_MOUNT_MS);
    intents.forEach((e) => window.addEventListener(e, fire, { passive: true, once: true }));
  };

  const cleanup = () => {
    window.clearTimeout(timer);
    window.removeEventListener("load", arm);
    intents.forEach((e) => window.removeEventListener(e, fire));
  };

  if (document.readyState === "complete") arm();
  else window.addEventListener("load", arm, { once: true });

  return () => {
    done = true;
    cleanup();
  };
}

/** FPS médio da página em uma janela curta (rAF — reflete CPU e GPU). */
function sampleFps(ms: number, cb: (fps: number) => void) {
  let frames = 0;
  let start = 0;
  let raf = 0;

  const tick = (t: number) => {
    if (!start) start = t;
    frames++;
    if (t - start < ms) raf = requestAnimationFrame(tick);
    else cb((frames * 1000) / (t - start));
  };

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

/**
 * Aparelho fraco/rede ruim não aguenta ~3,4 MB (runtime + cena) e um loop WebGL:
 * nesses casos o robô SVG é a melhor experiência possível.
 */
function isCapableDevice() {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  const net = nav.connection;
  if (net?.saveData) return false;
  if (net?.effectiveType && /^(slow-2g|2g|3g)$/.test(net.effectiveType)) return false;
  if ((nav.hardwareConcurrency ?? 8) < 4) return false;
  if ((nav.deviceMemory ?? 8) < 4) return false;

  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    if (!gl) return false;

    // Renderizador em software (SwiftShader/llvmpipe) roda WebGL na CPU: trava.
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info
      ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
      : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();

    return !/swiftshader|llvmpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
}

/**
 * O robô 3D só aparece a partir de `lg` (ver hero.tsx) e depende de mouse.
 * Como `display:none` não impede o React de montar o componente, o runtime do
 * Spline e a cena seriam baixados e o WebGL inicializado em todo celular sem
 * nada aparecer na tela — por isso a montagem é decidida em JS.
 * Quem pede menos movimento ou está num aparelho fraco fica com o SVG.
 */
function useSpline3D() {
  // null = ainda não decidido (SSR / primeiro render)
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let capable: boolean | null = null;

    const sync = () => {
      if (!desktop.matches || calm.matches || !pointer.matches) {
        setAllowed(false);
        return;
      }
      capable ??= isCapableDevice();
      setAllowed(capable);
    };

    sync();
    desktop.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    pointer.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
      pointer.removeEventListener("change", sync);
    };
  }, []);

  return allowed;
}

function setDpr(app: SplineApp, dpr: number) {
  try {
    app._renderer?.setPixelRatio?.(Math.min(window.devicePixelRatio || 1, dpr));
  } catch {
    // API interna: se mudar de versão, segue no DPR padrão da cena.
  }
}

export function RobotHero({ className }: { className?: string }) {
  const capable = useSpline3D();
  // Se a máquina não segurou o 3D, fica no SVG até recarregar a página.
  const [degraded, setDegraded] = useState(false);
  const allowed = capable === true && !degraded;
  // O SVG é o robô de quem NÃO vai ter 3D (celular, aparelho fraco). No desktop
  // ele não aparece como placeholder: trocar um robô cartoon por um realista no
  // meio da tela parece bug. Lá, enquanto a cena baixa, só o halo pulsa.
  const svgOnly = capable === false || degraded;

  const hostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<SplineApp | null>(null);

  // `mounted` só liga uma vez (não vale re-baixar 3,4 MB a cada scroll);
  // `inView` liga/desliga o loop de render enquanto o resto da página rola.
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!allowed || !host) return;

    let cancelWait: (() => void) | undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && !cancelWait) {
          let cancelIdle: (() => void) | undefined;
          const cancelIntent = afterLoadAndIntent(() => {
            cancelIdle = onIdle(() => setMounted(true));
          });
          cancelWait = () => {
            cancelIntent();
            cancelIdle?.();
          };
        }
      },
      { rootMargin: "200px 0px" }
    );

    io.observe(host);
    return () => {
      io.disconnect();
      cancelWait?.();
    };
  }, [allowed]);

  // Voltou para mobile / ligou reduced-motion / degradou: volta pro SVG.
  useEffect(() => {
    if (allowed) return;
    appRef.current = null;
    setMounted(false);
    setLoaded(false);
  }, [allowed]);

  // Fora da tela, em aba de fundo ou durante o scroll, o Spline não gasta frame:
  // rolar a página a partir do hero fica liso porque a GPU fica só pro scroll.
  useEffect(() => {
    const app = appRef.current;
    if (!app || !loaded) return;

    let scrolling = 0;

    const sync = () => {
      if (inView && !document.hidden && !scrolling) app.play();
      else app.stop();
    };

    const onScroll = () => {
      if (!inView) return;
      if (!scrolling) app.stop();
      window.clearTimeout(scrolling);
      scrolling = window.setTimeout(() => {
        scrolling = 0;
        sync();
      }, SCROLL_IDLE_MS);
    };

    sync();
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(scrolling);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("scroll", onScroll);
    };
  }, [inView, loaded]);

  // Qualidade adaptativa: se a página cair de FPS com o 3D, reduz a resolução;
  // se nem assim aguentar, devolve o SVG.
  useEffect(() => {
    const app = appRef.current;
    if (!app || !loaded) return;

    let cancel = () => {};
    const measure = (onResult: (fps: number) => void) => {
      if (document.hidden) return;
      cancel = sampleFps(SAMPLE_MS, onResult);
    };

    measure((fps) => {
      if (fps >= FPS_LOWER_DPR) return;
      setDpr(app, LOW_DPR);
      measure((again) => {
        if (again < FPS_GIVE_UP) setDegraded(true);
      });
    });

    return () => cancel();
  }, [loaded]);

  const handleLoad = useCallback((app: Application) => {
    appRef.current = app as SplineApp;
    setDpr(app as SplineApp, START_DPR);
    setLoaded(true);
  }, []);

  const showSpline = allowed && mounted;

  return (
    <div ref={hostRef} className={`relative ${className ?? ""}`}>
      {/* halo verde -> azul atrás do robô. O degradê radial já é suave por si
          só: sem `filter: blur`, que custaria uma passada de GPU por frame
          debaixo do canvas WebGL. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full ${
          allowed && !loaded ? "animate-pulse" : ""
        }`}
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 20%, transparent) 0%, color-mix(in srgb, var(--accent-2) 10%, transparent) 38%, transparent 66%)",
        }}
      />

      {/* portal de anéis — no desktop, a onda de choque marca a chegada do 3D */}
      <Portal burst={loaded} className="h-[118%] lg:h-[96%]" />

      {/* Antes da decisão (SSR), o SVG só aparece abaixo de `lg` — no celular
          ele já vem no HTML, sem piscar; no desktop espera o veredito. */}
      {!allowed && (
        <Robot
          className={`absolute inset-0 animate-in fade-in duration-500 ${
            svgOnly ? "" : "lg:hidden"
          }`}
        />
      )}

      {showSpline && (
        <div
          aria-hidden
          className={`absolute inset-0 overflow-hidden transition-[opacity,transform] duration-700 ease-out ${
            loaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          // o corpo do robô se dissolve no chão em vez de terminar num corte reto
          style={{
            maskImage: "linear-gradient(to bottom, #000 72%, transparent 97%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 72%, transparent 97%)",
          }}
        >
          <Spline
            scene={SCENE}
            onLoad={handleLoad}
            style={{ height: `calc(100% + ${WATERMARK_CLIP}px)` }}
            className="!w-full"
          />
        </div>
      )}
    </div>
  );
}
