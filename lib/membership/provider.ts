import type { MembershipApplication } from "./types";

/**
 * Membership delivery is intentionally provider-agnostic.
 * Set MEMBERSHIP_WEBHOOK_URL to forward applications to n8n, a custom API,
 * or an automation that writes to Supabase / Airtable.
 * Without that variable, applications are acknowledged with a reference id.
 */
export type MembershipSink = {
  submit(data: MembershipApplication): Promise<{ id: string }>;
};

class WebhookSink implements MembershipSink {
  constructor(
    private url: string,
    private secret?: string,
  ) {}

  async submit(data: MembershipApplication) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.secret ? { Authorization: `Bearer ${this.secret}` } : {}),
      },
      body: JSON.stringify({
        source: "rezom-website",
        submittedAt: new Date().toISOString(),
        application: data,
      }),
    });

    if (!response.ok) {
      throw new Error("Membership provider rejected the application");
    }

    return { id: crypto.randomUUID() };
  }
}

class AckSink implements MembershipSink {
  async submit() {
    return { id: crypto.randomUUID() };
  }
}

export function createMembershipSink(): MembershipSink {
  const url = process.env.MEMBERSHIP_WEBHOOK_URL?.trim();
  if (url) return new WebhookSink(url, process.env.MEMBERSHIP_WEBHOOK_SECRET?.trim() || undefined);
  return new AckSink();
}

export function submitToProvider(data: MembershipApplication) {
  return createMembershipSink().submit(data);
}
