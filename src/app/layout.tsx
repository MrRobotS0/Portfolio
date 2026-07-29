import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://belinelo.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Guilherme Belinelo — Full-Stack Developer",
  description:
    "Portfólio de Guilherme Belinelo — Desenvolvedor Full-Stack e Analista de Sistemas. C#/.NET, PHP, React, Python e bancos de dados relacionais.",
  keywords: [
    "Guilherme Belinelo",
    "Desenvolvedor Full-Stack",
    "Analista de Sistemas",
    "C#",
    ".NET",
    "PHP",
    "React",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "Guilherme Belinelo" }],
  icons: { icon: "/logo.png" },
  openGraph: {
    title: "Guilherme Belinelo — Full-Stack Developer",
    description: "Desenvolvedor Full-Stack & Analista de Sistemas.",
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Belinelo.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guilherme Belinelo — Full-Stack Developer",
    description: "Desenvolvedor Full-Stack & Analista de Sistemas.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-br"
      className={`${display.variable} ${sans.variable} ${mono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="grain">{children}</body>
    </html>
  );
}
