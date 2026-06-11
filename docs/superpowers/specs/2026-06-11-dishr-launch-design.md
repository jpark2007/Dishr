# Dishr Launch Design — TestFlight Beta → Lean App Store Launch

Date: 2026-06-11
Status: Approved by jpark2007

## Goal

Get a TestFlight beta into testers' hands, with the fewest remaining steps to a
full App Store launch afterward.

## Current State (verified 2026-06-11)

| Item | State |
|------|-------|
| Apple Developer account | Exists — team `2WA54D67Y8` |
| App Store Connect app record | Exists — `ascAppId 6767257914`, bundle `com.becipie.app` |
| EAS | Logged in as `sbatman360`, project `51512aa1-a754-48ef-9ac8-57b4170e1e0e`, build + submit profiles configured |
| Supabase backend | **DEAD** — `olrfwpxtncfkunpjzyin.supabase.co` returns NXDOMAIN (project deleted). All 11 migrations + 2 edge functions are in the repo. |
| Codebase | Well past the roadmap: settings, liked, drafts, collections/albums, DMs, voice cook, friends, seed-data migrations all shipped |
| Legal / store assets | None |

## Plan

### Phase 1 — Unblocked work (no credentials needed)
1. Commit in-flight changes (app.json EAS project/owner, ROADMAP security updates, add-recipe fix) and this spec.
2. Codebase health: `npx tsc --noEmit`, `npx expo-doctor`; fix anything that would break the EAS build.
3. Privacy policy + terms of service, hosted at a public URL (required for
   external TestFlight testing and App Review).
4. App Store listing metadata: name, subtitle, description, keywords,
   privacy nutrition-label answers, age-rating answers, support URL.
   Stored in `docs/app-store/` and as an EAS Metadata `store.config.json`.

### Phase 2 — Backend resurrection (blocked on `npx supabase login` by user)
1. Create a fresh Supabase project via CLI (decision: new project; old one is gone).
2. Push migrations 001–017 in order.
3. Deploy edge functions `parse-recipe`, `parse-video`; set secrets.
4. Create storage buckets used by photo upload; enable realtime on
   `feed_items`, `recipe_tries`, `comments`.
5. Update `.env` with new URL + anon key; smoke test auth + REST.

### Phase 3 — TestFlight
1. `eas build --platform ios --profile production` (env vars are baked in —
   backend must be live first).
2. `eas submit --platform ios` → TestFlight internal testers immediately;
   external testers after adding the privacy policy URL + beta review.

### Phase 4 — App Store submission (after beta feedback)
1. Push listing metadata (`eas metadata:push` or ASC web).
2. Screenshots from simulator (6.9" + 6.5").
3. Submit for review.

## Explicitly deferred (post-beta, not required by Apple)

Push notifications, Sentry, PostHog, automated tests, comments UI, pagination.

## Risks

- Bundle ID `com.becipie.app` contains the old name typo but matches the
  existing ASC app record — **do not change it**; changing would orphan the record.
- `EXPO_PUBLIC_*` vars are compiled into the binary: any future backend URL
  change requires a rebuild.
- Seed migrations (007, 017) reference image URLs — verify they don't point at
  the dead Supabase project's storage.
