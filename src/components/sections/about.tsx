import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const INFO: { k: string; v: string; on?: boolean }[] = [
  { k: "Idade", v: "19 anos" },
  { k: "Local", v: "Araçatuba, SP" },
  { k: "Cargo", v: "Analista de Sistemas Jr." },
  { k: "Empresa", v: "Colormaq" },
  { k: "Status", v: "Disponível", on: true },
];

export function About() {
  return (
    <section id="sobre" className="relative py-20 md:py-[110px]">
      <div className="wrap">
        <SectionHeading label="01 — Sobre" title="Quem sou eu" />

        <div className="grid items-start gap-6 md:grid-cols-[1.4fr_1fr]">
          <Reveal className="space-y-[18px]">
            <p className="text-[1.05rem] text-txt-soft">
              Sou um desenvolvedor de 19 anos, residente em{" "}
              <strong className="font-semibold text-txt-soft">Araçatuba-SP</strong>. Atuo como{" "}
              <strong className="font-semibold text-txt-soft">Analista de Sistemas Júnior</strong> na
              Colormaq, com sólida base acadêmica e experiência prática em projetos corporativos e
              universitários.
            </p>
            <p className="text-[1.05rem] text-txt-mut">
              Fascinado por tecnologia, comecei como autodidata em cibersegurança e hoje construo
              soluções completas. Atualmente focado no ecossistema Microsoft (C#, ASP.NET) e no
              desenvolvimento web moderno.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-card border border-line bg-surface p-6">
              {INFO.map((row, i) => (
                <div
                  key={row.k}
                  className={
                    "flex items-center justify-between border-b border-line py-3.5 text-[0.92rem] first:pt-0 last:border-b-0 last:pb-0"
                  }
                >
                  <span className="mono text-[0.74rem] uppercase tracking-[0.05em] text-txt-dim">
                    {row.k}
                  </span>
                  {row.on ? (
                    <span className="flex items-center gap-2 font-medium text-accent">
                      <span className="animate-blink h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_7px_var(--accent)]" />
                      {row.v}
                    </span>
                  ) : (
                    <span className="font-medium text-txt">{row.v}</span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
