/**
 * URL canônica do site, usada em metadata, OG, robots e sitemap.
 *
 * Ordem de resolução:
 *  1. NEXT_PUBLIC_SITE_URL — defina quando houver domínio próprio (ex.: belinelo.dev);
 *  2. VERCEL_PROJECT_PRODUCTION_URL — injetada pela Vercel no build de produção;
 *  3. localhost — desenvolvimento.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_NAME = "Belinelo.dev";
export const SITE_TITLE = "Guilherme Belinelo — Full-Stack Developer";
export const SITE_DESCRIPTION =
  "Portfólio de Guilherme Belinelo — Desenvolvedor Full-Stack e Analista de Sistemas. C#/.NET, PHP, React, Python e bancos de dados relacionais.";
