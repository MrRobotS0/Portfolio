"use client";

import { useEffect, useRef } from "react";

/**
 * Orbe de partículas — pontos distribuídos numa esfera (Fibonacci) que gira
 * lentamente no eixo Y, com profundidade (tamanho/opacidade por z) e degradê
 * verde → azul. Canvas puro, sem dependências. Respeita prefers-reduced-motion.
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

    // pontos na superfície da esfera (esfera de Fibonacci)
    const N = 360;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2; // 1 -> -1
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * golden;
      pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    const GREEN = [74, 222, 128];
    const BLUE = [59, 130, 246];
    const lerp = (a: number[], b: number[], t: number) =>
      a.map((v, i) => Math.round(v + (b[i] - v) * t));

    let raf = 0;
    let t = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = el.clientWidth || 300;
      el.width = size * dpr;
      el.height = size * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    function draw() {
      const w = el.clientWidth || 300;
      const h = el.clientHeight || 300;
      const cx = w / 2;
      const cy = h / 2;
      const R = w * 0.42;

      g.clearRect(0, 0, w, h);
      t += reduce ? 0 : 0.0022;
      const cosA = Math.cos(t);
      const sinA = Math.sin(t);

      const proj = pts
        .map((p) => {
          const x = p.x * cosA - p.z * sinA;
          const z = p.x * sinA + p.z * cosA;
          return { x, y: p.y, z };
        })
        .sort((a, b) => a.z - b.z);

      for (const p of proj) {
        const depth = (p.z + 1) / 2; // 0 (trás) -> 1 (frente)
        const sx = cx + p.x * R;
        const sy = cy + p.y * R;
        const size = 0.5 + depth * 1.9;
        const alpha = 0.12 + depth * 0.72;
        const mix = (p.y + 1) / 2; // topo (verde) -> base (azul)
        const c = lerp(GREEN, BLUE, 1 - mix);
        g.beginPath();
        g.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
        g.arc(sx, sy, size, 0, Math.PI * 2);
        g.fill();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    }

    draw();
    if (reduce) draw(); // frame estático

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* halo suave atrás do orbe */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 62%)",
          opacity: 0.6,
        }}
      />
      <canvas ref={canvasRef} className="relative h-full w-full" />
    </div>
  );
}
