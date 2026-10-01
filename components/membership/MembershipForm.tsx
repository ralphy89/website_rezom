"use client";

import { useEffect, useId, useRef, useState } from "react";
import { NodeCluster } from "@/components/network/NodeCluster";
import { FormStep } from "@/components/membership/FormStep";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { MembershipSubmitError, submitMembershipApplication } from "@/lib/membership/submit";
import { profileOptions, tierOptions, type FieldErrors, type MembershipField } from "@/lib/membership/types";
import { errorsForStep, getFieldErrors, validateMembership } from "@/lib/membership/validate";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  organization: string;
  profile: string;
  tier: string;
  motivation: string;
  acceptedTerms: boolean;
};

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  profession: "",
  organization: "",
  profile: "",
  tier: "",
  motivation: "",
  acceptedTerms: false,
};

const controlClass =
  "w-full border border-line bg-surface px-3 text-base text-ink outline-none transition-shadow duration-200 placeholder:text-muted focus:border-ink focus:shadow-[inset_3px_0_0_#239DD6]";

export function MembershipForm() {
  const formId = useId();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [step, setStep] = useState<0 | 1>(0);
  const [submitting, setSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [reference, setReference] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const successRef = useRef<HTMLHeadingElement>(null);
  const lock = useRef(false);

  useEffect(() => {
    if (reference) successRef.current?.focus();
  }, [reference]);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key as MembershipField]) return current;
      const next = { ...current };
      delete next[key as MembershipField];
      return next;
    });
  }

  function payload() {
    return { ...values, acceptedTerms: values.acceptedTerms };
  }

  function focusField(field?: string) {
    if (!field) return;
    document.getElementById(`${formId}-${field}`)?.focus();
  }

  function goToStep(next: 0 | 1) {
    if (next === 1) {
      const stepErrors = errorsForStep(getFieldErrors(payload()), 1);
      setErrors(stepErrors);
      if (Object.keys(stepErrors).length > 0) {
        focusField(Object.keys(stepErrors)[0]);
        return;
      }
    }
    setServerMessage("");
    setStep(next);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 0) {
      goToStep(1);
      return;
    }
    if (lock.current) return;

    const allErrors = getFieldErrors(payload());
    const stepOneErrors = errorsForStep(allErrors, 1);
    const stepTwoErrors = errorsForStep(allErrors, 2);
    if (Object.keys(stepOneErrors).length > 0) {
      setStep(0);
      setErrors(stepOneErrors);
      focusField(Object.keys(stepOneErrors)[0]);
      return;
    }
    if (Object.keys(stepTwoErrors).length > 0) {
      setErrors(stepTwoErrors);
      focusField(Object.keys(stepTwoErrors)[0]);
      return;
    }

    const validated = validateMembership(payload());
    if (!validated.ok) return;

    lock.current = true;
    setSubmitting(true);
    setServerMessage("");

    try {
      const result = await submitMembershipApplication(validated.data, honeypot);
      setReference(result.id.slice(0, 8).toUpperCase());
    } catch (error) {
      const message = error instanceof MembershipSubmitError ? error.message : "La connexion a échoué. Réessayez.";
      setServerMessage(message);
      if (error instanceof MembershipSubmitError && error.errors) {
        setErrors(error.errors);
        focusField(Object.keys(error.errors)[0]);
      }
    } finally {
      lock.current = false;
      setSubmitting(false);
    }
  }

  if (reference) {
    return (
      <div id="demande" className="border border-line-strong bg-surface p-6 md:p-8">
        <h3 ref={successRef} tabIndex={-1} className="font-display text-[1.6rem] leading-none tracking-[-0.04em] outline-none md:text-[clamp(2.2rem,5vw,3.4rem)]">
          Demande reçue.
        </h3>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-charcoal md:text-[17px]">
          Votre connexion avec REZOM commence ici.
        </p>
        <div className="mx-auto mt-8 max-w-sm">
          <NodeCluster active caption="Connexion établie." />
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Réf {reference}</p>
        <button
          type="button"
          className="mt-6 min-h-11 text-[12px] uppercase tracking-[0.14em] underline underline-offset-4"
          onClick={() => {
            setValues(initialValues);
            setErrors({});
            setReference("");
            setStep(0);
            setServerMessage("");
          }}
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form id="demande" className="relative border border-line-strong bg-surface p-5 md:p-8" onSubmit={onSubmit} noValidate>
      <FormStep current={step} onStep={goToStep} />
      <div className="sr-only" role="status" aria-live="polite">
        {serverMessage}
      </div>

      {step === 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Field id={`${formId}-fullName`} label="Nom complet" error={errors.fullName} className="md:col-span-2">
            <input
              id={`${formId}-fullName`}
              name="fullName"
              autoComplete="name"
              value={values.fullName}
              onChange={(event) => update("fullName", event.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? `${formId}-fullName-error` : undefined}
              className={cn(controlClass, "h-12")}
            />
          </Field>
          <Field id={`${formId}-email`} label="Email" error={errors.email}>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${formId}-email-error` : undefined}
              className={cn(controlClass, "h-12")}
            />
          </Field>
          <Field id={`${formId}-phone`} label="Téléphone / WhatsApp" error={errors.phone}>
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => update("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
              className={cn(controlClass, "h-12")}
            />
          </Field>
          <Field id={`${formId}-profession`} label="Profession / Fonction" error={errors.profession} className="md:col-span-2">
            <input
              id={`${formId}-profession`}
              name="profession"
              autoComplete="organization-title"
              value={values.profession}
              onChange={(event) => update("profession", event.target.value)}
              aria-invalid={Boolean(errors.profession)}
              aria-describedby={errors.profession ? `${formId}-profession-error` : undefined}
              className={cn(controlClass, "h-12")}
            />
          </Field>
        </div>
      ) : (
        <div className="mt-8 grid gap-6">
          <Field id={`${formId}-organization`} label="Organisation" optional>
            <input
              id={`${formId}-organization`}
              name="organization"
              autoComplete="organization"
              value={values.organization}
              onChange={(event) => update("organization", event.target.value)}
              className={cn(controlClass, "h-12")}
            />
          </Field>

          <ChoiceGroup
            legend="Profil"
            name="profile"
            value={values.profile}
            options={profileOptions}
            error={errors.profile}
            errorId={`${formId}-profile-error`}
            onChange={(value) => update("profile", value)}
          />
          <ChoiceGroup
            legend="Catégorie d'adhésion"
            name="tier"
            value={values.tier}
            options={tierOptions}
            error={errors.tier}
            errorId={`${formId}-tier-error`}
            onChange={(value) => update("tier", value)}
          />

          <Field id={`${formId}-motivation`} label="Pourquoi souhaitez-vous rejoindre REZOM ?" error={errors.motivation}>
            <textarea
              id={`${formId}-motivation`}
              name="motivation"
              rows={4}
              maxLength={600}
              value={values.motivation}
              onChange={(event) => update("motivation", event.target.value)}
              aria-invalid={Boolean(errors.motivation)}
              aria-describedby={errors.motivation ? `${formId}-motivation-error` : undefined}
              className={cn(controlClass, "min-h-28 resize-y py-3")}
            />
          </Field>

          <div>
            <label className="flex min-h-12 items-start gap-3">
              <input
                id={`${formId}-acceptedTerms`}
                name="acceptedTerms"
                type="checkbox"
                checked={values.acceptedTerms}
                onChange={(event) => update("acceptedTerms", event.target.checked)}
                aria-invalid={Boolean(errors.acceptedTerms)}
                aria-describedby={errors.acceptedTerms ? `${formId}-acceptedTerms-error` : `${formId}-terms-note`}
                className="mt-1 h-4 w-4 accent-ink"
              />
              <span>
                <span className="block text-[15px]">J&apos;accepte les conditions d&apos;adhésion.</span>
                <span id={`${formId}-terms-note`} className="mt-1 block text-[13px] leading-snug text-muted">
                  REZOM pourra vous contacter au sujet de votre demande.
                </span>
              </span>
            </label>
            {errors.acceptedTerms ? <FieldError id={`${formId}-acceptedTerms-error`}>{errors.acceptedTerms}</FieldError> : null}
          </div>
        </div>
      )}

      <div className="sr-only" aria-hidden="true">
        <label>
          Site web
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </label>
      </div>

      {serverMessage ? (
        <p className="mt-5 flex items-center gap-2 text-[14px] text-ink" role="alert">
          <span aria-hidden className="h-1.5 w-1.5 bg-signal" />
          {serverMessage}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {step === 1 ? (
          <Button type="button" variant="secondary" onClick={() => setStep(0)} disabled={submitting}>
            Retour
          </Button>
        ) : (
          <span />
        )}
        <Button type="submit" disabled={submitting} aria-busy={submitting}>
          {step === 0 ? "Continuer" : submitting ? "Envoi en cours" : "Envoyer ma demande"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  optional = false,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {label}
        </label>
        {optional ? <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Optionnel</span> : null}
      </div>
      {children}
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-2 text-[13px] text-ink">
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-signal" />
      {children}
    </p>
  );
}

function ChoiceGroup({
  legend,
  name,
  value,
  options,
  error,
  errorId,
  onChange,
}: {
  legend: string;
  name: string;
  value: string;
  options: readonly { value: string; label: string }[];
  error?: string;
  errorId: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{legend}</legend>
      <div className="grid gap-2 md:grid-cols-2">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex min-h-12 cursor-pointer items-center gap-3 border px-3 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-azure",
                selected ? "border-ink bg-paper" : "border-line bg-surface",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span aria-hidden className={cn("h-2 w-2 rounded-full", selected ? "bg-azure" : "border border-line-strong")} />
              <span className="text-[14px]">{option.label}</span>
            </label>
          );
        })}
      </div>
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </fieldset>
  );
}
