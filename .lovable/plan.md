## Why the Instagram embed isn't working

Instagram's `/embed/` URL only works for **individual posts and reels** (e.g. `instagram.com/p/{postId}/embed`), not for **profile pages**. The URL we're using — `instagram.com/travelfunandactivecommunity/embed/` — returns a page that Instagram's frame-busting/X-Frame-Options blocks from rendering inside an iframe. That's why it always times out and falls back to "Live feed unavailable."

There is **no official free way** to embed a live Instagram profile feed. Meta removed the public profile embed years ago. The only real options:

### Option A — Embed a few hand-picked posts (free, works today)
Paste the URLs of 3–6 recent posts/reels from `@travelfunandactivecommunity`. Each one embeds cleanly via `instagram.com/p/{id}/embed` in an iframe. Downside: not automatic — you update the list when you want fresh posts.

### Option B — Third-party feed widget (automatic, paid/freemium)
Use a service like EmbedSocial, SnapWidget, Elfsight, or Behold.so. They authenticate with Instagram and give you a script/iframe that auto-updates. Most have a free tier with their branding; paid ~$5–15/mo to remove it.

### Option C — Instagram Graph API (automatic, free, most work)
Requires the account to be a Business/Creator account connected to a Facebook Page, plus a Meta developer app + long-lived access token stored in Lovable Cloud. A server function fetches recent media and we render a native grid. Most robust, but real setup effort on Meta's side.

### Option D — Keep the current static preview
Drop the broken iframe entirely and just show the branded card + "Follow on Instagram" CTA (what visitors already see today after the 6s timeout).

---

**Recommendation:** Option A is the fastest working result — real posts, no third-party accounts, no API keys. If you want auto-updating, Option B is the least effort.

Which would you like me to build? If Option A, paste 3–6 post URLs from the account. If Option B, tell me which provider (I can wire up any of them). If Option C, I'll walk you through the Meta setup. If Option D, I'll just remove the iframe code.