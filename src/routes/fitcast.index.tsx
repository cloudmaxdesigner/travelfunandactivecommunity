import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { AppExperience, PhoneFrame } from "@/components/fitcast/AppExperience";
import { ImageReveal } from "@/components/fitcast/ImageReveal";
import { Checker, Corner, Framed, Globe, Logo } from "@/components/fitcast/Shapes";
import { FITCAST_FONTS, IMAGES } from "@/lib/fitcast/data";
import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/fitcast/")({
  head: () => ({
    meta: [
      { title: "FITCAST — Wake up already dressed" },
      {
        name: "description",
        content:
          "FITCAST turns photos of your real clothes into a daily outfit drop: your AI twin, dressed for the weather and your vibe, plus hype video edits to post.",
      },
      { property: "og:title", content: "FITCAST — Wake up already dressed" },
      { property: "og:image", content: IMAGES.base },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FITCAST_FONTS },
    ],
  }),
  component: FitcastLanding,
});

const STEPS = [
  {
    n: "01",
    title: "SCAN YOUR CLOSET",
    body: "Snap each piece. Background removed, tagged by type, colour, warmth and vibe.",
  },
  {
    n: "02",
    title: "BUILD YOUR TWIN",
    body: "Four photos train a private model of you, so every look is rendered on your body.",
  },
  {
    n: "03",
    title: "THE 7:30 DROP",
    body: "Every morning: a push with today's fit, chosen for the forecast, your calendar and mood.",
  },
  {
    n: "04",
    title: "HYPE EDITS",
    body: "Your looks cut to the beat as a 9:16 edit, ready for TikTok, Reels or the group chat.",
  },
];

const navLink = "uppercase transition-opacity hover:opacity-50";

function FitcastLanding() {
  const isMobile = useIsMobile();

  return (
    <div className="fc-landing fc-jakarta bg-white text-black antialiased selection:bg-black selection:text-white">
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col justify-between overflow-hidden">
        <ImageReveal />

        <header
          className="relative z-20 flex items-center justify-between"
          style={{ paddingInline: "var(--pad-x)", paddingTop: "var(--header-pt)" }}
        >
          <Link
            to="/fitcast"
            className="transition-opacity hover:opacity-80"
            style={{ fontSize: "var(--logo)" }}
          >
            <Logo />
          </Link>
          <nav
            className="flex items-center font-medium tracking-[0.2em]"
            style={{ gap: "var(--gap-nav)", fontSize: "var(--nav)" }}
          >
            <a href="#how" className={`${navLink} hidden sm:inline`}>
              How it works
            </a>
            <a href="#edits" className={`${navLink} hidden sm:inline`}>
              Edits
            </a>
            <span className="hidden text-gray-400 sm:inline">|</span>
            <Link to="/fitcast/app" className={`${navLink} flex items-center gap-1`}>
              Open app <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </nav>
        </header>

        <main
          className="relative z-10 flex flex-1 flex-col justify-between gap-10 lg:flex-row"
          style={{ paddingInline: "var(--pad-x)", paddingBlock: "var(--main-py)" }}
        >
          <div className="flex flex-col justify-center">
            <Corner pos="tl" />
            <h1
              className="fc-orbitron my-3 font-extrabold uppercase leading-[1.05] tracking-[0.08em]"
              style={{ fontSize: "var(--headline)" }}
            >
              Wake up
              <br />
              already
              <br />
              dressed <Checker />
            </h1>
            <Corner pos="bl" />
            <p
              className="mt-6 max-w-sm font-medium text-gray-600"
              style={{ fontSize: "var(--body)" }}
            >
              Your real closet. Your AI twin. A new outfit every morning — matched to the weather
              and your vibe — and a hype edit to prove it.
            </p>
            <Link
              to="/fitcast/app"
              className="group mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-gray-400 font-semibold uppercase tracking-[0.18em] transition-colors hover:border-black hover:bg-black hover:text-white"
              style={{ fontSize: "var(--body)", padding: "var(--btn-py) var(--btn-px)" }}
            >
              Open the app
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <Framed className="self-start lg:self-end">
            <div
              className="flex flex-col gap-3 bg-white/70 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none"
              style={{ padding: "var(--feature-pad)", minWidth: "var(--feature-min)" }}
            >
              <Globe />
              <p
                className="font-semibold uppercase leading-relaxed tracking-[0.18em]"
                style={{ fontSize: "var(--body)" }}
              >
                Weather-read.
                <br />
                Vibe-matched.
              </p>
            </div>
          </Framed>
        </main>

        {/* Below lg the interactive reveal is replaced by a static frame */}
        <div className="relative z-10 pb-8 lg:hidden" style={{ paddingInline: "var(--pad-x)" }}>
          <img
            src={IMAGES.base}
            alt="Editorial fashion look"
            className="aspect-[4/5] w-full border border-gray-200 object-cover sm:aspect-[16/9]"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        className="border-t border-gray-200"
        style={{ padding: "clamp(3rem, 8vh, 6rem) var(--pad-x)" }}
      >
        <p
          className="font-semibold uppercase tracking-[0.25em] text-gray-500"
          style={{ fontSize: "var(--micro)" }}
        >
          How it works
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <Framed key={s.n}>
              <div className="flex h-full flex-col gap-3 p-6">
                <span className="fc-orbitron text-3xl font-black">{s.n}</span>
                <h3 className="fc-orbitron text-sm font-bold tracking-[0.12em]">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{s.body}</p>
              </div>
            </Framed>
          ))}
        </div>
      </section>

      {/* LIVE PROTOTYPE */}
      <section
        id="edits"
        className="grid items-center gap-12 border-t border-gray-200 bg-[#f4f4f2] lg:grid-cols-2"
        style={{ padding: "clamp(3rem, 8vh, 6rem) var(--pad-x)" }}
      >
        <div>
          <p
            className="font-semibold uppercase tracking-[0.25em] text-gray-500"
            style={{ fontSize: "var(--micro)" }}
          >
            Live prototype
          </p>
          <h2 className="fc-orbitron mt-4 text-3xl font-extrabold uppercase leading-tight tracking-[0.06em] sm:text-5xl">
            See it.
            <br />
            Want it.
            <br />
            Wear it.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-gray-600">
            Seeing yourself in the edit is the motivation. FITCAST cuts your week of looks to a beat
            — punch-ins, flashes, captions — so getting dressed feels like a drop, not a chore.
          </p>
          <ul className="mt-6 space-y-2 text-sm font-medium uppercase tracking-[0.14em]">
            <li>— Shuffle today's fit</li>
            <li>— Scan a piece from your camera</li>
            <li>— Cut a hype edit at 88–140 BPM</li>
            <li>— Train your twin from 4 photos</li>
          </ul>
          <Link
            to="/fitcast/app"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-80"
          >
            Full screen <ArrowUpRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="hidden justify-center md:flex">
          {!isMobile && (
            <PhoneFrame>
              <AppExperience />
            </PhoneFrame>
          )}
        </div>
      </section>

      <footer
        className="border-t border-gray-200 py-6 text-center font-medium uppercase tracking-[0.2em] text-gray-500"
        style={{ fontSize: "var(--micro)" }}
      >
        FITCAST © 2026 — Dressed by your forecast
      </footer>
    </div>
  );
}
