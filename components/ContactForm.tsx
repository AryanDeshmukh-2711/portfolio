"use client";

import { useId, useState } from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import {
  BUDGET_OPTIONS,
  validateContact,
  type ContactPayload,
  type FieldErrors,
} from "@/lib/contact-schema";

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: ContactPayload = { name: "", email: "", budget: "", message: "" };

export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");

  function update<K extends keyof ContactPayload>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("error");
      setNotice("Please fix the highlighted fields.");
      return;
    }

    setStatus("sending");
    setNotice("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { ok?: boolean; message?: string; errors?: FieldErrors } =
        await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus("error");
        setNotice(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("sent");
      setNotice(data.message ?? "Thanks — I'll be in touch shortly.");
      setValues(EMPTY);
    } catch {
      setStatus("error");
      setNotice("Network error. Please try again.");
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${uid}-name`}
          label="Name"
          error={errors.name}
          input={
            <input
              id={`${uid}-name`}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your Name"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              className={`${inputClass(errors.name)} text-white`}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            />
          }
          errorId={`${uid}-name-error`}
        />

        <Field
          id={`${uid}-email`}
          label="Email"
          error={errors.email}
          input={
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              className={`${inputClass(errors.email)} text-white`}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            />
          }
          errorId={`${uid}-email-error`}
        />
      </div>

      <div className="mt-5">
        <Field
          id={`${uid}-budget`}
          label="Budget"
          error={errors.budget}
          errorId={`${uid}-budget-error`}
          input={
            <div className="relative">
              <select
                id={`${uid}-budget`}
                name="budget"
                value={values.budget}
                onChange={(e) => update("budget", e.target.value)}
                className={`${inputClass(errors.budget)} appearance-none pr-12 ${
                  values.budget ? "text-white" : "text-neutral-600"
                }`}
              >
                <option value="">Select…</option>
                {BUDGET_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-neutral-900">
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2 text-neutral-500"
                aria-hidden="true"
              />
            </div>
          }
        />
      </div>

      <div className="mt-5">
        <Field
          id={`${uid}-message`}
          label="Message"
          error={errors.message}
          errorId={`${uid}-message-error`}
          input={
            <textarea
              id={`${uid}-message`}
              name="message"
              rows={6}
              placeholder="Message"
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              className={`${inputClass(errors.message)} resize-y text-white`}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? `${uid}-message-error` : undefined
              }
            />
          }
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="glow-accent mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 transition hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending && (
          <Loader2 className="size-4 animate-spin text-white" aria-hidden="true" />
        )}
        {status === "sent" && (
          <Check className="size-4 text-white" aria-hidden="true" />
        )}
        <span className="label-xs text-white">
          {sending ? "Sending" : status === "sent" ? "Sent" : "Submit"}
        </span>
      </button>

      {/* The live region itself stays mounted so announcements are reliable;
          only the inner span remounts, which replays the reveal. */}
      <p
        role="status"
        aria-live="polite"
        className={`mt-4 min-h-5 text-[13.5px] ${
          status === "error" ? "text-accent-bright" : "text-muted"
        }`}
      >
        {notice && (
          <span key={notice} className="reveal inline-block">
            {notice}
          </span>
        )}
      </p>
    </form>
  );
}

/** Text colour is applied by the caller so the select can dim its placeholder
 *  without two conflicting `text-*` utilities landing on the same element. */
function inputClass(error?: string) {
  return `w-full rounded-2xl border bg-white/[0.035] px-5 py-3.5 text-[15px] transition outline-none placeholder:text-neutral-600 focus:border-accent/70 focus:bg-white/[0.05] ${
    error ? "border-accent-bright/70" : "border-white/[0.06]"
  }`;
}

function Field({
  id,
  label,
  input,
  error,
  errorId,
}: {
  id: string;
  label: string;
  input: React.ReactNode;
  error?: string;
  errorId: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-xs mb-2.5 block text-neutral-400">
        {label}
      </label>
      {input}
      {error && (
        <p id={errorId} className="mt-2 text-[12.5px] text-accent-bright">
          {error}
        </p>
      )}
    </div>
  );
}
