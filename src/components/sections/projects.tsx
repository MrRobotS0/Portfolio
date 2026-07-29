import {
  HardHat,
  ThermometerSnowflake,
  Headset,
  Shirt,
  GraduationCap,
  Target,
  TrendingUp,
  Factory,
  ScanBarcode,
  Archive,
  FlaskConical,
  ListChecks,
  Truck,
  Workflow,
  Bot,
  Github,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  HardHat,
  ThermometerSnowflake,
  Headset,
  Shirt,
  GraduationCap,
  Target,
  TrendingUp,
  Factory,
  ScanBarcode,
  Archive,
  FlaskConical,
  ListChecks,
  Truck,
  Workflow,
  Bot,
};

export function Projects() {
  return (
    <section id="projetos" className="relative py-20 md:py-[110px]">
      <div className="wrap">
        <SectionHeading
          label="03 — Portfólio"
          title="Projetos desenvolvidos"
          sub="Soluções reais construídas em ambiente corporativo e acadêmico."
        />

        <div className="grid grid-cols-1 gap-3.5 [grid-auto-flow:dense] md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const Icon = ICONS[p.icon] ?? Workflow;
            const prod = p.badge === "Produção";
            return (
              <Reveal
                key={p.idx}
                delay={(i % 6) * 0.06}
                className={cn(
                  "h-full",
                  p.featured && "md:col-span-2 lg:col-span-2"
                )}
              >
                <TiltCard href={p.href} beam className="h-full p-[26px]">
                  {p.featured ? (
                    <Icon
                      aria-hidden
                      strokeWidth={1}
                      className="pointer-events-none absolute -bottom-4 -right-3 z-0 h-[150px] w-[150px] text-accent opacity-[0.06]"
                    />
                  ) : null}
                  <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-center justify-between" style={{ marginBottom: "18px" }}>
                    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] border border-line text-accent transition-colors group-hover:border-[color-mix(in_srgb,var(--accent)_35%,transparent)]">
                      <Icon size={18} />
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "mono whitespace-nowrap rounded-full border px-2.5 py-[3px] text-[0.58rem] font-medium uppercase tracking-[0.06em]",
                          prod
                            ? "text-accent"
                            : "border-line text-txt-mut"
                        )}
                        style={
                          prod
                            ? {
                                borderColor:
                                  "color-mix(in srgb, var(--accent) 32%, transparent)",
                              }
                            : undefined
                        }
                      >
                        {p.badge}
                      </span>
                      <span
                        className={cn(
                          "mono flex items-center gap-1.5 text-[0.76rem]",
                          p.href
                            ? "text-txt-mut transition-colors group-hover:text-accent"
                            : "text-txt-dim"
                        )}
                      >
                        {p.href ? <Github size={13} /> : null}
                        {p.idx}
                        {p.href ? (
                          <ArrowUpRight
                            size={13}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        ) : null}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-display mb-[7px] text-[1.1rem] font-semibold">
                    {p.title}
                  </h4>
                  <p className="mb-4 text-[0.88rem] text-txt-mut">{p.desc}</p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="mono rounded-md border border-line px-2.5 py-[3px] text-[0.7rem] text-txt-mut"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
