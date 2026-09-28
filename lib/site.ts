export const site = {
  name: "REZO M",
  slogan: "Connecter – Collaborer – Réussir",
  tagline: "Les connexions créent les opportunités.",
  email: "contact@rezom.org",
  year: 2026,
  socials: [
    { label: "LinkedIn", href: "" },
    { label: "Instagram", href: "" },
  ],
} as const;

export const navigation = [
  { href: "/", id: "accueil", label: "Accueil" },
  { href: "/a-propos", id: "a-propos", label: "À propos" },
  { href: "/#reseau", id: "reseau", label: "Réseau" },
  { href: "/#activites", id: "activites", label: "Activités" },
  { href: "/#adhesion", id: "adhesion", label: "Adhésion" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;
