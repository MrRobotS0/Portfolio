import { ArrowRight, Send } from "lucide-react";
import { Aurora } from "@/components/ui/aurora";
import { SpotlightBg } from "@/components/ui/spotlight-bg";
import { Typing } from "@/components/ui/typing";
import { Magnetic } from "@/components/ui/magnetic";
import { RobotHero } from "@/components/ui/robot-hero";

const ROLES = [
  "Analista de Sistemas Jr.",
  "Full-Stack Developer",
  "C# & .NET Enthusiast",
  "PHP & React Developer",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden pt-[var(--nav-h)]"
    >
      <SpotlightBg />
      <Aurora />

      <div className="wrap relative z-[1] grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mono mb-4 text-[0.92rem] text-accent">{"// olá, eu sou"}</p>

          <h1 className="text-sheen font-display text-[clamp(2.8rem,8vw,6rem)] font-bold leading-[0.98] tracking-[-0.04em]">
            Guilherme Belinelo
          </h1>

          <h2 className="font-display mb-6 mt-5 min-h-[1.3em] text-[clamp(1.15rem,3vw,2rem)] font-medium text-txt-soft">
            <Typing strings={ROLES} />
          </h2>

          <p className="mb-9 max-w-[540px] text-[1.05rem] text-txt-mut">
            Desenvolvedor Full-Stack com experiência em aplicações web e mobile.
            Especialista no ecossistema <strong className="font-semibold text-txt-soft">.NET</strong>,{" "}
            <strong className="font-semibold text-txt-soft">PHP</strong>,{" "}
            <strong className="font-semibold text-txt-soft">React</strong> e bancos de dados relacionais.
          </p>

          <div className="flex flex-wrap gap-3.5">
            <Magnetic>
              <a
                href="#projetos"
                className="font-display inline-flex items-center gap-2.5 rounded-xl border border-accent bg-accent px-6 py-3.5 text-[0.94rem] font-semibold text-[#0a0a0b] transition-transform hover:-translate-y-0.5"
              >
                Ver Projetos <ArrowRight size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contato"
                className="font-display inline-flex items-center gap-2.5 rounded-xl border border-line bg-transparent px-6 py-3.5 text-[0.94rem] font-medium text-txt transition-all hover:-translate-y-0.5 hover:border-line-2"
              >
                Contato <Send size={16} />
              </a>
            </Magnetic>
          </div>
        </div>

        <RobotHero className="hidden h-[340px] w-full justify-self-center md:h-[420px] lg:block lg:h-[480px]" />
      </div>

      <div className="mono absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-[0.68rem] uppercase tracking-[0.18em] text-txt-dim md:block">
        Scroll ↓
      </div>
    </section>
  );
}
