"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypingProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
}

/** Efeito de digitação em loop (substitui o typed.js). */
export function Typing({
  strings,
  typeSpeed = 55,
  backSpeed = 28,
  backDelay = 1900,
}: TypingProps) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (reduce) {
      setText(strings[0] ?? "");
      return;
    }
    const full = strings[i % strings.length] ?? "";

    if (!deleting && text === full) {
      timer.current = setTimeout(() => setDeleting(true), backDelay);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((v) => (v + 1) % strings.length);
    } else {
      timer.current = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? full.slice(0, prev.length - 1)
              : full.slice(0, prev.length + 1)
          );
        },
        deleting ? backSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timer.current);
  }, [text, deleting, i, strings, typeSpeed, backSpeed, backDelay, reduce]);

  return (
    <>
      <span>{text}</span>
      <span className="animate-caret font-normal text-accent">_</span>
    </>
  );
}
