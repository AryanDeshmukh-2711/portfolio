# Portfolio — Aryan Deshmukh

A personal portfolio built to the design language in `Portfolio_Website_Claude_Brief.pdf`:
near-black surfaces, a vibrant orange accent, oversized two-tone headings, a
glassmorphic dock, and a profile card that stays fixed while only the content
column scrolls.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Resend

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build
```

## Structure

```
app/
  layout.tsx          root metadata, fonts, and the persistent Shell
  page.tsx            Home — bio, stats, GitHub / featured-projects cards
  projects/           project list with client-side tag filtering
  experience/         roles and timeline
  tools/              tech stack grid
  blog/               writing index
  contact/            enquiry form
  api/contact/        validation, rate limiting, Resend delivery
  sitemap.ts          generated from lib/site.ts
  robots.ts
components/
  Shell.tsx           two-column frame; only <main> scrolls on desktop
  ProfileCard.tsx     portrait, name, flame badge, socials
  DockNav.tsx         glass pill nav with an animated active indicator
  DashedArc.tsx       the dashed sweeps, as SVG rather than baked into the photo
  PageHeading.tsx     the white-over-ghost headline
  ContactForm.tsx     client validation, mirrors the server rules
  ProjectList.tsx     filter chips + animated reordering
  Reveal.tsx          CSS-driven staggered entrance
data/                 all site content, as JSON
lib/
  content.ts          typed accessors over data/ — the seam for a CMS swap
  site.ts             site metadata and nav definition
  contact-schema.ts   validation shared by the form and the API route
types/index.ts        content types
```

## Editing content

Everything you'd routinely change lives in `data/` — no component edits needed:

| File              | Drives                                          |
| ----------------- | ----------------------------------------------- |
| `profile.json`    | Name, role headline, bio, stats, social links   |
| `projects.json`   | Project list and the filter chips (from `tags`) |
| `experience.json` | Experience timeline                             |
| `posts.json`      | Writing index                                   |
| `tools.json`      | Tech stack grid                                 |

`lib/content.ts` is the only module that reads those files. Moving to a CMS
means rewriting those functions — nothing that renders touches JSON directly.

### Assets to replace

- **`public/resume.pdf`** — currently a generated placeholder. Replace with your
  real résumé; the Resume button downloads it as-is.
- **`public/profile.jpg`** — recovered from the reference screenshots in the
  brief, so it is only 676×714. Drop in the original full-resolution export for
  a sharper result on high-density displays.

Project thumbnails are generated from the `accent` colour in `projects.json`.
To use real screenshots, add an `image` field and render it in
`components/ProjectList.tsx`.

## Contact form

`POST /api/contact` validates with the same rules as the client
(`lib/contact-schema.ts`), rate-limits to 5 requests per minute per IP, escapes
all user input before templating it into the email, and sends via Resend.

Copy `.env.example` to `.env.local` and fill it in:

```bash
cp .env.example .env.local
```

Without `RESEND_API_KEY` the endpoint still validates and returns success,
logging the message to the server console — so local development works before
any mail provider is configured. The in-memory rate limiter is per-instance;
on serverless it resets with each cold start. For stricter limits, back it with
Upstash or Vercel KV.

## Deploying

Push to GitHub and import the repo on Vercel. Set `NEXT_PUBLIC_SITE_URL` to the
production origin — the sitemap, robots, and Open Graph image URLs are all
derived from it.

## Notes on the brief

Built as specified, with these decisions worth flagging:

- **Contact is a sixth dock icon.** The reference screens show five, but the
  brief lists Contact as a section and it needs to be reachable.
- **The experience heading reads "Work Experience"**, not the reference's "12
  Years Of Experience", which contradicts the "+1 years" stat on the home page.
- **Project, experience, blog and tools entries are placeholders** written to
  suit an AI/ML engineer's profile. The name, role, bio, and stats are yours,
  taken from the reference screens.
- **Not included:** the analytics dashboard and CMS integration from the
  "Features To Include" list. Both are substantial additions rather than
  configuration — analytics needs a provider and an authenticated route, and a
  CMS needs a hosted backend. The content layer is structured so a CMS can be
  added behind `lib/content.ts` without touching any component.
