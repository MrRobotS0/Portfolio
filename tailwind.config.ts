import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        "line-2": "var(--line-2)",
        txt: "var(--txt)",
        "txt-soft": "var(--txt-soft)",
        "txt-mut": "var(--txt-mut)",
        "txt-dim": "var(--txt-dim)",
        accent: "var(--accent)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card: "var(--r)",
      },
      maxWidth: {
        wrap: "1120px",
      },
      keyframes: {
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        caret: {
          "50%": { opacity: "0" },
        },
        drift: {
          to: { transform: "translate(34px, -22px)" },
        },
        drift2: {
          to: { transform: "translate(-30px, 20px)" },
        },
        "name-sheen": {
          "0%": { backgroundPosition: "125% 0" },
          "100%": { backgroundPosition: "-25% 0" },
        },
        aurora: {
          "0%,100%": { transform: "translate(0,0) rotate(0deg) scale(1)" },
          "33%": { transform: "translate(6%, -8%) rotate(40deg) scale(1.15)" },
          "66%": { transform: "translate(-6%, 6%) rotate(-30deg) scale(0.9)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - var(--marquee-gap)/2))" },
        },
        "beam-spin": {
          to: { "--beam-angle": "360deg" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        "grid-fade": {
          "0%,100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        blink: "blink 2s cubic-bezier(0.4,0,0.2,1) infinite",
        caret: "caret 1.1s step-end infinite",
        drift: "drift 15s cubic-bezier(0.4,0,0.2,1) infinite alternate",
        drift2: "drift2 18s cubic-bezier(0.4,0,0.2,1) infinite alternate",
        "name-sheen": "name-sheen 6.5s cubic-bezier(0.4,0,0.2,1) infinite",
        aurora: "aurora 18s ease-in-out infinite",
        "beam-spin": "beam-spin 3s linear infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
