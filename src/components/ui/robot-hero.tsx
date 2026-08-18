"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";
import { Robot } from "@/components/ui/robot";

// Spline usa WebGL — carrega só no cliente, e só quando o hero está à vista.
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

// Cena Spline do robô 3D interativo que segue o cursor (nexbot).
const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

// Em telas 2x/3x o Spline renderiza 4-9x mais pixels do que o necessário para
// um robô decorativo. Limitar o DPR é o corte mais barato de custo de GPU.
const MAX_DPR = 1.5;

// Margem para começar a carregar um pouco antes de entrar na tela.
const NEAR_VIEWPORT = "200px 0px";

type SplineApp = Application & {
  // API interna do runtime — usada em best-effort para limitar o DPR.
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
  if (net?.effectiveType && /^(slow-)?2g$/.test(net.effectiveType)) return false;
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
 * Quem pede menos movimento ou está num aparelho fraco fica com o SVG estático.
 */
function useSpline3D() {
  const [allowed, setAllowed] = useState(false);

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

export function RobotHero({ className }: { className?: string }) {
  const allowed = useSpline3D();
  const hostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<SplineApp | null>(null);

  // `mounted` só liga uma vez (não vale re-baixar 3,4 MB a cada scroll);
  // `inView` liga/desliga o loop de render enquanto o resto da página rola.
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [fallbackGone, setFallbackGone] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!allowed || !host) return;

    let cancelIdle: (() => void) | undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        // Inicializar WebGL no meio da hidratação é justamente o que trava a
        // página: espera a thread principal respirar antes de montar.
        if (entry.isIntersecting && !cancelIdle) {
          cancelIdle = onIdle(() => setMounted(true));
        }
      },
      { rootMargin: NEAR_VIEWPORT }
    );

    io.observe(host);
    return () => {
      io.disconnect();
      cancelIdle?.();
    };
  }, [allowed]);

  // Voltou para mobile / ligou reduced-motion: desmonta o 3D e volta pro SVG.
  useEffect(() => {
    if (allowed) return;
    appRef.current = null;
    setMounted(false);
    setLoaded(false);
    setFallbackGone(false);
  }, [allowed]);

  // Só remove o SVG depois do crossfade, para a troca não dar um corte seco.
  useEffect(() => {
    if (!loaded) return;
    const id = window.setTimeout(() => setFallbackGone(true), 320);
    return () => window.clearTimeout(id);
  }, [loaded]);

  // Fora da tela ou em aba de fundo, o Spline não precisa gastar um frame.
  useEffect(() => {
    const app = appRef.current;
    if (!app || !loaded) return;

    const sync = () => {
      if (inView && !document.hidden) app.play();
      else app.stop();
    };

    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [inView, loaded]);

  const handleLoad = useCallback((app: Application) => {
    appRef.current = app as SplineApp;

    try {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      (app as SplineApp)._renderer?.setPixelRatio?.(dpr);
    } catch {
      // API interna: se mudar de versão, segue no DPR padrão da cena.
    }

    setLoaded(true);
  }, []);

  const showSpline = allowed && mounted;

  return (
    <div ref={hostRef} className={`relative ${className ?? ""}`}>
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

      {/* O SVG ocupa o lugar enquanto a cena baixa e sai em crossfade; quando o
          3D assume, ele é desmontado para parar as animações do framer-motion. */}
      {!fallbackGone && (
        <Robot
          className={`absolute inset-0 transition-opacity duration-300 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {showSpline && (
        <div
          aria-hidden
          className={`absolute inset-0 transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Spline scene={SCENE} onLoad={handleLoad} className="!h-full !w-full" />
          {/* cobre a marca "Built with Spline" (canto inferior direito) */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-1 right-1 h-9 w-36 rounded-md bg-bg"
          />
        </div>
      )}
    </div>
  );
}
