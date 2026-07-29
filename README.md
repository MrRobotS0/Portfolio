# Belinelo.dev — Portfólio

Portfólio pessoal de Guilherme Belinelo. Redesign ambicioso mantendo a identidade
(preto + degradê **verde → azul** por seção) com componentes avançados de UI/UX.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3** + `tailwindcss-animate`
- **Framer Motion** (animações, scroll reveal, botões magnéticos, tilt)
- **lucide-react** (ícones vetoriais)
- Fontes self-hosted via `next/font`: Space Grotesk · Inter · JetBrains Mono

## Componentes de destaque

- **Aurora** animada + grade de fundo no hero
- **Nome com sheen** e **digitação** em loop
- **Bento grid** de projetos com **spotlight** que segue o cursor, **tilt 3D** e **border beam**
- Cards em destaque com marca d'água do ícone
- **Marquee infinito** de tecnologias nas skills
- Navbar com **scrollspy** + **cor dinâmica por seção** (verde → azul) + barra de progresso
- Reveal com stagger, `prefers-reduced-motion` respeitado

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # build de produção
npm run start    # servir o build
```

## Editar conteúdo

Todo o conteúdo está em arquivos de dados (sem mexer em componente):

- `src/data/projects.ts` — os 15 projetos (título, descrição, tags, badge, link, ícone, `featured`)
- `src/data/skills.ts` — grupos de skills + tecnologias do marquee
- `src/data/timeline.ts` — experiência, formação e certificações

Ícones dos projetos/skills usam nomes do **lucide-react** (ex.: `"Factory"`, `"Bot"`).

## Deploy no Vercel

1. Faça push desta branch para o GitHub.
2. Em [vercel.com/new](https://vercel.com/new), **importe o repositório** `MrRobotS0/Portfolio`.
3. O Vercel detecta Next.js automaticamente — **nenhuma configuração é necessária**.
   (Build: `next build` · Output: `.next`)
4. Deploy. Cada push vira um deploy; PRs/branches ganham **preview** automático.

> **Domínio:** o `metadataBase` em `src/app/layout.tsx` está como `https://belinelo.dev`
> (placeholder). Troque pela URL final (ex.: `https://<projeto>.vercel.app` ou seu domínio)
> depois do primeiro deploy, para os metadados de Open Graph ficarem corretos.

### Desbloqueando back-end (quando quiser)

Com o Vercel você pode adicionar rotas serverless em `src/app/api/*/route.ts`
(ex.: formulário de contato que envia e-mail) — algo impossível no GitHub Pages.

## Rollback

O site estático anterior está preservado em `index.html.bak_20260729` e no histórico do git
(branch `main`, commit `c28e29f`).
