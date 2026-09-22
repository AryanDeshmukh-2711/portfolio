<div align="center">

# ✨ Portfolio — Aryan Deshmukh

### Who I am, what I've built, and how to reach me — on one page

**A personal portfolio with a fixed profile card, a live view of my GitHub activity,<br/>my projects, and a contact form that lands straight in my inbox.**

<br/>

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
<br/>
![Motion](https://img.shields.io/badge/Motion-animations-FF0055?style=for-the-badge) ![Resend](https://img.shields.io/badge/Resend-email-000000?style=for-the-badge&logo=resend&logoColor=white) ![Content](https://img.shields.io/badge/content-plain_JSON-F97316?style=for-the-badge)

</div>

---

## 👋 In 30 seconds

<table>
<tr>
<td width="22%">

😟 **The problem**

</td>
<td>

A GitHub profile shows code, but not the person behind it: what they care about, what they've shipped, and how to get in touch.

</td>
</tr>
<tr>
<td width="22%">

💡 **The idea**

</td>
<td>

One fast page that tells the whole story in order — who I am, my live GitHub activity, my projects, experience and tools — with a contact form at the end.

</td>
</tr>
<tr>
<td width="22%">

🎯 **Who it's for**

</td>
<td>

Recruiters, collaborators and anyone curious about my work.

</td>
</tr>
<tr>
<td width="22%">

🚦 **Where it is**

</td>
<td>

Designed and built, and ready to deploy. The final content — résumé, experience and writing — is being filled in. See the [roadmap](#roadmap).

</td>
</tr>
</table>

---

## 🧭 How a visit goes

```mermaid
flowchart TB
    subgraph R1[" "]
        direction LR
        A["👋 Meet me<br/>bio and stats"] --> B["📈 My GitHub<br/>activity, live"] --> C["🚀 My projects<br/>filter by topic"]
    end
    subgraph R2[" "]
        direction LR
        D["💼 Experience<br/>and tools"] --> E["✍️ Writing"] --> F["✉️ Send me<br/>a message"]
    end
    R1 --> R2

    classDef step fill:#FFF4EC,stroke:#F97316,stroke-width:2px,color:#431407
    class A,B,C,D,E,F step
    style R1 fill:none,stroke:none
    style R2 fill:none,stroke:none
```

On a desktop, the profile card stays fixed on the left while only the content column scrolls.

---

## ✨ What's on the page

<table>
<tr>
<td width="50%" valign="top">

### 👋 A profile that stays put
Photo, name, role and social links in a card that never scrolls away, next to a short bio and a few headline numbers.

</td>
<td width="50%" valign="top">

### 📈 Live GitHub activity
The last twelve months of contributions, refreshed from GitHub each day — no access token to set up, and a plain link to GitHub if that service is ever down.

</td>
</tr>
<tr>
<td valign="top">

### 🚀 Projects, filterable
Each project with its stack, a link to the code and a live demo where there is one. Filter chips, built from each project's tags, reorder the list with animation.

</td>
<td valign="top">

### ✉️ A contact form that works
Checked in the browser and again on the server with the same rules, rate-limited against spam, and delivered to my inbox by email.

</td>
</tr>
<tr>
<td colspan="2" valign="top">

### 🎨 A distinct look
Near-black surfaces, a vivid orange accent, oversized two-tone headings and a glass-effect dock for navigation — built to a written design brief.

</td>
</tr>
</table>

---

## 📮 What happens when someone sends a message

```mermaid
sequenceDiagram
    autonumber
    actor Visitor as 👤 Visitor
    participant Form as 📝 Contact form
    participant API as 🖥️ Server
    participant Mail as ✉️ Resend

    Visitor->>Form: Name, email, message
    Note over Form: Checked in the<br/>browser first
    Form->>API: Send
    Note over API: Same rules again,<br/>5 a minute at most,<br/>HTML made harmless
    API->>Mail: The message
    Mail-->>API: Delivered
    API-->>Visitor: Thanks!
```

---

## 🏗️ How it's built

```mermaid
flowchart LR
    Browser["📱 Visitor"] --> Page["▲ Next.js page<br/>rebuilt daily"]
    Page --> Content[("📄 data/*.json<br/>all the words")]
    Page --> GitHub["📈 GitHub<br/>contributions"]
    Browser --> Contact["✉️ /api/contact"] --> Resend["Resend<br/>email"]

    classDef app fill:#FFF4EC,stroke:#F97316,stroke-width:2px,color:#431407
    classDef ext fill:#EEF2FF,stroke:#6366F1,stroke-width:2px,color:#1E1B4B
    class Browser,Page,Contact app
    class Content,GitHub,Resend ext
```

| Layer | Tool | Why this one |
|---|---|---|
| 🖥️ Website | **Next.js 16 + React 19 + TypeScript** | A fast static page, plus one server route for the form |
| 🎨 Look and feel | **Tailwind CSS 4 + Motion** | The design brief's look, with smooth entrances and reordering |
| ✉️ Email | **Resend** | Delivers contact messages; works in local development without a key |
| 📄 Content | **Plain JSON files** | Every word on the site can change without touching code |

---

## 🛡️ Built with care

| | What it means | How it's done |
|---|---|---|
| ✅ | **One set of rules for the form** | The browser and the server validate with the same shared schema, so they can't disagree. |
| 🚦 | **Spam-resistant** | The contact route allows five messages a minute from any one address. |
| 🧼 | **Safe emails** | Everything a visitor types is escaped before it goes into the email. |
| 🌧️ | **Never breaks on someone else's outage** | If the GitHub activity service is down, that section offers a link to GitHub instead, and the rest of the page loads as normal. |
| 🔌 | **Ready for a CMS** | Only one file reads the content, so swapping JSON for a CMS touches nothing that draws the page. |

---

<a name="roadmap"></a>

## 🗺️ Roadmap

| Status | Milestone |
|:---:|---|
| ✅ | The full design: fixed profile card, glass dock, two-tone headings |
| ✅ | All seven sections on one page, with a live GitHub activity graph |
| ✅ | A working contact form, delivered by email |
| 🔜 | Final content: my real résumé, experience and writing, replacing the placeholders |
| 🔜 | Deploy it on Vercel, with its own address |

---

## 📁 What's in this repository

```
📦 portfolio
├── 📂 app/          the page, the 404 page and the contact API
├── 📂 components/   the profile card, dock, sections and animations
├── 📂 data/         all the words: profile, projects, experience, tools, posts
├── 📂 lib/          content loading, GitHub activity, form rules
├── 📂 public/       photo and résumé
└── 📂 docs/         the developer guide
```

---

## 👩‍💻 For developers

You need **Node.js** (current LTS).

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>. The contact form works without an email key — messages are printed to the console instead.

**The full developer guide is in [`docs/DEVELOPER-GUIDE.md`](docs/DEVELOPER-GUIDE.md):**

| Topic | Jump to |
|---|---|
| ✏️ Changing the words on the site | [Editing content](docs/DEVELOPER-GUIDE.md#editing-content) |
| ✉️ Setting up email | [Contact form](docs/DEVELOPER-GUIDE.md#contact-form) |
| ☁️ Putting it online | [Deploying](docs/DEVELOPER-GUIDE.md#deploying) |

---

<div align="center">

**Built by [Aryan Deshmukh](https://github.com/AryanDeshmukh-2711)**

</div>
