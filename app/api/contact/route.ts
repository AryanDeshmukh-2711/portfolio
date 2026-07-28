import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact, type ContactPayload } from "@/lib/contact-schema";
import { profile } from "@/lib/content";

/**
 * Contact endpoint. Validates with the same rules as the client, then hands
 * off to Resend. Without RESEND_API_KEY it logs and reports success, so local
 * development works before any mail provider is configured.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; expires: number }>();

function rateLimited(key: string) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.expires < now) {
    hits.set(key, { count: 1, expires: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!,
  );
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many messages. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: Partial<ContactPayload>;
  try {
    body = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed request." },
      { status: 400 },
    );
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "Please fix the highlighted fields.", errors },
      { status: 422 },
    );
  }

  const payload = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    budget: body.budget?.trim() || "Not specified",
    message: body.message!.trim(),
  };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey) {
    console.info("[contact] RESEND_API_KEY not set — message not delivered:", {
      ...payload,
      message: `${payload.message.slice(0, 120)}…`,
    });
    return NextResponse.json({
      ok: true,
      message: "Thanks — I'll be in touch shortly.",
    });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject: `Portfolio enquiry from ${payload.name}`,
      html: `
        <h2>New enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(payload.budget)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) throw new Error(error.message);
  } catch (cause) {
    console.error("[contact] delivery failed:", cause);
    return NextResponse.json(
      { ok: false, message: "Could not send right now. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks — I'll be in touch shortly.",
  });
}
