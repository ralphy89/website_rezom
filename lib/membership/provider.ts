import { submitToGoogleForm } from "./google-form";
import type { MembershipApplication } from "./types";

/**
 * Applications are posted to the REZOM Google Form.
 * Optionally set MEMBERSHIP_WEBHOOK_URL to also forward the payload to n8n,
 * a custom API, or an automation that writes to Supabase / Airtable.
 */
export type MembershipSink = {
  submit(data: MembershipApplication): Promise<{ id: string }>;
};

class GoogleFormSink implements MembershipSink {
  async submit(data: MembershipApplication) {
    await submitToGoogleForm(data);
    return { id: crypto.randomUUID() };
  }
}

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

class CompositeSink implements MembershipSink {
  constructor(private sinks: MembershipSink[]) {}

  async submit(data: MembershipApplication) {
    let id = "";
    for (const sink of this.sinks) {
      const result = await sink.submit(data);
      id = result.id;
    }
    return { id };
  }
}

export function createMembershipSink(): MembershipSink {
  const sinks: MembershipSink[] = [new GoogleFormSink()];
  const url = process.env.MEMBERSHIP_WEBHOOK_URL?.trim();
  if (url) sinks.push(new WebhookSink(url, process.env.MEMBERSHIP_WEBHOOK_SECRET?.trim() || undefined));
  return sinks.length === 1 ? sinks[0] : new CompositeSink(sinks);
}

export function submitToProvider(data: MembershipApplication) {
  return createMembershipSink().submit(data);
}
