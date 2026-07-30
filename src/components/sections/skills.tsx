import { Code2, Server, Database, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import OrbitingTechGlobe from "@/components/ui/orbiting-circles-02";
import { skillGroups } from "@/data/skills";

const ICONS: Record<string, LucideIcon> = { Code2, Server, Database };

export function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-[110px]">
      <div className="wrap">
        <SectionHeading label="04 — Stack" title="Habilidades & Ferramentas" />
      </div>

      {/* orbe orbital com as tecnologias */}
      <Reveal className="mb-4 md:mb-8">
        <OrbitingTechGlobe />
      </Reveal>

      <div className="wrap">
        <div className="grid gap-3.5 md:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = ICONS[group.icon] ?? Code2;
            return (
              <Reveal key={group.title} delay={i * 0.08} className="h-full">
                <TiltCard tilt={false} className="h-full p-7">
                  <div className="mb-5 flex items-center gap-3 border-b border-line pb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-accent">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-display text-[1.05rem] font-semibold">
                        {group.title}
                      </h4>
                      <div className="mono mt-0.5 text-[0.7rem] text-txt-dim">
                        {group.sub}
                      </div>
                    </div>
                  </div>
                  <ul className="m-0 list-none p-0">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 border-b border-line py-2.5 text-[0.92rem] text-txt-soft transition-colors last:border-b-0 last:pb-0 hover:text-txt"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
