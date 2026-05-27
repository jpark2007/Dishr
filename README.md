# Dishr

> Instagram meets a cookbook — social recipe sharing and discovery for people who actually cook.

Dishr lets you create and import recipes, follow other cooks, log "tries" with ratings and photos, and discover recipes through smart taste-matched filters.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | Expo (React Native) + TypeScript + Expo Router |
| Styling | NativeWind (Tailwind for RN) |
| Backend | Supabase (PostgreSQL + Auth + Realtime + Storage) |
| State | Zustand + TanStack React Query v5 |
| Edge | Supabase Edge Functions (Deno) |

## Getting Started

```bash
npm install
npx expo start
```

- Press `i` for iOS simulator (requires Xcode)
- Press `w` for web
- Scan QR code with Expo Go (SDK 55)

### Environment Variables

Create a `.env.local` at the project root:

```
EXPO_PUBLIC_SUPABASE_URL=<your-supabase-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

## Project Structure

```
app/
  (auth)/           # Login, signup, verify-email
  (tabs)/           # Feed, explore, add, profile
  (onboarding)/     # Welcome + palate quiz
  recipe/[id].tsx   # Recipe detail
  recipe/[id]/cook.tsx  # Cook mode
  try/[id].tsx      # Log a try
  user/[id].tsx     # Public user profile
components/         # FeedCard, RecipeCard, RatingDisplay, RatingSlider
lib/                # Supabase client, DB types, theme tokens, smart-sort
store/              # Zustand auth store
supabase/
  migrations/       # SQL schema
  functions/        # parse-recipe, parse-video edge functions
docs/               # Architecture, roadmap, plans
```

## Database

PostgreSQL via Supabase with Row-Level Security.

Key tables: `profiles`, `recipes`, `recipe_ingredients_flat`, `follows`, `feed_items`, `recipe_tries`, `saved_recipes`, `comments`

Realtime enabled on: `feed_items`, `recipe_tries`, `comments`

## Design System

Editorial palette — sage / clay / ochre on a near-white bone base. All color tokens live in `lib/theme.ts`.

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#F4F4F0` | Page background |
| `bone` | `#FCFCFA` | Screen background |
| `ink` | `#0B0B0C` | Primary text |
| `sage` | `#4A6B3E` | Brand primary |
| `clay` | `#C24A28` | Warm CTAs |
| `ochre` | `#C7902A` | Ratings / counts |

Never hardcode hex values — always use tokens from `lib/theme.ts`.

## Team

- **Drew (drewkhalil3)** — Technical lead
- **Jonah (jpark2007)** — Co-founder, product & growth
