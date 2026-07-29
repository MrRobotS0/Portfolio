export type Badge = "Acadêmico" | "Produção";

export interface Project {
  idx: string;
  title: string;
  desc: string;
  tags: string[];
  badge: Badge;
  /** Lucide icon key, mapped in the Projects component */
  icon: string;
  href?: string;
  /** destaca o card no bento (ocupa 2 colunas no desktop) */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    idx: "01",
    title: "Safe Guard Pro",
    desc: "API para gestão de entrega e controle de EPIs — vincula equipamento, colaborador e validade.",
    tags: ["ASP.NET Core", "C#", "PostgreSQL", "Swagger"],
    badge: "Acadêmico",
    icon: "HardHat",
    href: "https://github.com/MrRobotS0/safeguardpro",
  },
  {
    idx: "02",
    title: "Termosense",
    desc: "App para monitoramento de temperatura via IoT.",
    tags: ["Flutter", "Azure", "ASP.NET API", "C#"],
    badge: "Acadêmico",
    icon: "ThermometerSnowflake",
    href: "https://github.com/Sonegodev/termosense",
  },
  {
    idx: "03",
    title: "Service Desk",
    desc: "Plataforma web para gerenciamento e atendimento de chamados via e-mail.",
    tags: ["React", "TypeScript", "PostgreSQL"],
    badge: "Produção",
    icon: "Headset",
  },
  {
    idx: "04",
    title: "Loja Durk",
    desc: "E-commerce virtual completo para venda de roupas.",
    tags: ["PHP", "MySQL", "JavaScript"],
    badge: "Acadêmico",
    icon: "Shirt",
    href: "https://github.com/MrRobotS0/Loja-Durk",
  },
  {
    idx: "05",
    title: "Academia TI",
    desc: "Plataforma corporativa de cursos com player e certificados em PDF.",
    tags: ["PHP", "SQL Server", "JavaScript", "HTML5 Video"],
    badge: "Produção",
    icon: "GraduationCap",
  },
  {
    idx: "06",
    title: "Sistema de OKR",
    desc: "Apontamento de Objetivos e Resultados-Chave corporativos.",
    tags: ["PHP", "SQL Server", "JS"],
    badge: "Produção",
    icon: "Target",
  },
  {
    idx: "07",
    title: "Sistema Forecast",
    desc: "Plataforma web para apontamento de previsões financeiras.",
    tags: ["PHP", "SQL Server", "JS"],
    badge: "Produção",
    icon: "TrendingUp",
  },
  {
    idx: "08",
    title: "APS Color",
    desc: "Sequenciamento e planejamento de 50 injetoras plásticas em tempo real, integrando SAP e EGA.",
    tags: ["Python Flask", "SQL Server", "SAP HANA", "PHP"],
    badge: "Produção",
    icon: "Factory",
    featured: true,
  },
  {
    idx: "09",
    title: "Bipagem de Defeitos",
    desc: "Registro de defeitos em linha de produção via leitura de código de barras.",
    tags: ["PHP", "JavaScript", "HTML", "CSS"],
    badge: "Produção",
    icon: "ScanBarcode",
  },
  {
    idx: "10",
    title: "CEDOC",
    desc: "Gestão de arquivo morto com cadastro de caixas e controle de descarte.",
    tags: ["PHP", "SQL Server", "JavaScript", "ETL"],
    badge: "Produção",
    icon: "Archive",
  },
  {
    idx: "11",
    title: "Lab Color",
    desc: "Sistema de laboratório de ensaios — painel web e app mobile integrados por QR, com consulta viva ao SAP por número de série.",
    tags: ["PHP", "SQL Server", "SAP HANA", "React Native", "Expo"],
    badge: "Produção",
    icon: "FlaskConical",
    featured: true,
  },
  {
    idx: "12",
    title: "Setup de Injetoras",
    desc: "Checklist para partida de máquina e troca de molde em injetoras plásticas, com integração ao EGA.",
    tags: ["PHP", "SQL Server", "JavaScript", "EGA"],
    badge: "Produção",
    icon: "ListChecks",
  },
  {
    idx: "13",
    title: "Gestão de Veículos",
    desc: "Módulo de gestão de frota — manutenção, prontuário, pneus e inteligência de renovação, com base alimentada por planilha via Microsoft Graph.",
    tags: ["PHP", "SQL Server", "Chart.js", "Microsoft Graph"],
    badge: "Produção",
    icon: "Truck",
  },
  {
    idx: "14",
    title: "Project Control",
    desc: "Gestão de projetos com gates de aprovação por fase — tarefas, evidências, planos de teste e equipes por área. Rodando em produção.",
    tags: ["NestJS", "Next.js", "PostgreSQL", "Prisma", "Docker"],
    badge: "Produção",
    icon: "Workflow",
    featured: true,
  },
  {
    idx: "15",
    title: "Chat BI",
    desc: "Chatbot de IA web para consulta e análise de dados em linguagem natural, integrado com Power BI, EGA e TOTVS.",
    tags: ["Python", "LLM", "Power BI", "TOTVS", "SQL Server"],
    badge: "Produção",
    icon: "Bot",
    featured: true,
  },
];
