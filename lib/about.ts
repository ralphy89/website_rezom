export const introNodes = [
  { id: "talents", label: "Talents", x: 92, y: 78, anchor: "start" },
  { id: "entreprises", label: "Entreprises", x: 268, y: 52, anchor: "end" },
  { id: "projets", label: "Projets", x: 318, y: 168, anchor: "end" },
  { id: "partenaires", label: "Partenaires", x: 188, y: 268, anchor: "middle" },
  { id: "opportunites", label: "Opportunités", x: 64, y: 188, anchor: "start" },
] as const;

export const introLinks = [
  ["talents", "entreprises"],
  ["entreprises", "projets"],
  ["projets", "partenaires"],
  ["partenaires", "opportunites"],
  ["opportunites", "talents"],
  ["talents", "projets"],
] as const;

export const identityWords = ["Connecter", "Collaborer", "Réussir"] as const;

export const missionPanels = [
  {
    index: "01",
    label: "Mission",
    title: "Créer des connexions qui ont de la valeur.",
    text: "Faciliter les échanges entre talents, entrepreneurs et organisations afin de favoriser les partenariats, les compétences, l’entrepreneuriat et la réussite collective.",
  },
  {
    index: "02",
    label: "Vision",
    title: "Construire un réseau de référence.",
    text: "Faire de REZO M une plateforme majeure de réseautage professionnel et entrepreneurial en Haïti et à l’international.",
  },
] as const;

export const ambitionModules = [
  { index: "01", title: "Réseau", text: "Créer des relations professionnelles pertinentes." },
  { index: "02", title: "Projets", text: "Rencontrer les bonnes personnes pour faire avancer ses idées." },
  { index: "03", title: "Compétences", text: "Apprendre, partager et progresser." },
  { index: "04", title: "Opportunités", text: "Découvrir de nouvelles possibilités professionnelles et entrepreneuriales." },
] as const;

export const values = [
  { index: "01", title: "Intégrité", text: "Construire des relations basées sur la confiance." },
  { index: "02", title: "Innovation", text: "Encourager les idées nouvelles." },
  { index: "03", title: "Leadership", text: "Créer, inspirer et agir." },
  { index: "04", title: "Excellence", text: "Rechercher constamment la qualité." },
  { index: "05", title: "Respect", text: "Créer un environnement professionnel et humain." },
  { index: "06", title: "Inclusion", text: "Faire de la diversité une force." },
  { index: "07", title: "Collaboration", text: "Partager les compétences et les opportunités." },
  { index: "08", title: "Solidarité", text: "Grandir et réussir ensemble." },
] as const;

export const ecosystemNodes = [
  { id: "entrepreneurs", label: "Entrepreneurs", text: "Développer leur réseau et créer de nouvelles opportunités.", ring: "primary", angle: -90 },
  { id: "professionnels", label: "Professionnels", text: "Partager leur expertise et construire de nouvelles collaborations.", ring: "primary", angle: -45 },
  { id: "etudiants", label: "Étudiants", text: "Créer leurs premières connexions professionnelles.", ring: "primary", angle: 0 },
  { id: "entreprises", label: "Entreprises", text: "Identifier talents, partenaires et opportunités.", ring: "primary", angle: 45 },
  { id: "porteurs", label: "Porteurs de projets", text: "Faire avancer une idée avec les bonnes personnes.", ring: "primary", angle: 90 },
  { id: "mentors", label: "Mentors", text: "Transmettre l’expérience à ceux qui avancent.", ring: "primary", angle: 135 },
  { id: "partenaires", label: "Partenaires", text: "Relier organisations et projets.", ring: "primary", angle: 180 },
  { id: "organisations", label: "Organisations", text: "Construire des collaborations durables.", ring: "primary", angle: 225 },
  { id: "formations", label: "Formations", text: "Monter en compétence, ensemble.", ring: "secondary", angle: -68 },
  { id: "evenements", label: "Événements", text: "Se retrouver, en vrai.", ring: "secondary", angle: -22 },
  { id: "networking", label: "Networking", text: "Rencontrer les bonnes personnes.", ring: "secondary", angle: 22 },
  { id: "mentorat", label: "Mentorat", text: "Apprendre auprès de ceux qui avancent.", ring: "secondary", angle: 68 },
  { id: "collaborations", label: "Collaborations", text: "Relier les forces du réseau.", ring: "secondary", angle: 112 },
  { id: "opportunites", label: "Opportunités", text: "Repérer la prochaine ouverture.", ring: "secondary", angle: 158 },
] as const;

export const actionModules = [
  { index: "01", title: "Networking", text: "Rencontrer les bonnes personnes." },
  { index: "02", title: "Formations", text: "Développer de nouvelles compétences." },
  { index: "03", title: "Mentorat", text: "Apprendre de l’expérience des autres." },
  { index: "04", title: "Événements", text: "Créer des espaces de rencontre." },
  { index: "05", title: "Partenariats", text: "Construire des collaborations durables." },
  { index: "06", title: "Opportunités", text: "Connecter les talents aux possibilités." },
] as const;

export const approachSteps = [
  { index: "01", title: "Une rencontre" },
  { index: "02", title: "Une conversation" },
  { index: "03", title: "Une collaboration" },
  { index: "04", title: "Une opportunité" },
] as const;

export const commitments = [
  { title: "Partager", text: "ses connaissances." },
  { title: "Collaborer", text: "avec les autres membres." },
  { title: "Participer", text: "aux activités du réseau." },
  { title: "Créer", text: "des opportunités." },
  { title: "Agir", text: "avec professionnalisme et intégrité." },
] as const;
