# FITCAST — AI stylist app plan

> Wake up already dressed. Photograph your real clothes, train a private AI twin of yourself, and every
> morning get a push showing **you** in today's outfit, picked for the weather and your vibe. Your
> week of looks is also cut into a TikTok-style hype edit.

Prototype routes in this repo:

| Route          | What it is                                                                     |
| -------------- | ------------------------------------------------------------------------------ |
| `/fitcast`     | Marketing landing page with a cursor-reveal hero and a live phone prototype     |
| `/fitcast/app` | The app: Today, Closet, Edit, Twin (full screen on phones, framed on desktop)   |

---

## 1. UI direction (MotionSites)

Two MotionSites prompts, combined:

- **Synth Mode** (Fashion, free): white, minimal, futuristic. Orbitron + Plus Jakarta Sans, fluid
  `clamp()` sizing, L-corner brackets, checkerboard and wireframe-globe line art, and a cursor-spotlight
  **dual-image reveal** with a parallax grid. Used for the **landing page**
  (`src/components/fitcast/ImageReveal.tsx`, `Shapes.tsx`).
- **Coffee Rewards** (Mobile app, free): an iOS profile screen in a phone mockup. It has a 430px hero
  that fades into the background, a name block that overlaps the hero, glass pill and circle buttons,
  a 3-up stat grid, a "favourite" card with a shuffle button, and a staggered `fadeRise` entry sequence
  on `cubic-bezier(0.16,1,0.3,1)`. Used for the **in-app Today screen**, re-skinned from warm coffee to
  near-black, with one acid-lime accent for the "hype" moments.

Considered (premium, not unlocked): *Orla Fashion* and *Editorial Eyewear*. These are worth pulling if
you get a MotionSites plan, for the editorial landing sections and product-detail pages:
https://motionsites.ai/unlimited

### Why the UI is intuitive

- **One job per tab:** Today (wear) · Closet (own) · Edit (share) · Twin (setup).
- **The morning push is the front door.** Tapping it opens Today, with the twin image at the top and the
  reasons it works underneath. There is nothing to configure before you get value.
- **Every screen has one primary action, styled the same way** (a full-width pill): *Make my hype edit*,
  *Add to closet*, *Render HD edit*, *Build my twin*.
- **Vibe chips and the shuffle button** are the only controls on Today. Both give instant feedback.
- `prefers-reduced-motion` turns off every `fc-a-*` animation.

---

## 2. System architecture

```
Phone (PWA → Expo later)
  │  push (FCM / APNs / Web Push)
  ▼
Edge API (TanStack Start server fns on Cloudflare)
  ├── Supabase: auth, Postgres, Storage (closet photos, twin refs, renders)
  ├── Daily cron 05:00 local → build_daily_drop(user)
  │      weather (Open-Meteo) + calendar (optional) + closet + wear history
  │      → recommend() → try-on render → push
  └── Job queue (Supabase Queues / Cloudflare Queues) → render workers
         ├── Try-on image: twin + garments → still
         └── Hype edit: stills → motion clips → beat-synced cut → MP4
```

### Data model (Supabase)

- `profiles(id, display_name, city, lat, lon, drop_time, tz, style_dna text[])`
- `closet_items(id, user_id, photo_path, cutout_path, category, color_hex, warmth, waterproof, vibes text[], wears, last_worn_at)`
- `twins(user_id, status, ref_photo_paths text[], provider, provider_model_id)`
- `looks(id, user_id, date, vibe, item_ids uuid[], weather jsonb, image_path, reasons text[], worn bool)`
- `edits(id, user_id, look_ids uuid[], template, engine, status, video_path, cost_cents)`

Row-level security: `user_id = auth.uid()` on every table. The storage buckets are private and served
through signed URLs only.

---

## 3. The AI pipeline, step by step

### 3.1 Closet digitisation (cheap, runs on upload)

1. Remove the background. Options are `@imgly/background-removal` on the device (free) or a hosted
   segmentation model.
2. Tag with a vision LLM (Claude or Gemini) that returns JSON:
   `{category, color_hex, warmth 0-3, waterproof, vibes[]}`. The user confirms the tags in one sheet,
   which is already prototyped in the Closet screen.

### 3.2 The twin (one-time, about 4 photos)

The user uploads a face (front and side) and a full body (front and side). Store them as reference
images. Today you don't need to fine-tune a model: current image models condition on reference
photos directly.

### 3.3 Recommendation (deterministic first, then learned)

`src/lib/fitcast/engine.ts` is the v1 engine. It works like this:

- Turns the feels-like temperature into a target warmth level, and requires outerwear when it's cold or
  raining.
- Scores each item: vibe match +3, distance from the target warmth, weatherproof bonus when it's
  raining, a nudge toward pieces you rarely wear, and seeded noise so *shuffle* gives a new pick.
- Keeps the palette calm: at most two non-neutral colours per look.
- Writes human-readable "why this works" reasons.

v2 adds feedback (thumbs up or down, and "wore it"), calendar context (meetings → Work vibe), and an
LLM re-ranker over the top 5 candidates.

### 3.4 Try-on image ("you in the outfit")

| Option                                     | Notes                                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **FASHN API** (recommended for v1)         | Purpose-built virtual try-on. *Try-On Max* (Jan 2026) targets higher-end output, about 4 credits and ~50s per image. Open weights (VTON v1.5) are an option for self-hosting later. |
| fal.ai try-on models                       | One SDK for FASHN, Kling Kolors and FLUX try-on. Pay per use, good for A/B testing.                            |
| Gemini image model (multi-reference edit)  | Good for full-look composition from twin + garment refs. I couldn't confirm a dedicated try-on endpoint, so test fidelity before relying on it. |

Run try-on once per morning look, plus on demand when the user shuffles. Cache by `(twin, item_ids)`.

### 3.5 Hype video edits — Veo 3 vs Higgsfield vs CapCut

The edit has **two separate parts**. Don't make one vendor do both:

1. **Motion clips.** Animate each look still into a 3–5s clip (walk-in, turn, camera push).
2. **The edit.** Cut those clips to a beat with punch-ins, flashes, shake, captions and music. That is
   deterministic video compositing, not generative AI.

| Part         | Choice                                                     | Why                                                                                                                                                                                                                                           |
| ------------ | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Motion clips | **Veo 3.1 Fast via the Gemini API** (default)              | Official, stable API with image-to-video and native audio. Third-party trackers list about **$0.10/s** at 720p (Fast), $0.40/s for Standard and about $0.05/s for Lite. Check Google's pricing page before budgeting. A 4-clip × 4s edit costs roughly **$1.60** on Fast. |
|              | Kling (via fal.ai)                                         | Strong fabric and body motion, so it's a good fallback for A/B quality tests.                                                                                                                                                                       |
|              | Higgsfield                                                 | Great camera-move presets that feel "TikTok". **I couldn't find official API docs.** Third-party listings claim a usage-based API at about $0.14/s, but the details conflict. Treat it as unverified until you confirm with Higgsfield directly.                     |
| The edit     | **Remotion (or FFmpeg) render worker** (recommended)       | Templates as code: BPM grid, punch / flash / shake / glide transitions, captions. Same output every time, costs pennies, and you own it. The in-browser preview on the Edit tab already uses this exact model (cuts every 2 or 4 beats at a template BPM).            |
|              | Shotstack / Creatomate                                     | Hosted JSON-to-video if you'd rather not run render workers.                                                                                                                                                                                       |
|              | CapCut                                                     | **No official general-purpose editing or render API.** The community "CapCutAPI" projects write draft files you open in the app, and CapCut's terms restrict automation. Use it as a *share destination* ("Open in CapCut" / TikTok share), not in your pipeline. |

Music: license a royalty-free library (for example Epidemic or Artlist API), or let users pick a track
inside TikTok when they post. Don't ship copyrighted tracks inside the MP4.

Cost guardrails: free tier gets 1 HD edit a week on Lite/Fast. Unlimited daily try-ons and edits sit
behind a subscription. The daily morning look is a still image only. Video is generated on demand.

---

## 4. Notifications

- **v1 (PWA):** Web Push via the Push API and a service worker. It works on Android, and on iOS 16.4+
  once the user adds the app to the home screen. The Twin screen already requests permission and
  sends a local test notification.
- **v2 (native):** Wrap with Expo / React Native for reliable APNs/FCM, a camera-first closet scan,
  and a lock-screen widget showing today's look.
- A cron job runs at the user's `drop_time` minus a 90-minute render buffer, so the image is ready
  when the push lands.

---

## 5. Build phases

| Phase                  | Scope                                                                                                         | Est.    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- | ------- |
| **0. Prototype** ✅    | This branch: landing page, 4-tab app, live weather, rules engine, in-browser beat-cut preview, upload flows.  | done    |
| 1. Real closet         | Supabase tables and storage, auth, background removal and vision tagging, wear tracking.                      | 1–2 wk  |
| 2. Twin + try-on       | Reference upload, FASHN try-on, daily cron, Web Push.                                                         | 2 wk    |
| 3. Hype edits          | Veo 3.1 Fast clip generation, Remotion render worker, templates, share sheet.                                 | 2–3 wk  |
| 4. Native + growth     | Expo app, widgets, streaks ("7-day fit streak" edit), friends' fit checks, subscription.                      | 4+ wk   |

## 6. Open decisions

1. Should the app live in this TFAC repo or in its own repo / Lovable project? (I recommend its own
   project before Phase 1.)
2. FASHN or a Gemini image model for try-on: run a 20-look blind test on the same twin.
3. Should there be a Higgsfield tier at all? Only if its API is confirmed and its camera presets clearly
   beat Veo in that same test.
