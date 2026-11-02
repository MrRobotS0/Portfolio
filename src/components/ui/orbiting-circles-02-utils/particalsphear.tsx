"use client";

import { useEffect, useRef } from "react";

/**
 * Orbe de partículas — pontos distribuídos numa esfera (Fibonacci) que gira
 * lentamente no eixo Y, com profundidade (tamanho/opacidade por z) e degradê
 * verde → azul. Canvas puro, sem dependências. Respeita prefers-reduced-motion
 * e só anima enquanto está na tela (e com a aba visível).
 */
export default function ParticleSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    // consts já estreitados (não-nulos) para uso dentro dos closures
    const el = canvas;
    const g = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Pontos na superfície da esfera (Fibonacci). Girando só no eixo Y, o `y`
    // de cada ponto nunca muda — então a cor dele é calculada uma vez só.
    const N = 300;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const px = new Float32Array(N);
    const py = new Float32Array(N);
    const pz = new Float32Array(N);
    const colors: string[] = [];
    const GREEN = [74, 222, 128];
    const BLUE = [59, 130, 246];

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2; // 1 -> -1
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * golden;
      px[i] = Math.cos(theta) * r;
      py[i] = y;
      pz[i] = Math.sin(theta) * r;
      const t = 1 - (y + 1) / 2; // topo (verde) -> base (azul)
      const c = GREEN.map((v, k) => Math.round(v + (BLUE[k] - v) * t));
      colors.push(`rgb(${c[0]},${c[1]},${c[2]})`);
    }

    // buffers reaproveitados entre frames (zero alocação no loop)
    const rx = new Float32Array(N);
    const rz = new Float32Array(N);
    const order = Array.from({ length: N }, (_, i) => i);

    let raf = 0;
    let t = 0;
    let visible = false;
    let w = 0;
    let h = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth || 300;
      h = el.clientHeight || 300;
      el.width = w * dpr;
      el.height = h * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!raf) draw(); // repinta o frame atual se estiver pausado
    }

    function draw() {
      const cx = w / 2;
      const cy = h / 2;
      const R = w * 0.42;
      const cosA = Math.cos(t);
      const sinA = Math.sin(t);

      for (let i = 0; i < N; i++) {
        rx[i] = px[i] * cosA - pz[i] * sinA;
        rz[i] = px[i] * sinA + pz[i] * cosA;
      }
      order.sort((a, b) => rz[a] - rz[b]);

      g.clearRect(0, 0, w, h);
      for (let k = 0; k < N; k++) {
        const i = order[k];
        const depth = (rz[i] + 1) / 2; // 0 (trás) -> 1 (frente)
        g.globalAlpha = 0.12 + depth * 0.72;
        g.fillStyle = colors[i];
        g.beginPath();
        g.arc(cx + rx[i] * R, cy + py[i] * R, 0.5 + depth * 1.9, 0, Math.PI * 2);
        g.fill();
      }
      g.globalAlpha = 1;
    }

    function loop() {
      t += 0.0022;
      draw();
      raf = requestAnimationFrame(loop);
    }

    function sync() {
      const run = visible && !document.hidden && !reduce;
      if (run && !raf) raf = requestAnimationFrame(loop);
      if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* halo suave atrás do orbe (degradê puro, sem filtro) */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 64%)",
        }}
      />
      <canvas ref={canvasRef} className="relative h-full w-full" />
    </div>
  );
}
