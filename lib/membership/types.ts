export const profileOptions = [
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "professionnel", label: "Professionnel" },
  { value: "etudiant", label: "Étudiant" },
  { value: "entreprise", label: "Entreprise" },
  { value: "porteur", label: "Porteur de projet" },
  { value: "autre", label: "Autre" },
] as const;

export const tierOptions = [
  { value: "actif", label: "Membre Actif" },
  { value: "premium", label: "Membre Premium" },
  { value: "entreprise", label: "Membre Entreprise" },
] as const;

export type ProfileCategory = (typeof profileOptions)[number]["value"];
export type MembershipTier = (typeof tierOptions)[number]["value"];

export type MembershipApplication = {
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  organization?: string;
  profile: ProfileCategory;
  tier: MembershipTier;
  motivation: string;
  acceptedTerms: true;
};

export type MembershipField =
  | "fullName"
  | "email"
  | "phone"
  | "profession"
  | "organization"
  | "profile"
  | "tier"
  | "motivation"
  | "acceptedTerms";

export type FieldErrors = Partial<Record<MembershipField, string>>;

export const stepOneFields = ["fullName", "email", "phone", "profession"] as const satisfies readonly MembershipField[];
export const stepTwoFields = ["profile", "tier", "motivation", "acceptedTerms"] as const satisfies readonly MembershipField[];
