"use client";

import React from "react";
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
    size: "w-[20rem] h-[20rem] md:w-[29rem] md:h-[29rem]",
    duration: 34,
    icons: [
      { Icon: SiReact, label: "React" },
      { Icon: SiTypescript, label: "TypeScript" },
      { Icon: SiNextdotjs, label: "Next.js" },
      { Icon: SiJavascript, label: "JavaScript" },
    ],
  },
  {
    size: "w-[28rem] h-[28rem] md:w-[40rem] md:h-[40rem]",
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
    size: "w-[36rem] h-[36rem] md:w-[51rem] md:h-[51rem]",
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
  return (
    <div className="relative flex h-[21rem] w-full justify-center overflow-hidden md:h-[29rem]">
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
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="-mt-9 flex flex-col items-center gap-1.5"
                    style={
                      {
                        "--counter-offset": `${-angle}deg`,
                        animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                      } as React.CSSProperties
                    }
                  >
                    <span className="mono whitespace-nowrap rounded bg-bg/70 px-1.5 text-[0.6rem] leading-none text-txt-mut backdrop-blur-sm">
                      {label}
                    </span>
                    <div
                      className="group relative z-10 flex items-center justify-center rounded-full border border-line bg-surface p-2.5 text-txt-soft transition-colors duration-300 hover:border-line-2 hover:text-txt md:p-3"
                      title={label}
                      aria-label={label}
                    >
                      <Icon className="h-5 w-5 md:h-7 md:w-7" />
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
