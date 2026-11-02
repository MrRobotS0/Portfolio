"use client";

import React, { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiJavascript,
  SiSharp,
  SiDotnet,
  SiNodedotjs,
  SiNestjs,
  SiPhp,
  SiPython,
  SiFlutter,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiLinux,
} from "react-icons/si";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

interface OrbitIcon {
  Icon: IconType;
  label: string;
}

interface Orbit {
  size: string;
  duration: number;
  icons: OrbitIcon[];
}

const orbits: Orbit[] = [
  {
    size: "w-[17rem] h-[17rem] sm:w-[20rem] sm:h-[20rem] md:w-[29rem] md:h-[29rem]",
    duration: 34,
    icons: [
      { Icon: SiReact, label: "React" },
      { Icon: SiTypescript, label: "TypeScript" },
      { Icon: SiNextdotjs, label: "Next.js" },
      { Icon: SiJavascript, label: "JavaScript" },
    ],
  },
  {
    size: "w-[24rem] h-[24rem] sm:w-[28rem] sm:h-[28rem] md:w-[40rem] md:h-[40rem]",
    duration: 46,
    icons: [
      { Icon: SiSharp, label: "C#" },
      { Icon: SiDotnet, label: ".NET" },
      { Icon: SiNodedotjs, label: "Node.js" },
      { Icon: SiNestjs, label: "NestJS" },
      { Icon: SiPhp, label: "PHP" },
    ],
  },
  {
    size: "w-[31rem] h-[31rem] sm:w-[36rem] sm:h-[36rem] md:w-[51rem] md:h-[51rem]",
    duration: 58,
    icons: [
      { Icon: SiPython, label: "Python" },
      { Icon: SiFlutter, label: "Flutter" },
      { Icon: SiPostgresql, label: "PostgreSQL" },
      { Icon: SiDocker, label: "Docker" },
      { Icon: SiGit, label: "Git" },
      { Icon: SiLinux, label: "Linux" },
    ],
  },
];

export default function OrbitingTechGlobe() {
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);

  // 30 animações infinitas não precisam girar enquanto a seção está fora da tela
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex h-[19rem] w-full justify-center overflow-hidden sm:h-[21rem] md:h-[29rem]"
      style={{ "--orbit-state": running ? "running" : "paused" } as React.CSSProperties}
    >
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)) }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) - 360deg)) }
        }
        @keyframes counter-cw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) }
        }
        @keyframes counter-ccw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) }
        }
      `}</style>

      {/* Orbe de partículas no centro (subindo pela base) */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 aspect-square w-[13rem] -translate-x-1/2 translate-y-1/2 md:w-[22rem]">
        <ParticleSphereAnimation />
      </div>

      {/* Anéis orbitais */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";
        const step = 360 / orbit.icons.length;

        return (
          <div
            key={index}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-line ${orbit.size}`}
          >
            {orbit.icons.map(({ Icon, label }, iconIndex) => {
              const angle = iconIndex * step;
              return (
                <div
                  key={label}
                  className="absolute left-1/2 top-0 -ml-12 flex h-1/2 w-24 origin-bottom flex-col items-center justify-start"
                  style={
                    {
                      "--start-angle": `${angle}deg`,
                      animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                      animationPlayState: "var(--orbit-state)",
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="-mt-9 flex flex-col items-center gap-1.5"
                    style={
                      {
                        "--counter-offset": `${-angle}deg`,
                        animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                        animationPlayState: "var(--orbit-state)",
                      } as React.CSSProperties
                    }
                  >
                    <span className="mono whitespace-nowrap rounded bg-bg/90 px-1.5 py-0.5 text-[0.6rem] leading-none text-txt-mut">
                      {label}
                    </span>
                    <div
                      className="group relative z-10 flex items-center justify-center rounded-full border border-line bg-surface p-2 text-txt-soft sm:p-2.5 transition-colors duration-300 hover:border-line-2 hover:text-txt md:p-3"
                      title={label}
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-7 md:w-7" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
