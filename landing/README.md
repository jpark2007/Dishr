# Becipe — Landing Page

Scroll-driven marketing site for Becipe. Next.js (App Router) + Tailwind v4 + Framer
Motion, static-exported so it drops straight onto Netlify. Wears Becipe's parchment
editorial identity (sage / clay / ochre on bone) and borrows the scroll-narration
technique — sticky sequences, 3D phone parallax, crossfading app states.

## Develop

```bash
cd landing
npm install
npm run dev        # http://localhost:3000
```

## Build static site

```bash
npm run build      # outputs ./out  (fully static)
```

## Deploy

**Netlify Drop:** run `npm run build`, then drag the `landing/out/` folder onto
<https://app.netlify.com/drop>. Done.

**Netlify (git/CLI):** build command `npm run build`, publish directory `out`.

### Waitlist form
The waitlist uses Netlify Forms (`name="waitlist"`). On Netlify it's captured
automatically — view submissions in the Netlify dashboard under *Forms*. No backend
needed. Off Netlify, the submit gracefully shows a thank-you state.

## Structure

```
app/
  layout.tsx        fonts (Fraunces / Inter / DM Mono) + metadata
  globals.css       Becipe design tokens + reduced-motion
  page.tsx          assembles the scroll narrative
  privacy/          /privacy   (App Store-required)
  terms/            /terms     (App Store-required)
components/
  ui.tsx            Reveal, ScrollProgressBar, PhoneFrame, ProgressDots, buttons
  screens.tsx       faithful live mockups of the real app screens
  Showpiece.tsx     the sticky scroll-through-the-app phone sequence
  sections.tsx      Nav, Hero, Problem, Features, Alive, Closer, Footer
  legal.tsx         shared layout for the legal pages
```

## Notes
- Phone mockups are rebuilt from the app's real components (`FeedCard`, `MatchPill`,
  `RecipeCard`, `RatingDisplay`) + `lib/theme.ts`, so they animate crisply at any size.
- The App Store badge is a placeholder slot — swap its `href` at launch.
- Legal pages are good-faith templates; have them reviewed before submitting to the
  App Store.
