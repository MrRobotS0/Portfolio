"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Copy, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";

const EMAIL = "guilhermebelinelo@outlook.com";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyMail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard indisponível — silencioso */
    }
  }

  return (
    <section id="contato" className="relative py-20 md:py-[110px]">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-[20px] border border-line bg-surface px-6 py-[52px] text-center md:px-10 md:py-[72px]">
            {/* glow sutil de fundo na cor da seção */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%)",
              }}
            />

            <div className="relative">
              <Image
                src="/eu.webp"
                alt="Foto de Guilherme Belinelo"
                width={96}
                height={96}
                className="mx-auto mb-6 h-24 w-24 rounded-full border border-line-2 object-cover"
              />
              <span className="mono mb-3.5 inline-flex items-center justify-center gap-2.5 text-[0.78rem] uppercase tracking-[0.06em] text-accent">
                <span className="grad-line inline-block h-px w-[26px]" />
                05 — Contato
              </span>
              <h2 className="font-display mb-3.5 text-[clamp(1.9rem,4.5vw,3rem)] font-semibold">
                Vamos conectar?
              </h2>
              <p className="mx-auto mb-8 max-w-[480px] text-base text-txt-mut">
                Estou sempre aberto a novas oportunidades, colaborações e bate-papos sobre
                tecnologia. Sinta-se à vontade para entrar em contato.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Magnetic>
                  <a
                    href="https://linkedin.com/in/guilherme-belinelo-7591b5307/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display inline-flex items-center gap-2.5 rounded-xl border border-accent bg-accent px-6 py-3.5 text-[0.94rem] font-semibold text-[#0a0a0b] transition-transform hover:-translate-y-0.5"
                  >
                    <Linkedin size={16} /> LinkedIn
                  </a>
                </Magnetic>
                <a
                  href="https://github.com/MrRobotS0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display inline-flex items-center gap-2.5 rounded-xl border border-line px-6 py-3.5 text-[0.94rem] font-medium text-txt transition-all hover:-translate-y-0.5 hover:border-line-2"
                >
                  <Github size={16} /> GitHub
                </a>
                <button
                  onClick={copyMail}
                  className="font-display inline-flex items-center gap-2.5 rounded-xl border border-line px-6 py-3.5 text-[0.94rem] font-medium text-txt transition-all hover:-translate-y-0.5 hover:border-line-2"
                >
                  <Copy size={16} /> Copiar e-mail
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* TOAST */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ y: 110, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 110, x: "-50%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-6 left-1/2 z-[200] flex items-center gap-2.5 rounded-xl border border-line-2 bg-surface py-3 text-[0.88rem] text-txt"
            style={{ paddingLeft: "18px", paddingRight: "18px" }}
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 size={16} className="text-accent" /> E-mail copiado!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
