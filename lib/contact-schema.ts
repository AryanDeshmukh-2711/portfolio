/** Validation shared by the client form and the API route, so the rules can
 *  never drift apart. */

export const BUDGET_OPTIONS = [
  "Under $1k",
  "$1k – $5k",
  "$5k – $10k",
  "$10k+",
  "Let's discuss",
] as const;

export interface ContactPayload {
  name: string;
  email: string;
  budget: string;
  message: string;
}

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<ContactPayload>): FieldErrors {
  const errors: FieldErrors = {};
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const message = input.message?.trim() ?? "";
  const budget = input.budget?.trim() ?? "";

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "That name is too long.";

  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > 200) errors.email = "That email is too long.";

  if (budget && !BUDGET_OPTIONS.includes(budget as (typeof BUDGET_OPTIONS)[number])) {
    errors.budget = "Please pick one of the listed ranges.";
  }

  if (message.length < 10) errors.message = "A little more detail, please.";
  else if (message.length > 4000) errors.message = "That message is too long.";

  return errors;
}
