# jarrodperez.com — Astro Rebuild Design

**Date:** 2026-07-09
**Status:** Approved pending user review

## Goal

Replace the 2019-era Create React App site with a single-page Astro resume site. Jarrod is actively job hunting across staff-IC and engineering-manager roles. The site is deliberately NOT tuned to any single posting — it presents the durable identity those roles hire for: **a product engineer with design roots who leads front-end teams and ships AI-native software (MCP apps, LLM integrations) end to end.** Per-job tuning lives in resume PDFs and cover letters, not here. The design signals taste through restraint.

## Visual direction

Warm editorial (chosen over a dark-developer and a bold-gradient direction during brainstorming):

- Single narrow left-aligned column (~640px), generous whitespace
- Cream background (`#f6f3ec` family), near-black ink text, muted warm grays for secondary text
- Serif (Georgia/Charter stack) for prose paragraphs; system sans (Helvetica stack) for name, labels, and list rows
- Section labels: small, letter-spaced, muted, with a hairline rule
- Dates right-aligned on experience rows
- No decoration, no animations, no icons beyond the three header links

## Page content (single page, four blocks)

1. **Header** — "Jarrod Perez", subtitle "Full Stack Product Engineer", quiet links: GitHub (github.com/jarrodjperez), LinkedIn (linkedin.com/in/jarrodperez), email (perez.jarrod@gmail.com). Twitter is dropped.
2. **Intro** — two short serif paragraphs, personal voice, covering (in rough priority order):
   - Founding engineer at Summer: builds AND leads — owns the front end (team and architecture) across web apps, public APIs, and MCP apps. The MCP/LLM production work gets a full sentence of its own, not a list-item mention.
   - Design roots (B.S. Digital Arts & Design; years as a UX engineer at PlayStation): why he's self-sufficient from idea to production, and why he gravitates to the design-engineering seam.
   - Management is real, not implied: he has led/managed engineers at both Infura and Summer.
   - Exact copy drafted at implementation time; user reviews it on the deploy preview.
3. **Experience** — ruled section, one row per entry, dates right-aligned; one-line details where they earn their place:
   - Summer — Founding Engineer — Sept 2022–present — "leads front end across web apps, public APIs, and MCP apps"
   - Infura — Front End Lead — 2019–2022
   - Sony PlayStation — Senior UX Engineer — 2012–2019
   - Markit on Demand — Senior Software Engineer — 2008–2012
   - Full Sail University — B.S. Digital Arts & Design — 2006
4. **Footer** — minimal; repeats the three links as text, nothing else.

Explicitly removed from the old site: the Bulma skills grid (dated tool lists), the Twitter link, scroll animations (AOS), Font Awesome.

## Architecture

- **Astro** (latest stable), fully static output, **zero client-side JavaScript**
- **Content lives in `src/data/resume.ts`** — typed objects for intro copy, experience entries, and links. Markup never needs touching for a content edit.
- Components: `src/pages/index.astro` composing `Header`, `Intro`, `Experience`, `Footer` (all `.astro`, scoped styles)
- `src/styles/global.css` holds design tokens (colors, type scale, measure) as CSS custom properties
- System font stacks only — no font files, no external requests
- SEO: `<title>`, meta description, Open Graph tags (recruiters will unfurl this link), favicon, `site: 'https://jarrodperez.com'` in `astro.config.mjs`
- All CRA-era files (src/, public/, package.json deps, yarn.lock) deleted in the rewrite; git history preserves them

## Deployment

- Existing Netlify CD pipeline stays; repo is already connected
- Add `netlify.toml`: build `npm run build`, publish `dist/`, pin a current Node LTS. (Explicit config required — the CRA site published from `build/`.)
- Custom domain jarrodperez.com already configured on Netlify; no DNS changes

## Process & verification

- Work on branch `astro-rewrite`; open a PR to get a Netlify deploy preview
- Verify: `astro build` succeeds; preview URL checked on desktop and mobile widths; link unfurl (OG tags) checked; user reviews copy and look on the preview before merging
- Merge to main ships to production

## Out of scope

- Blog/writing section, projects section (possible later additions; the data-file structure doesn't preclude them)
- Analytics
- Dark mode (the cream design is the brand; can revisit later)
