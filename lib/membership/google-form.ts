import type { MembershipApplication, MembershipTier, ProfileCategory } from "./types";

/** Public form: https://forms.gle/P2yEtKADbQHge1HB8 */
const FORM_ID = "1FAIpQLSe-7RXelwZdCvZxNQHznSLVqm_D5Gynrf8kPgZ0OWIOLDZXDA";
const FORM_ACTION = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

const entries = {
  fullName: "entry.429872727",
  email: "entry.568931153",
  phone: "entry.487012401",
  profession: "entry.262642981",
  organization: "entry.1238479998",
  profile: "entry.931181824",
  tier: "entry.727273967",
  motivation: "entry.1033966567",
  acceptedTerms: "entry.360119757",
} as const;

const profileLabels: Record<ProfileCategory, string> = {
  entrepreneur: "Entrpreneur (e)",
  professionnel: "Professionnel (le)",
  etudiant: "Etudiant",
  entreprise: "Entreprise",
  porteur: "Porteur de projet",
  autre: "__other_option__",
};

const tierLabels: Record<MembershipTier, string> = {
  actif: "Membre Actif",
  premium: "Membre Premium",
  entreprise: "Membre Entreprise",
};

export function toGoogleFormFields(data: MembershipApplication) {
  const fields = new URLSearchParams();
  fields.set("emailAddress", data.email);
  fields.set(entries.fullName, data.fullName);
  fields.set(entries.email, data.email);
  fields.set(entries.phone, data.phone);
  fields.set(entries.profession, data.profession);
  if (data.organization) fields.set(entries.organization, data.organization);
  fields.set(entries.profile, profileLabels[data.profile]);
  if (data.profile === "autre") {
    fields.set(`${entries.profile}.other_option_response`, "Autre");
  }
  fields.set(entries.tier, tierLabels[data.tier]);
  fields.set(entries.motivation, data.motivation);
  fields.set(entries.acceptedTerms, "OUI");
  return fields;
}

export async function submitToGoogleForm(data: MembershipApplication) {
  const response = await fetch(FORM_ACTION, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: toGoogleFormFields(data).toString(),
    redirect: "follow",
  });

  const html = await response.text();
  const recorded = /a bien été enregistrée|Your response has been recorded/i.test(html);

  if (!response.ok || !recorded) {
    throw new Error("Google Form rejected the application");
  }
}
