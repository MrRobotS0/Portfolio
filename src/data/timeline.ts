export interface TimelineItem {
  date: string;
  title: string;
  chip?: string;
  where: string;
  desc: string;
  current?: boolean;
}

export const experience: TimelineItem[] = [
  {
    date: "05/2026 — Atual",
    title: "Analista de Sistemas Júnior",
    chip: "ATUAL",
    where: "Colormaq · Araçatuba",
    desc: "Análise, desenvolvimento e manutenção de sistemas corporativos. Atuação Full-Stack com C#/.NET, PHP e React.",
    current: true,
  },
  {
    date: "04/2025 — 04/2026",
    title: "Estágio em T.I",
    where: "Colormaq · Araçatuba",
    desc: "Desenvolvimento Web/Mobile (PHP, React, Python), banco de dados e DevOps. Um ano de experiência que resultou na efetivação como Analista Jr.",
  },
];

export const education: TimelineItem[] = [
  {
    date: "2025 — 2027",
    title: "Superior em ADS",
    chip: "CURSANDO",
    where: "UniToledo Wyden · Araçatuba",
    desc: "Análise e Desenvolvimento de Sistemas.",
    current: true,
  },
  {
    date: "2023 — 2024",
    title: "Técnico em Desenvolvimento",
    where: "Senai · Duque de Caxias",
    desc: "Desenvolvimento de Sistemas completo.",
  },
];

export interface CertGroup {
  source: string;
  highlight?: boolean;
  items: string[];
}

export const certGroups: CertGroup[] = [
  {
    source: "BluePex",
    highlight: true,
    items: [
      "BluePex Certified Cybersecurity Framework Professional",
      "BluePex Essentials | Certificação em Redes",
    ],
  },
  {
    source: "Senai",
    items: [
      "Microsoft Power BI",
      "Lógica de Programação",
      "Web 3.0",
      "Desvendando a Blockchain",
      "Desvendando o 5G",
      "Indústria 4.0",
      "Privacidade e LGPD",
      "Tecnologia da Informação",
      "Excel Básico",
      "Finanças Pessoais",
      "Mundo do Trabalho",
    ],
  },
];
