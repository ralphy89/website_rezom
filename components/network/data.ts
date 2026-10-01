export type NetworkPoint = {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  core?: boolean;
  labelX: number;
  labelY: number;
  anchor: "start" | "middle" | "end";
};

export const heroView = { width: 560, height: 620 };

export const heroNodes: NetworkPoint[] = [
  {
    id: "core",
    label: "REZOM",
    x: 278,
    y: 304,
    r: 26,
    core: true,
    labelX: 278,
    labelY: 348,
    anchor: "middle",
  },
  {
    id: "entrepreneurs",
    label: "Entrepreneurs",
    x: 96,
    y: 112,
    r: 15,
    labelX: 96,
    labelY: 80,
    anchor: "middle",
  },
  {
    id: "professionnels",
    label: "Professionnels",
    x: 456,
    y: 98,
    r: 14,
    labelX: 456,
    labelY: 66,
    anchor: "middle",
  },
  {
    id: "etudiants",
    label: "Étudiants",
    x: 488,
    y: 274,
    r: 12,
    labelX: 488,
    labelY: 306,
    anchor: "middle",
  },
  {
    id: "entreprises",
    label: "Entreprises",
    x: 424,
    y: 492,
    r: 15,
    labelX: 424,
    labelY: 528,
    anchor: "middle",
  },
  {
    id: "partenaires",
    label: "Partenaires",
    x: 150,
    y: 504,
    r: 14,
    labelX: 150,
    labelY: 540,
    anchor: "middle",
  },
  {
    id: "projets",
    label: "Projets",
    x: 84,
    y: 318,
    r: 12,
    labelX: 84,
    labelY: 352,
    anchor: "middle",
  },
];

export const mobileHeroIds = new Set(["core", "entrepreneurs", "professionnels", "entreprises", "partenaires"]);

export const heroLinks: ReadonlyArray<readonly [string, string]> = [
  ["core", "entrepreneurs"],
  ["core", "professionnels"],
  ["core", "etudiants"],
  ["core", "entreprises"],
  ["core", "partenaires"],
  ["core", "projets"],
  ["entrepreneurs", "projets"],
  ["professionnels", "etudiants"],
  ["entreprises", "partenaires"],
];

export const heroStatuses = [
  "Network initialized",
  "Node active",
  "Link established",
  "Opportunity found",
  "Network online",
] as const;
