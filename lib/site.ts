export const site = {
  name: "REZOM",
  slogan: "Connecter – Collaborer – Réussir",
  tagline: "Les connexions créent les opportunités.",
  email: "contact@rezom.online",
  phones: [
    {
      display: "3220 7787",
      whatsapp: true,
      message: "Bonjour REZOM, je souhaite en savoir plus sur le réseau.",
    },
    { display: "3643 4149" },
    { display: "4919 9364" },
  ],
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
