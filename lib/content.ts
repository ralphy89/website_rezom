import {
  CalendarDays,
  Compass,
  GraduationCap,
  Radio,
  Users,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

export const marqueeItems = [
  "Entrepreneurs",
  "Professionnels",
  "Étudiants",
  "Entreprises",
  "Porteurs de projets",
  "Organisations",
  "Mentors",
  "Partenaires",
] as const;

export const valueCards = [
  {
    index: "01",
    code: "LK-01",
    title: "Réseau",
    text: "Créer des connexions utiles.",
  },
  {
    index: "02",
    code: "LK-02",
    title: "Collaboration",
    text: "Construire ensemble.",
  },
  {
    index: "03",
    code: "LK-03",
    title: "Croissance",
    text: "Transformer les opportunités en résultats.",
  },
] as const;

export type Activity = {
  index: string;
  title: string;
  text: string;
  icon: LucideIcon;
};

export const activities: Activity[] = [
  {
    index: "01",
    title: "Networking",
    text: "Rencontrer les bonnes personnes.",
    icon: Waypoints,
  },
  {
    index: "02",
    title: "Formations",
    text: "Monter en compétence, ensemble.",
    icon: GraduationCap,
  },
  {
    index: "03",
    title: "Mentorat",
    text: "Apprendre auprès de ceux qui avancent.",
    icon: Compass,
  },
  {
    index: "04",
    title: "Événements",
    text: "Se retrouver, en vrai.",
    icon: CalendarDays,
  },
  {
    index: "05",
    title: "Partenariats",
    text: "Relier organisations et projets.",
    icon: Users,
  },
  {
    index: "06",
    title: "Opportunités",
    text: "Repérer la prochaine ouverture.",
    icon: Radio,
  },
];

export const memberCategories = [
  {
    id: "entrepreneurs",
    index: "01",
    title: "Entrepreneurs",
    text: "Développer son réseau et ses opportunités.",
  },
  {
    id: "professionnels",
    index: "02",
    title: "Professionnels",
    text: "Échanger avec des pairs et des décideurs.",
  },
  {
    id: "etudiants",
    index: "03",
    title: "Étudiants",
    text: "Accéder à des mentors et à des rencontres.",
  },
  {
    id: "entreprises",
    index: "04",
    title: "Entreprises",
    text: "Trouver des talents et des partenaires.",
  },
  {
    id: "porteurs",
    index: "05",
    title: "Porteurs de projets",
    text: "Faire avancer une idée avec les bonnes personnes.",
  },
] as const;

export const partners = [
  "Entreprises",
  "Universités",
  "Institutions",
  "Incubateurs",
  "Organisations",
] as const;

export const partnerBays = [
  {
    index: "01",
    name: "Université Quisqueya",
    text: "Préparez VOTRE Carrière DE HAUT NIVEAU en Haïti",
    logo: "/alliances/universite-quisqueya.png",
  },
  {
    index: "02",
    name: "VinkodeAI",
    text: "Créez des applications intelligentes pour votre entreprise avec VinkodeAI.",
    logo: "/alliances/vinkodeLogo.png",
  },
  {
    index: "03",
    name: "Fòs Jenès",
    text: "Finance haïtienne et correspondants internationaux.",
    logo: "/alliances/FOS-J-LOGO.png",
  },
] as const;

export const allianceBayCount = partnerBays.length + 1;
