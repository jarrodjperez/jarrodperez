# jarrodperez.com Astro Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the CRA-era site with a single-page, zero-JS Astro resume site in the warm-editorial style, deployed via the existing Netlify pipeline to jarrodperez.com.

**Architecture:** Static Astro site. All content lives in one typed data module (`src/data/resume.ts`); a base layout owns the `<head>` (SEO/OG); four small `.astro` components with scoped styles render the page. No client JavaScript, no external requests, system font stacks only.

**Tech Stack:** Astro ^7 (7.0.7 current), TypeScript (strict via `astro/tsconfigs/strict`), plain CSS with custom properties, Netlify (existing CD), Node 22.

**Spec:** `docs/superpowers/specs/2026-07-09-astro-rebuild-design.md`

## Global Constraints

- **Zero client-side JavaScript**: built `dist/` must contain no `<script>` tags.
- **No external requests**: no font files, no CDN links, no analytics. System font stacks only.
- Design tokens (exact values): background `#f6f3ec`, ink `#2a2722`, muted `#6b6459`, faint `#a89f8d`, rule `#ddd6c8`. Column measure `640px`.
- Serif stack: `Charter, Georgia, 'Times New Roman', serif` (prose). Sans stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif` (name, labels, rows).
- `site: 'https://jarrodperez.com'` in `astro.config.mjs`.
- All page copy comes from `src/data/resume.ts` — components never hard-code content.
- Links: GitHub `https://github.com/jarrodjperez`, LinkedIn `https://www.linkedin.com/in/jarrodperez`, email `perez.jarrod@gmail.com`. No Twitter.
- Work on branch `astro-rewrite`. Never commit to master. Do not push until the final task.
- Node 22 (local is v22.22.2); pin `NODE_VERSION = "22"` in netlify.toml.

---

### Task 1: Clean slate + Astro scaffold

Remove all CRA files and stand up a minimal Astro project that builds.

**Files:**
- Delete: `src/` (all), `public/` (all), `package.json`, `tsconfig.json`, `yarn.lock`, `README.md`
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, `README.md`
- Modify: `.gitignore`

**Interfaces:**
- Produces: a building Astro skeleton; `npm run build` → `dist/`; `npm run check` runs `astro check`. Later tasks add files under `src/` and never touch `astro.config.mjs` again.

- [ ] **Step 1: Create branch**

```bash
git checkout -b astro-rewrite
```

- [ ] **Step 2: Delete CRA files**

```bash
git rm -r -q src public package.json tsconfig.json yarn.lock README.md
```

- [ ] **Step 3: Write the new project files**

`package.json`:

```json
{
  "name": "jarrodperez",
  "version": "2.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^7.0.7"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.9",
    "typescript": "^5.5.0"
  }
}
```

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jarrodperez.com',
});
```

`tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

`src/pages/index.astro`:

```astro
---
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Jarrod Perez</title>
  </head>
  <body>
    <h1>Jarrod Perez</h1>
  </body>
</html>
```

`README.md`:

```markdown
# jarrodperez.com

Personal site. Single-page resume built with [Astro](https://astro.build), deployed to Netlify.

- `npm run dev` — local dev server
- `npm run build` — static build to `dist/`
- `npm run check` — type-check

Content lives in `src/data/resume.ts`; nothing else needs editing for a content change.
```

In `.gitignore`, replace the CRA entries with Astro's. Remove the lines `/coverage`, `/build`, `.pnp`, `.pnp.js`; change `/node_modules` to `node_modules/`; add:

```
dist/
.astro/
.netlify/
```

- [ ] **Step 4: Install and verify the skeleton builds (failing→passing check for this task)**

```bash
npm install
npm run build
```

Expected: `npm run build` ends with a line like `Complete!` and `dist/index.html` exists. Verify:

```bash
test -f dist/index.html && grep -o "Jarrod Perez" dist/index.html | wc -l
```

Expected output: `2` (title + h1). Note: use `grep -o | wc -l`, not `grep -c` — the built HTML may be minified onto one line and `grep -c` counts lines.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Replace CRA with minimal Astro scaffold"
```

---

### Task 2: Typed resume data module

All site content in one typed file.

**Files:**
- Create: `src/data/resume.ts`

**Interfaces:**
- Produces (exact, consumed by Tasks 4):
  - `export interface Link { label: string; href: string }`
  - `export interface Entry { org: string; role: string; dates: string; detail?: string }`
  - `export const identity: { name: string; tagline: string }`
  - `export const intro: string[]` (paragraphs, plain text)
  - `export const links: Link[]` (order: GitHub, LinkedIn, Email)
  - `export const experience: Entry[]` (reverse-chronological, education last)
  - `export const meta: { title: string; description: string }`

- [ ] **Step 1: Write the data module**

`src/data/resume.ts`:

```ts
export interface Link {
  label: string;
  href: string;
}

export interface Entry {
  org: string;
  role: string;
  dates: string;
  detail?: string;
}

export const identity = {
  name: 'Jarrod Perez',
  tagline: 'Full Stack Product Engineer',
};

export const meta = {
  title: 'Jarrod Perez — Full Stack Product Engineer',
  description:
    'Founding engineer at Summer. Product engineer with design roots who leads front-end teams and ships AI-native software — web apps, APIs, and MCP apps — end to end.',
};

export const intro: string[] = [
  "I'm a founding engineer at Summer, where I build and lead the front end: our web apps, public APIs, and MCP apps. Shipping LLM-native software — tools that people and AI agents both use — is the most interesting problem I've found in nearly twenty years of building for the web.",
  'I started in design and spent years as a UX engineer at PlayStation before moving deeper into engineering, leading front-end teams at Infura and now Summer. That mix is still how I work: end to end, from idea to production, without waiting on a designer or an architect.',
];

export const links: Link[] = [
  { label: 'GitHub', href: 'https://github.com/jarrodjperez' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jarrodperez' },
  { label: 'Email', href: 'mailto:perez.jarrod@gmail.com' },
];

export const experience: Entry[] = [
  {
    org: 'Summer',
    role: 'Founding Engineer',
    dates: '2022–present',
    detail: 'Leads front end across web apps, public APIs, and MCP apps.',
  },
  { org: 'Infura', role: 'Front End Lead', dates: '2019–2022' },
  { org: 'Sony PlayStation', role: 'Senior UX Engineer', dates: '2012–2019' },
  { org: 'Markit on Demand', role: 'Senior Software Engineer', dates: '2008–2012' },
  {
    org: 'Full Sail University',
    role: 'B.S. Digital Arts & Design',
    dates: '2006',
  },
];
```

- [ ] **Step 2: Type-check**

```bash
npm run check
```

Expected: `0 errors, 0 warnings` (hints are acceptable).

- [ ] **Step 3: Commit**

```bash
git add src/data/resume.ts
git commit -m "Add typed resume data module"
```

---

### Task 3: Design tokens + base layout with SEO head

**Files:**
- Create: `src/styles/global.css`, `src/layouts/Base.astro`, `public/favicon.svg`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `meta` from `src/data/resume.ts` (Task 2).
- Produces: `Base.astro` with slot; props `interface Props { title: string; description: string }`. All design tokens as CSS custom properties on `:root`: `--bg`, `--ink`, `--muted`, `--faint`, `--rule`, `--serif`, `--sans`, `--measure`.

- [ ] **Step 1: Write global stylesheet**

`src/styles/global.css`:

```css
:root {
  --bg: #f6f3ec;
  --ink: #2a2722;
  --muted: #6b6459;
  --faint: #a89f8d;
  --rule: #ddd6c8;
  --serif: Charter, Georgia, 'Times New Roman', serif;
  --sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  --measure: 640px;
}

* {
  box-sizing: border-box;
  margin: 0;
}

html {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

body {
  max-width: var(--measure);
  margin: 0 auto;
  padding: 4.5rem 1.5rem 5rem;
  line-height: 1.5;
}

a {
  color: var(--muted);
  text-decoration-color: var(--rule);
  text-underline-offset: 3px;
}

a:hover {
  color: var(--ink);
}

.section-label {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--faint);
  border-bottom: 1px solid var(--rule);
  padding-bottom: 0.4rem;
}
```

- [ ] **Step 2: Write favicon**

`public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#f6f3ec"/>
  <text x="32" y="43" font-family="Georgia, serif" font-size="30" font-weight="bold" text-anchor="middle" fill="#2a2722">JP</text>
</svg>
```

- [ ] **Step 3: Write base layout**

`src/layouts/Base.astro`:

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site);
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta name="generator" content={Astro.generator} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 4: Use the layout in the placeholder page**

`src/pages/index.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import { meta } from '../data/resume';
---

<Base title={meta.title} description={meta.description}>
  <h1>Jarrod Perez</h1>
</Base>
```

- [ ] **Step 5: Verify build and head output**

```bash
npm run check && npm run build
grep -o 'property="og:title" content="[^"]*"' dist/index.html
grep -o 'rel="canonical" href="[^"]*"' dist/index.html
```

Expected: check passes; og:title contains `Jarrod Perez — Full Stack Product Engineer`; canonical href is `https://jarrodperez.com/`.

- [ ] **Step 6: Commit**

```bash
git add src/styles src/layouts src/pages public
git commit -m "Add design tokens, base layout, SEO head, favicon"
```

---

### Task 4: Page components

**Files:**
- Create: `src/components/Header.astro`, `src/components/Intro.astro`, `src/components/Experience.astro`, `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `identity`, `intro`, `links`, `experience`, `meta` from `src/data/resume.ts` (Task 2); `Base.astro` and `.section-label` class (Task 3).
- Produces: the finished page. Components take no props — each imports what it needs from the data module directly.

- [ ] **Step 1: Write Header component**

`src/components/Header.astro`:

```astro
---
import { identity, links } from '../data/resume';
---

<header>
  <h1>{identity.name}</h1>
  <p class="tagline">{identity.tagline}</p>
  <nav aria-label="Profiles">
    {links.map((link) => <a href={link.href}>{link.label}</a>)}
  </nav>
</header>

<style>
  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .tagline {
    color: var(--muted);
    margin-top: 0.15rem;
  }

  nav {
    margin-top: 0.75rem;
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
  }
</style>
```

- [ ] **Step 2: Write Intro component**

`src/components/Intro.astro`:

```astro
---
import { intro } from '../data/resume';
---

<section aria-label="Introduction">
  {intro.map((paragraph) => <p>{paragraph}</p>)}
</section>

<style>
  section {
    margin-top: 2.5rem;
  }

  p {
    font-family: var(--serif);
    font-size: 1.0625rem;
    line-height: 1.65;
    color: var(--ink);
  }

  p + p {
    margin-top: 1rem;
  }
</style>
```

- [ ] **Step 3: Write Experience component**

`src/components/Experience.astro`:

```astro
---
import { experience } from '../data/resume';
---

<section aria-label="Experience">
  <h2 class="section-label">Experience</h2>
  <ul>
    {
      experience.map((entry) => (
        <li>
          <div class="row">
            <span>
              <strong>{entry.org}</strong>
              <span class="role">{entry.role}</span>
            </span>
            <span class="dates">{entry.dates}</span>
          </div>
          {entry.detail && <p class="detail">{entry.detail}</p>}
        </li>
      ))
    }
  </ul>
</section>

<style>
  section {
    margin-top: 3rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
  }

  li + li {
    margin-top: 0.85rem;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    font-size: 0.9375rem;
  }

  .role {
    color: var(--muted);
    margin-left: 0.5rem;
  }

  .dates {
    color: var(--faint);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .detail {
    color: var(--muted);
    font-size: 0.875rem;
    margin-top: 0.2rem;
  }
</style>
```

- [ ] **Step 4: Write Footer component**

`src/components/Footer.astro`:

```astro
---
import { links } from '../data/resume';
---

<footer>
  {
    links.map((link, i) => (
      <>
        {i > 0 && <span class="sep">·</span>}
        <a href={link.href}>{link.label}</a>
      </>
    ))
  }
</footer>

<style>
  footer {
    margin-top: 4rem;
    padding-top: 1rem;
    border-top: 1px solid var(--rule);
    font-size: 0.875rem;
    color: var(--muted);
  }

  .sep {
    margin: 0 0.5rem;
    color: var(--faint);
  }
</style>
```

- [ ] **Step 5: Compose the page**

`src/pages/index.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Header from '../components/Header.astro';
import Intro from '../components/Intro.astro';
import Experience from '../components/Experience.astro';
import Footer from '../components/Footer.astro';
import { meta } from '../data/resume';
---

<Base title={meta.title} description={meta.description}>
  <Header />
  <Intro />
  <Experience />
  <Footer />
</Base>
```

- [ ] **Step 6: Verify build, content, and the zero-JS constraint**

```bash
npm run check && npm run build
grep -o '<script' dist/index.html | wc -l
grep -o 'Founding Engineer' dist/index.html | wc -l
grep -o 'https://fonts' dist/index.html | wc -l
```

Expected: check passes; then `0` (zero-JS constraint), `1`, `0` (no external font requests).

- [ ] **Step 7: Commit**

```bash
git add src
git commit -m "Add header, intro, experience, footer components"
```

---

### Task 5: Netlify config

**Files:**
- Create: `netlify.toml`

**Interfaces:**
- Consumes: `npm run build` → `dist/` (Task 1).
- Produces: Netlify builds Astro instead of CRA (old pipeline published `build/`).

- [ ] **Step 1: Write netlify.toml**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

- [ ] **Step 2: Verify the exact command Netlify will run**

```bash
rm -rf dist && npm run build && test -d dist && echo "PUBLISH DIR OK"
```

Expected: `PUBLISH DIR OK`.

- [ ] **Step 3: Commit**

```bash
git add netlify.toml
git commit -m "Add Netlify build config for Astro (publish dist/)"
```

---

### Task 6: End-to-end verification + PR

**Files:** none created; verification and handoff.

**Interfaces:**
- Consumes: everything above.
- Produces: pushed `astro-rewrite` branch + open PR + Netlify deploy preview URL for user review.

- [ ] **Step 1: Full local verification**

```bash
npm run check && npm run build
```

Then serve the built site (`npm run preview`) and view it in a browser: desktop width and a ~375px mobile width. Confirm: cream background, serif intro paragraphs, ruled Experience label, right-aligned dates that don't wrap on mobile, three links in header and footer, no horizontal scrollbar at 375px.

- [ ] **Step 2: Push branch and open PR**

```bash
git push -u origin astro-rewrite
gh pr create --title "Rebuild site with Astro" --body "$(cat <<'EOF'
Replaces the 2019 CRA site with a single-page, zero-JS Astro resume site per docs/superpowers/specs/2026-07-09-astro-rebuild-design.md.

- Warm editorial design, system fonts, no external requests
- All content in src/data/resume.ts
- netlify.toml switches the publish dir from build/ to dist/

Review on the Netlify deploy preview before merging — merging ships to jarrodperez.com.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: PR URL printed; Netlify comments a deploy-preview link on the PR within a few minutes.

- [ ] **Step 3: Hand off to user**

User reviews copy and rendering on the deploy preview (desktop + phone) and checks the link unfurl. Merging the PR deploys to production. Do not merge without explicit user approval.
