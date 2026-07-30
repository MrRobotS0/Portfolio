import { Briefcase, GraduationCap, Building2, Check, ShieldCheck, Network } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { experience, education, certGroups, type TimelineItem } from "@/data/timeline";

function TimelineColumn({
  icon: Icon,
  heading,
  items,
  whereIcon: WhereIcon,
}: {
  icon: typeof Briefcase;
  heading: string;
  items: TimelineItem[];
  whereIcon: typeof Building2;
}) {
  return (
    <Reveal>
      <h3 className="font-display mb-7 flex items-center gap-2.5 text-[1.15rem] font-semibold text-txt-soft">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-accent">
          <Icon size={15} />
        </span>
        {heading}
      </h3>

      <div className="relative">
        {/* linha vertical em degradê verde -> azul */}
        <span
          aria-hidden
          className="grad-line absolute bottom-3 left-[7px] top-2 w-px opacity-40"
        />

        {items.map((item, i) => (
          <div key={i} className="relative pb-7 pl-8 last:pb-0">
            {/* dot */}
            <span
              aria-hidden
              className={
                "absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full " +
                (item.current ? "bg-accent" : "border border-line-2 bg-surface")
              }
              style={
                item.current
                  ? { boxShadow: "0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)" }
                  : undefined
              }
            >
              {item.current ? (
                <span className="h-[15px] w-[15px] animate-ping rounded-full bg-accent opacity-60" />
              ) : (
                <span className="h-1 w-1 rounded-full bg-txt-dim" />
              )}
            </span>

            <div className="rounded-xl border border-line bg-surface/50 p-4 transition-colors hover:border-line-2">
              <div className={"mono text-[0.76rem] " + (item.current ? "text-accent" : "text-txt-mut")}>
                {item.date}
              </div>
              <h4 className="font-display mb-1.5 mt-1.5 flex flex-wrap items-center gap-2.5 text-[1.05rem] font-semibold">
                {item.title}
                {item.chip ? (
                  <span
                    className="mono rounded-full border px-2 py-0.5 text-[0.58rem] font-medium tracking-[0.04em] text-accent"
                    style={{ borderColor: "color-mix(in srgb, var(--accent) 32%, transparent)" }}
                  >
                    {item.chip}
                  </span>
                ) : null}
              </h4>
              <div className="mb-2 flex items-center gap-2 text-[0.88rem] font-medium text-txt-soft">
                <WhereIcon size={13} className="text-txt-dim" />
                {item.where}
              </div>
              <p className="text-[0.88rem] leading-[1.6] text-txt-mut">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export function Timeline() {
  return (
    <section id="trajetoria" className="relative py-20 md:py-[110px]">
      <div className="wrap">
        <SectionHeading label="02 — Trajetória" title="Experiência & Formação" />

        <div className="grid gap-10 md:grid-cols-2">
          <TimelineColumn icon={Briefcase} heading="Experiência" items={experience} whereIcon={Building2} />
          <TimelineColumn icon={GraduationCap} heading="Formação" items={education} whereIcon={GraduationCap} />
        </div>

        {/* CERTIFICAÇÕES */}
        <div className="mt-[72px]">
          <SectionHeading label="Certificações" title="Cursos Complementares" />

          {certGroups.map((group, gi) => (
            <div key={group.source} className={gi > 0 ? "mt-6" : undefined}>
              <Reveal className="mono mb-3 flex items-center gap-2.5 text-[0.72rem] uppercase tracking-[0.08em] text-txt-mut before:inline-block before:h-px before:w-[18px] before:bg-line-2 before:content-['']">
                {group.source}
              </Reveal>
              <div className="mb-2 grid gap-2.5 [grid-template-columns:repeat(auto-fill,minmax(210px,1fr))] max-sm:grid-cols-1">
                {group.items.map((cert, i) => {
                  const Icon = group.highlight ? (i === 0 ? ShieldCheck : Network) : Check;
                  return (
                    <Reveal
                      key={cert}
                      delay={(i % 6) * 0.05}
                      className={
                        "flex items-center gap-2.5 rounded-[10px] border px-4 py-3.5 text-[0.88rem] transition-colors " +
                        (group.highlight
                          ? "text-txt hover:border-line-2"
                          : "border-line text-txt-soft hover:border-line-2 hover:text-txt")
                      }
                      style={
                        group.highlight
                          ? {
                              borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
                              background: "color-mix(in srgb, var(--accent) 6%, transparent)",
                            }
                          : undefined
                      }
                    >
                      <Icon size={14} className="shrink-0 text-accent" />
                      <span>{cert}</span>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
