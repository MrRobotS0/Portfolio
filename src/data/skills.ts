export interface SkillGroup {
  title: string;
  sub: string;
  icon: string; // Lucide key
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Front-End",
    sub: "// interface",
    icon: "Code2",
    items: [
      "HTML5 & CSS",
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js / React Native (Expo)",
      "Next.js",
      "Flutter",
      "Chart.js",
      "Figma (UI/UX)",
    ],
  },
  {
    title: "Back-End",
    sub: "// lógica & APIs",
    icon: "Server",
    items: [
      "C# / .NET Core",
      "ASP.NET Web API",
      "Node.js",
      "NestJS",
      "PHP",
      "Python / Flask",
      "Swagger / OpenAPI",
    ],
  },
  {
    title: "Dados & DevOps",
    sub: "// infra & dados",
    icon: "Database",
    items: [
      "SQL Server / MySQL",
      "PostgreSQL / Prisma",
      "SAP HANA",
      "Docker",
      "Azure",
      "Linux",
      "Git / GitHub",
      "Microsoft Graph",
      "Postman / PgAdmin",
      "Scrum / Kanban / OKR",
    ],
  },
];

/** tecnologias exibidas no marquee infinito */
export const marqueeStack: string[] = [
  "C#",
  ".NET",
  "ASP.NET",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "PHP",
  "Python",
  "Flask",
  "Flutter",
  "React Native",
  "PostgreSQL",
  "SQL Server",
  "SAP HANA",
  "Prisma",
  "Docker",
  "Azure",
  "Linux",
  "Git",
];
