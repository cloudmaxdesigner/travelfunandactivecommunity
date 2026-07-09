# Travel, Fun and Active Community — Full Website

An editorial-magazine style nonprofit site with functional backends for events, signups, donations, and a blog. Built on TanStack Start + Lovable Cloud, with Stripe for donations.

## Design direction

- **Palette (Adventure Sunset):** `#0c2340` navy, `#e85d3a` sunset orange, `#f7931e` amber, `#f5f0e0` warm cream. White + dark navy for text.
- **Type:** Outfit (headings, tight tracking) + Figtree (body). Loaded via `@fontsource`.
- **Feel:** Editorial magazine — big serif-weight headlines in Outfit, generous whitespace, oversized photography, asymmetric grid modules, warm cream section backgrounds alternating with white, sunset-orange accents and buttons, subtle scroll reveals.
- **Logo:** the uploaded TFAC logo used in the header, footer, and social share image.

## Pages / routes

Separate route files, each with its own SEO `head()`:

1. `/` — Home: hero with logo + tagline "Travel. Connect. Grow.", mission blurb, program highlights grid, upcoming events preview, founder spotlight, newsletter CTA, IG-style photo strip.
2. `/about` — Mission, story, "What We Do" list, community impact, economic development sections.
3. `/programs` — Editorial cards for each activity area (hikes, cultural exchange, wellness, leadership, youth/newcomer, group travel, workforce/entrepreneurship, skills development).
4. `/events` — Live list of upcoming events from DB; each event has an RSVP form (name, email, phone, guests).
5. `/get-involved` — Volunteer/membership signup form + list of learning/volunteer opportunities.
6. `/donate` — Suggested amounts + custom, one-time Stripe Checkout.
7. `/blog` — Post index; `/blog/$slug` for post detail. Public read.
8. `/contact` — Contact form (name, email, subject, message) + phone/email/location, Instagram link.
9. `/auth` — Admin login.
10. `/_authenticated/admin` — Admin dashboard: manage events, view RSVPs, view contact/newsletter/volunteer submissions, create/edit blog posts.

Global: sticky header with logo + nav, footer with contact info, IG link, newsletter inline.

## Backend (Lovable Cloud / Supabase)

Tables (all with GRANTs + RLS):
- `events` (id, title, slug, description, location, starts_at, ends_at, cover_url, capacity, published) — public read published; admin write.
- `event_rsvps` (id, event_id, name, email, phone, guests, created_at) — anon insert; admin read.
- `volunteers` (id, name, email, phone, interests, message, created_at) — anon insert; admin read.
- `contact_messages` (id, name, email, subject, message, created_at) — anon insert; admin read.
- `newsletter_subscribers` (id, email unique, created_at) — anon insert; admin read.
- `blog_posts` (id, slug unique, title, excerpt, body, cover_url, published, published_at, author_id) — public read where published; admin write.
- `donations` (id, amount_cents, currency, email, stripe_session_id, status, created_at) — admin read; webhook-writer.
- `user_roles` + `app_role` enum + `has_role()` — for admin gate.

Server functions:
- Public: `listPublishedEvents`, `getEventBySlug`, `listPublishedPosts`, `getPostBySlug`, `createRsvp`, `createVolunteer`, `createContactMessage`, `subscribeNewsletter` (all Zod-validated, publishable-key client).
- Auth (admin): CRUD for events + blog posts, list submissions.
- Stripe: `createDonationCheckout` (server fn), `/api/public/webhooks/stripe` route to record donations.

Auth: email/password via Supabase; first admin promoted by seeding a `user_roles` row after signup.

Stripe: enabled via `enable_stripe_payments` (Lovable-managed, no key needed).

## Content & assets

- Copy pulled directly from the uploaded org profile PDF.
- Logo copied from uploads into `src/assets/` (Lovable Assets pointer).
- Placeholder cover imagery generated with `imagegen` (hikes, group travel, community events) in Adventure Sunset palette until real photos are added — Instagram scraping isn't available, so the "IG strip" on Home uses the same curated set with a link out to the IG page.

## Parallel execution

Work will be dispatched to sub-agents in parallel:
- **Agent A — Foundation:** enable Cloud, run migrations for all tables + RLS + GRANTs + roles, add seed events/posts, install fonts, set up design tokens in `src/styles.css`, logo asset, header/footer components, root SEO.
- **Agent B — Public pages:** `/`, `/about`, `/programs`, `/contact` routes + contact/newsletter/volunteer server fns and forms.
- **Agent C — Events + Blog:** `/events` + `/events/$slug` + RSVP, `/blog` + `/blog/$slug`, all read server fns, generated cover images.
- **Agent D — Donations + Admin:** enable Stripe, donation checkout + webhook, `/auth`, `_authenticated/admin` dashboard with event/post CRUD and submission views.

After all agents finish, run a Playwright smoke test across every route and verify forms write to the DB.

## Confirmations needed before build

1. **Stripe donations** requires enabling Lovable Payments (Pro plan). OK to proceed? If not, I'll swap Donate for a "Contact us to donate" page.
2. **Admin login:** OK to use email/password, and use `travelfunandactivecommunity@gmail.com` as the seeded admin email (you'll set the password on first login)?
3. **Photos:** OK to use AI-generated placeholder imagery in the Adventure Sunset palette for now, with the IG link prominent so real photos come later? (Instagram's API requires business-account approval, so live IG pulls aren't feasible.)
