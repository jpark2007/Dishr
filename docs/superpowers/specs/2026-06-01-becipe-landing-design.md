# Becipe Landing Page — Design Spec

**Date:** 2026-06-01
**Owner:** Drew
**Status:** Approved (brainstorm) → implementation

## Goal

A "super fancy, realistic" scroll-driven marketing landing page for **Becipe** (social
recipe app). It wears Becipe's *own* warm parchment editorial identity, but borrows the
*technique* from Drew's other sites (getwhiteout, nightshiftautomations,
splitdecisions/presentation): scroll-driven sticky sequences, parallax transforms,
crossfading staged content, and interactive 3D-feeling polish — so the page feels like
gliding *through the actual app*.

Also hosts the legal pages the App Store submission needs: `/privacy` and `/terms`.

## Non-goals

- Not a copy of the reference sites' *look* (those are charcoal/coral/serif). Becipe owns
  its parchment/sage/clay/ochre + Inter identity.
- Not the Expo app itself. Separate project, separate folder.
- No paid image-gen / no heavy WebGL lib. The "3js feel" is CSS `perspective` + Framer
  Motion scroll transforms.

## Stack & location

- **Next.js (App Router) + Tailwind v4 + Framer Motion**, `output: 'export'` (static).
- New self-contained folder: `landing/` (own `package.json`; does not touch the Expo app).
- `npm run dev` → localhost. `npm run build` → `out/` for Netlify Drop.

## Identity (tokens, from `lib/theme.ts`)

| Token | Value | Use |
|-------|-------|-----|
| bg | #F4F4F0 | page bg (light sections) |
| bone | #FCFCFA | screen/card surface |
| ink | #0B0B0C | charcoal (dark sections + text) |
| inkSoft | #3A3A40 | secondary text |
| muted | #8A8A93 | tertiary |
| sage | #4A6B3E | brand primary / palate match |
| clay | #C24A28 | warm CTA / community accent |
| ochre | #C7902A | ratings / counts |
| parchment | #F5E9D3 | warm tint |

Font: **Inter** (display weight 900/700 for headlines, 500 body). Mono accent (DM Mono or
system mono) for eyebrow labels, uppercase + letter-spacing.

## Centerpiece: the "scroll-through-the-app" phone

- A phone bezel pinned via a sticky sub-section taller than the viewport.
- `useScroll({ target, offset:["start start","end end"] })` → `scrollYProgress`.
- Continuous transforms (no state) drive a subtle 3D tilt: `perspective` on the wrapper +
  `rotateX/rotateY/translateY` from `useTransform(scrollYProgress, ...)`.
- Stage index derived with `useMotionValueEvent` → screen **crossfades through app states**:
  1. Feed (FeedCard) → 2. Recipe detail → 3. Cook mode → 4. Log a Try (rating slider).
- Floating UI chips parallax at different depths: sage **palate-match pill** (`MatchPill`),
  ochre **rating**, clay **community** badge. Progress dots show position in the sequence.
- Screens are **live faithful mockups** rebuilt from real components (`FeedCard`,
  `RecipeCard`, `MatchPill`, `RatingSlider`, theme tokens) so elements animate independently
  and stay crisp at any size. Real screenshots grabbed opportunistically for reference.

## Scroll narrative (alternating bone / charcoal for rhythm)

1. **Hook** — eyebrow `BECIPE`, big headline (≤7 words), one support line (≤14), two CTAs
   (Get early access · See how it works), scroll indicator. Top scroll-progress bar.
2. **Problem beat** — recipes scattered across screenshots/TikToks/links; no one to cook with.
3. **Sticky "How it works"** — the phone centerpiece, 4 stages + progress dots.
4. **Feature grid** — `whileInView` staggered: Import any link/TikTok · Palate match ·
   Cook mode · Log tries · Follow cooks.
5. **"Alive" social beat** — faux live feed, pulsing `● LIVE` dot, try card spring-pops in.
6. **Closer CTA** — charcoal section: waitlist email capture **+** App Store badge slot.
7. **Footer** — links to `/privacy`, `/terms`.

## CTA behavior (pre-launch)

- Primary = **waitlist email capture** (Netlify Forms-compatible static form; graceful
  no-JS fallback) **and** an App Store badge placeholder slot ready to swap at launch.

## Legal pages

- `/privacy` and `/terms`: clean readable static pages on the same tokens. Starter copy
  tailored to Becipe (accounts, photo uploads, user-generated content, Supabase as
  processor, analytics). Clearly marked as a starting template for legal review. Existence
  of these URLs unblocks App Store submission blocker (privacy policy / terms required).

## Motion & accessibility

- Foundational reveal: `initial{opacity:0,y:24}` → `whileInView`, `viewport{once,margin:-100px}`.
- Stagger lists via `delay: i*0.12`. Spring "pops" for payoff cards.
- `@media (prefers-reduced-motion: reduce)` kills animation/transition durations.
- `overflow-x: hidden` on html/body to prevent transform bleed.

## Deliverable / hosting

- Runs at `localhost:3000` via `npm run dev`.
- `npm run build` → static `out/` → drag to Netlify Drop. README documents both.
