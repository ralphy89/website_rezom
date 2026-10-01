# REZOM

Site officiel du réseau professionnel et entrepreneurial REZOM. Slogan : Connecter – Collaborer – Réussir. Interface claire, industrielle, animée, en français.

## Lancer

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Développement (Turbopack) |
| `npm run build` | Build de production |
| `npm run start` | Sert le build |
| `npm run lint` | ESLint |

## Pages

- `/` — accueil : réseau, activités, adhésion, alliances
- `/a-propos` — identité, mission, valeurs, écosystème

Le menu relie Accueil, À propos, Réseau, Activités, Adhésion et Contact.

## Où modifier le contenu

- `lib/site.ts` — nom, slogan, e-mail, navigation
- `lib/content.ts` — textes de l’accueil et plaques d’alliances
- `lib/about.ts` — textes de la page À propos
- `public/alliances/` — logos des partenaires
- `public/logo.png` — logo REZOM

## Adhésion

Le formulaire en deux étapes envoie un `POST` vers `/api/membership`.

Sans variable d’environnement, la demande est acceptée et reçoit une référence. Pour la transmettre à n8n, Supabase, Airtable ou une API :

```bash
MEMBERSHIP_WEBHOOK_URL=https://example.com/hook
MEMBERSHIP_WEBHOOK_SECRET=optionnel
```

Le secret, s’il est défini, part en en-tête `Authorization: Bearer`.

## Stack

Next.js 15, React 19, TypeScript, Tailwind CSS 4, Framer Motion. Les animations respectent `prefers-reduced-motion`.

Propulsé par VinkodeAI.
