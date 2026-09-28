import type { FieldErrors, MembershipApplication } from "./types";

export class MembershipSubmitError extends Error {
  errors?: FieldErrors;

  constructor(message: string, errors?: FieldErrors) {
    super(message);
    this.name = "MembershipSubmitError";
    this.errors = errors;
  }
}

type SubmitResponse =
  | { ok: true; id: string }
  | { ok: false; message?: string; errors?: FieldErrors };

export async function submitMembershipApplication(
  data: MembershipApplication,
  honeypot = "",
): Promise<{ id: string }> {
  let response: Response;
  try {
    response = await fetch("/api/membership", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...data, companyWebsite: honeypot }),
    });
  } catch {
    throw new MembershipSubmitError("La connexion a échoué. Réessayez.");
  }

  const payload = (await response.json().catch(() => null)) as SubmitResponse | null;

  if (!response.ok || !payload || payload.ok !== true) {
    const message =
      payload && payload.ok === false && payload.message
        ? payload.message
        : "La connexion a échoué. Réessayez.";
    throw new MembershipSubmitError(message, payload && payload.ok === false ? payload.errors : undefined);
  }

  return { id: payload.id };
}
