import {
  profileOptions,
  stepOneFields,
  stepTwoFields,
  tierOptions,
  type FieldErrors,
  type MembershipApplication,
  type MembershipField,
  type ProfileCategory,
  type MembershipTier,
} from "./types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const profileValues = new Set<string>(profileOptions.map((item) => item.value));
const tierValues = new Set<string>(tierOptions.map((item) => item.value));

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function getFieldErrors(input: unknown): FieldErrors {
  const source = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const errors: FieldErrors = {};

  const fullName = asText(source.fullName);
  const email = asText(source.email);
  const phone = asText(source.phone);
  const profession = asText(source.profession);
  const profile = asText(source.profile);
  const tier = asText(source.tier);
  const motivation = asText(source.motivation);

  if (fullName.length < 2) errors.fullName = "Indiquez votre nom complet.";
  if (!emailPattern.test(email)) errors.email = "Indiquez une adresse email valide.";
  if (phone.replace(/\D/g, "").length < 8) errors.phone = "Indiquez un numéro de téléphone.";
  if (profession.length < 2) errors.profession = "Indiquez votre profession.";
  if (!profileValues.has(profile)) errors.profile = "Choisissez un profil.";
  if (!tierValues.has(tier)) errors.tier = "Choisissez une catégorie.";
  if (motivation.length < 10) errors.motivation = "Quelques mots suffisent — dites-nous pourquoi.";
  if (source.acceptedTerms !== true) errors.acceptedTerms = "Acceptez les conditions pour continuer.";

  return errors;
}

export function errorsForStep(errors: FieldErrors, step: 1 | 2): FieldErrors {
  const fields: readonly MembershipField[] = step === 1 ? stepOneFields : stepTwoFields;
  const picked: FieldErrors = {};
  for (const field of fields) {
    if (errors[field]) picked[field] = errors[field];
  }
  return picked;
}

export function validateMembership(
  input: unknown,
): { ok: true; data: MembershipApplication } | { ok: false; errors: FieldErrors } {
  const errors = getFieldErrors(input);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const source = input as Record<string, unknown>;
  const organization = asText(source.organization);

  return {
    ok: true,
    data: {
      fullName: asText(source.fullName),
      email: asText(source.email),
      phone: asText(source.phone),
      profession: asText(source.profession),
      organization: organization || undefined,
      profile: asText(source.profile) as ProfileCategory,
      tier: asText(source.tier) as MembershipTier,
      motivation: asText(source.motivation),
      acceptedTerms: true,
    },
  };
}
