"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "sobre", label: "Sobre", n: "01" },
  { id: "trajetoria", label: "Trajetória", n: "02" },
  { id: "projetos", label: "Projetos", n: "03" },
  { id: "skills", label: "Skills", n: "04" },
  { id: "contato", label: "Contato", n: "05" },
];

const SOCIAL = [
  { href: "https://linkedin.com/in/guilherme-belinelo-7591b5307/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com/MrRobotS0", label: "GitHub", Icon: Github },
  { href: "mailto:guilhermebelinelo@outlook.com", label: "E-mail", Icon: Mail },
];

// espelha o degradê verde -> azul do globals.css
const ACCENTS: Record<string, string> = {
  hero: "#4ade80",
  sobre: "#34d399",
  trajetoria: "#2dd4bf",
  projetos: "#22c3d6",
  skills: "#38bdf8",
  contato: "#3b82f6",
};

export function SiteChrome() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // A barra de progresso muda a cada frame de scroll: vai direto no style
  // (transform, só compositor) em vez de re-renderizar o componente inteiro.
  const onScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 30);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    }

    let cur = "hero";
    document.querySelectorAll<HTMLElement>("section[id]").forEach((s) => {
      if (y >= s.offsetTop - 130) cur = s.id;
    });
    setActive(cur);
  }, []);

  useEffect(() => {
    let raf = 0;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };
    window.addEventListener("scroll", handler, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", handler);
      cancelAnimationFrame(raf);
    };
  }, [onScroll]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen]);

  const accent = ACCENTS[active] ?? ACCENTS.hero;

  return (
    <>
      {/* barra de progresso de leitura */}
      <div
        ref={barRef}
        className="fixed inset-x-0 top-0 z-[110] h-0.5 origin-left transition-colors duration-500"
        style={{ transform: "scaleX(0)", background: accent }}
      />

      {/* NAV */}
      <nav
        style={{ ["--accent" as string]: accent }}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] flex h-[var(--nav-h)] items-center border-b transition-colors duration-300",
          scrolled
            ? "border-line bg-bg/80 backdrop-blur-md"
            : "border-transparent"
        )}
      >
        <div className="wrap flex items-center justify-between">
          <a
            href="#hero"
            className="font-display flex items-center gap-3 text-base font-semibold text-txt"
          >
            <Image
              src="/logo.png"
              alt="Belinelo.dev"
              width={32}
              height={32}
              className="h-8 w-8 rounded-[9px]"
              priority
            />
            <span>
              Belinelo<span className="text-accent">.dev</span>
            </span>
          </a>

          <div className="hidden items-center gap-0.5 md:flex">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-[0.88rem] transition-colors",
                  active === item.id
                    ? "text-txt"
                    : "text-txt-mut hover:text-txt"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3.5 bottom-1 h-px origin-left bg-accent transition-transform duration-300",
                    active === item.id ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-[9px] border border-line text-txt md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] flex flex-col justify-center bg-bg px-8 pt-[var(--nav-h)] md:hidden"
          >
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "font-display flex items-baseline gap-3.5 border-b border-line py-4 text-[1.7rem] font-semibold transition-colors",
                  active === item.id ? "text-txt" : "text-txt-soft"
                )}
              >
                <span className="mono text-[0.8rem] text-accent">{item.n}</span>
                {item.label}
              </a>
            ))}

            <div className="mt-10 flex items-center gap-3">
              {SOCIAL.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-txt-mut transition-colors hover:border-line-2 hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RAIL SOCIAL */}
      <aside className="fixed bottom-0 left-7 z-[80] hidden flex-col items-center gap-[18px] after:mt-1 after:h-20 after:w-px after:bg-line-2 xl:flex">
        {SOCIAL.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="text-txt-mut transition-all hover:-translate-y-0.5 hover:text-accent"
          >
            <Icon size={18} />
          </a>
        ))}
      </aside>
    </>
  );
}
