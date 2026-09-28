import { NextResponse } from "next/server";
import { submitToProvider } from "@/lib/membership/provider";
import { validateMembership } from "@/lib/membership/validate";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Requête invalide." }, { status: 400 });
  }

  if (isFilledHoneypot(body)) {
    return NextResponse.json({ ok: true, id: crypto.randomUUID() });
  }

  const result = validateMembership(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: "Vérifiez les champs indiqués.", errors: result.errors }, { status: 400 });
  }

  try {
    const submitted = await submitToProvider(result.data);
    return NextResponse.json({ ok: true, id: submitted.id });
  } catch {
    return NextResponse.json({ ok: false, message: "La connexion a échoué. Réessayez." }, { status: 502 });
  }
}

function isFilledHoneypot(body: unknown) {
  if (!body || typeof body !== "object" || !("companyWebsite" in body)) return false;
  const value = (body as { companyWebsite?: unknown }).companyWebsite;
  return typeof value === "string" && value.trim().length > 0;
}
