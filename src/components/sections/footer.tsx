"use client";

import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-line py-[30px]">
      <div className="wrap flex flex-wrap items-center justify-between gap-4">
        <small className="mono text-[0.78rem] text-txt-dim">
          © 2026 Guilherme Belinelo
        </small>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mono flex items-center gap-2 text-[0.76rem] text-txt-mut transition-colors hover:text-accent"
        >
          Voltar ao topo <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
