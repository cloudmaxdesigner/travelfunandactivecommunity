# SkyElite Hero Landing

Build a single-section hero landing page matching the provided spec.

## Files

1. **src/routes/index.tsx** — Replace placeholder with the hero page:
   - `useState` for mobile menu open/close
   - Outer `min-h-screen bg-gray-50`
   - Hero: `relative h-screen overflow-hidden`
     - `<video>` fixed to viewport: `absolute inset-0 w-full h-full object-cover`, `autoPlay muted loop playsInline`, src = the CloudFront URL
   - Content wrapper `relative h-full flex flex-col`
     - Nav: `max-w-7xl mx-auto w-full px-8 py-6 flex items-center justify-between`
       - Brand "SkyElite" (`text-2xl font-semibold text-gray-900`)
       - Desktop menu `hidden md:flex gap-8` — Start, Story, Rates, Benefits, FAQ (`text-gray-900 hover:text-gray-700 transition-colors`)
       - Mobile hamburger `md:hidden` toggling `Menu` / `X` from `lucide-react`
       - Mobile dropdown: `absolute top-full right-8 bg-white/95 backdrop-blur rounded-xl shadow-lg p-4 flex flex-col gap-3`
     - Main: `flex-1 flex items-center justify-center`
       - Inner column `-mt-80 text-center flex flex-col items-center`
         - Label "PRIVATE JETS" (`text-sm font-semibold text-gray-600 tracking-wider mb-4`)
         - H1 "Premium." (`text-6xl md:text-7xl lg:text-8xl font-normal text-gray-500 leading-none tracking-tighter`)
         - H1 "Accessible." same sizing, `style={{ color: '#202A36', marginTop: '-12px' }}`
         - Subtitle "Your dedication deserves recognition." (`text-lg md:text-xl text-gray-600 mb-6 mt-6 max-w-2xl`)
         - Buttons row `flex gap-4 justify-center`:
           - Discover: `px-4 py-2 rounded-full bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition-colors`
           - Book Now: `px-4 py-2 rounded-full text-white font-medium transition-colors` with inline style bg `#202A36`, hover swap to `#1a2229` via `onMouseEnter/Leave`
   - `head()` with real title/description ("SkyElite — Premium Private Jets", matching og/twitter)

2. **src/routes/__root.tsx** — Add Google Fonts Inter preconnect + stylesheet links (weights 400/500/600/700) to the root `head().links`.

3. **src/styles.css** — Add `--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;` inside `@theme` and set `body { font-family: var(--font-sans); }` in the base layer so Inter applies globally.

## Notes

- `lucide-react` is already available in the shadcn stack; no install needed.
- No backend, no new dependencies, no routing changes beyond the index page.
