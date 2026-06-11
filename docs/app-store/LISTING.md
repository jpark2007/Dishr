# Dishr — App Store Listing Reference

Everything App Store Connect asks for, pre-answered. The text lives in
`store.config.json` (repo root) and can be pushed with `npx eas-cli metadata:push`.

## Listing copy

- **Name (30 chars max):** `Dishr — Social Cookbook` (23)
- **Subtitle (30 chars max):** `Save, cook, log and share` (25)
- **Keywords (100 chars max):** `recipe,cookbook,cooking,recipes,meal,food diary,tiktok recipes,fridge,social,import` (84)
- **Categories:** Food & Drink (primary), Social Networking (secondary)
- **Description:** see `store.config.json`
- **Privacy policy URL:** https://jpark2007.github.io/Dishr/privacy.html
- **Support URL:** https://jpark2007.github.io/Dishr/#support
- **Marketing URL:** https://jpark2007.github.io/Dishr/

> **Note — two websites exist.** Drew's animated landing site (`landing/`,
> Next.js) is live at https://becipe.netlify.app with its own /privacy and
> /terms, but it is still branded **Becipe**. The plain GitHub Pages site
> above is branded **Dishr** and matches the App Store name, so the listing
> uses those URLs. Once the Netlify site is rebranded to Dishr (ideally on a
> real domain), switch the three URLs here and in `store.config.json`.

## App Privacy ("nutrition label") answers

Data types collected, all **linked to identity**, none used for **tracking**:

| ASC category | What | Purpose |
|---|---|---|
| Contact Info → Email Address | Account email | App functionality |
| User Content → Photos or Videos | Recipe/try photos | App functionality |
| User Content → Other User Content | Recipes, tries, comments, messages | App functionality |
| Identifiers → User ID | Supabase auth UUID | App functionality |

Not collected: location, contacts, browsing history, purchase history,
health data, advertising identifiers. No third-party advertising, no data
sold, no tracking across apps.

## Age rating questionnaire

All content descriptors: **None**. Two answers to watch:

- **Unrestricted Web Access:** No (the app fetches recipe URLs server-side; it has no in-app browser)
- **User-Generated Content:** Yes — see the UGC warning below

Expected rating: **12+/13+** (driven by UGC + social features).

## ⚠️ App Review risk: UGC moderation (Guideline 1.2)

Apple requires apps with user-generated content to have ALL of:

1. A method for filtering objectionable content
2. A mechanism for users to **report** offensive content
3. The ability to **block** abusive users
4. Published contact information

Dishr currently has **none of #1–3** (roadmap lists reporting/blocking as
post-launch). This is fine for TestFlight, but is a **likely rejection** at
App Store review. Minimum viable fix before submission: a "Report" action on
recipes/tries/comments (can just insert a row to a `reports` table) and a
"Block user" action that hides their content. Budget ~1 day.

## Screenshots (required before submission)

- **6.9" (iPhone 16 Pro Max et al.):** 1320 × 2868 — required
- **6.5" (older devices):** can be derived from 6.9" automatically by ASC
- Plan: 5–6 shots from simulator — Feed, Recipe detail, Cook mode, Fridge
  mode, Log-a-try, Profile. Take with `xcrun simctl io booted screenshot`.

## App Review notes (fill in before submission)

- Demo account: create `appreview@dishr.test` with seeded content once the
  backend is live; put credentials in the review notes.
- Note for reviewer: "Recipe import fetches public recipe pages server-side
  via Supabase edge functions; no login is required on the source sites."

## Submission sequence (after TestFlight beta)

1. Add report/block actions (see UGC warning) — likely required to pass review.
2. `npx eas-cli metadata:push` — uploads listing copy from store.config.json.
3. Upload screenshots in ASC (metadata push doesn't handle screenshots).
4. Complete App Privacy + age rating questionnaires in ASC (answers above).
5. Select the TestFlight build → Submit for review.
