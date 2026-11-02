import { ArrowRight, Send } from "lucide-react";
import { Aurora } from "@/components/ui/aurora";
import { SpotlightBg } from "@/components/ui/spotlight-bg";
import { Typing } from "@/components/ui/typing";
import { Magnetic } from "@/components/ui/magnetic";
import { RobotHero } from "@/components/ui/robot-hero";
import { GridFloor, LightBeam } from "@/components/ui/hero-stage";
import { Parallax } from "@/components/ui/parallax";

const NAME = ["Guilherme", "Belinelo"];

// atraso de cada peça da entrada (s) — o nome sobe primeiro, o resto vem atrás
const delay = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;

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
      className="relative flex min-h-svh items-center overflow-hidden pb-16 pt-[calc(var(--nav-h)+24px)] lg:pb-0 lg:pt-[var(--nav-h)]"
    >
      <SpotlightBg />
      <Parallax depth={-26}>
        <Aurora />
      </Parallax>

      {/* palco do desktop: feixe de luz sobre o robô + chão em grade */}
      <LightBeam className="right-[4%] top-0 hidden h-[78%] w-[46%] lg:block xl:right-[8%]" />
      <GridFloor className="hero-fade hidden h-[38%] lg:block [--d:0.6s]" />

      <div className="wrap relative z-[1] grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-4">
        <div className="relative z-[2]">
          <div style={delay(0.15)} className="hero-in mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 py-1.5 pl-2.5 pr-3.5 text-[0.78rem] text-txt-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Disponível para novos projetos
          </div>

          <p style={delay(0.25)} className="hero-in mono mb-4 text-[0.92rem] text-accent">
            {"// olá, eu sou"}
          </p>

          {/* cada palavra sobe de dentro de uma máscara */}
          <h1 className="font-display text-[clamp(2.6rem,9vw,6.4rem)] font-bold leading-[0.98] tracking-[-0.045em]">
            {NAME.map((word, i) => (
              <span key={word} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] pr-[0.06em] align-bottom">
                <span style={delay(0.3 + i * 0.12)} className="hero-rise">
                  <span className="text-sheen">{word}</span>
                </span>
                {i < NAME.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <h2 style={delay(0.6)} className="hero-in font-display mb-6 mt-5 min-h-[1.3em] text-[clamp(1.15rem,3vw,2rem)] font-medium text-txt-soft">
            <Typing strings={ROLES} />
          </h2>

          <p style={delay(0.7)} className="hero-in mb-9 max-w-[540px] text-[1rem] text-txt-mut sm:text-[1.05rem]">
            Desenvolvedor Full-Stack com experiência em aplicações web e mobile.
            Especialista no ecossistema <strong className="font-semibold text-txt-soft">.NET</strong>,{" "}
            <strong className="font-semibold text-txt-soft">PHP</strong>,{" "}
            <strong className="font-semibold text-txt-soft">React</strong> e bancos de dados relacionais.
          </p>

          <div style={delay(0.8)} className="hero-in flex flex-wrap gap-3">
            <Magnetic>
              <a href="#projetos" className="btn btn-primary group">
                Ver Projetos
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contato" className="btn">
                Contato <Send size={16} />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* No celular aparece o robô SVG (leve, só CSS) acima do texto; o 3D
            entra só no desktop, grande e vazando a coluna — ver robot-hero.tsx. */}
        <RobotHero className="order-first mx-auto h-[210px] w-full max-w-[240px] sm:h-[260px] sm:max-w-[300px] lg:order-none lg:-mr-[18%] lg:h-[min(700px,82svh)] lg:w-[118%] lg:max-w-none" />
      </div>

      <a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        style={delay(1.4)}
        className="hero-fade mono absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 text-[0.66rem] uppercase tracking-[0.2em] text-txt-dim transition-colors hover:text-txt-mut md:flex"
      >
        Scroll
        <span className="relative h-9 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-accent [animation:scroll-cue_1.8s_cubic-bezier(0.4,0,0.2,1)_infinite]" />
        </span>
      </a>
    </section>
  );
}
