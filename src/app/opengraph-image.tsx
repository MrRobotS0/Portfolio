import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_TITLE } from "@/lib/site";

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0a0a0b";
const TXT = "#ededee";
const TXT_SOFT = "#b9babd";
const TXT_MUT = "#7c7d82";
const LINE = "rgba(255,255,255,0.08)";
const ACCENT = "#4ade80";
const ACCENT_2 = "#3b82f6";

const STACK = ["C#", ".NET", "PHP", "React", "Next.js", "Python"];

// As fontes do site (next/font vive dentro do bundle e não é legível aqui),
// lidas do disco no build para o card ficar com a mesma tipografia da página.
const font = (file: string) =>
  readFileSync(join(process.cwd(), "src/assets/fonts", file));

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: BG,
          fontFamily: "Space Grotesk",
          position: "relative",
        }}
      >
        {/* halo verde -> azul, o mesmo gesto do hero */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -200,
            width: 820,
            height: 820,
            display: "flex",
            background: `radial-gradient(circle, ${ACCENT}2e 0%, ${ACCENT_2}1f 42%, ${BG}00 70%)`,
          }}
        />

        {/* faixa de acento no topo: o degradê que percorre as seções do site */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 7,
            display: "flex",
            background: `linear-gradient(90deg, ${ACCENT} 0%, #2dd4bf 40%, #38bdf8 70%, ${ACCENT_2} 100%)`,
          }}
        />

        {/* etiqueta mono, como os rótulos de seção */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 2,
              display: "flex",
              background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_2})`,
            }}
          />
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 24,
              letterSpacing: 4,
              color: ACCENT,
            }}
          >
            BELINELO.DEV
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -3.5,
              lineHeight: 1,
              color: TXT,
            }}
          >
            Guilherme Belinelo
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 38,
              fontWeight: 500,
              color: TXT_SOFT,
            }}
          >
            Full-Stack Developer &amp; Analista de Sistemas
          </div>
        </div>

        {/* stack em mono, separada por pontos no acento */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            paddingTop: 30,
            borderTop: `1px solid ${LINE}`,
            fontFamily: "JetBrains Mono",
            fontSize: 26,
            color: TXT_MUT,
          }}
        >
          {STACK.map((item, i) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 18 }}>
              {i > 0 && (
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    display: "flex",
                    background: ACCENT,
                    opacity: 0.55,
                  }}
                />
              )}
              <div style={{ display: "flex" }}>{item}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: font("SpaceGrotesk-Bold.ttf"), weight: 700, style: "normal" },
        { name: "Space Grotesk", data: font("SpaceGrotesk-Medium.ttf"), weight: 500, style: "normal" },
        { name: "JetBrains Mono", data: font("JetBrainsMono-Regular.ttf"), weight: 400, style: "normal" },
      ],
    }
  );
}
