import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Compass, HeartHandshake, Mountain, Sparkles, Users } from "lucide-react";
import { Suspense } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { listPublishedEvents, listPublishedPosts } from "@/lib/site.functions";
import hero from "@/assets/hero-hike.jpg";
import community from "@/assets/community-event.jpg";
import travel from "@/assets/group-travel.jpg";
import leadership from "@/assets/leadership.jpg";
import logo from "@/assets/tfac-logo.asset.json";

const eventsQ = queryOptions({ queryKey: ["events", "upcoming"], queryFn: () => listPublishedEvents() });
const postsQ = queryOptions({ queryKey: ["posts", "list"], queryFn: () => listPublishedPosts() });

export const Route = createFileRoute("/")({
  loader: ({ context }) =>
    Promise.all([context.queryClient.ensureQueryData(eventsQ), context.queryClient.ensureQueryData(postsQ)]),
  head: () => ({
    meta: [
      { title: "Travel, Fun and Active Community — Connect, explore, belong" },
      {
        name: "description",
        content:
          "A Canadian non-profit using travel, cultural exchange, outdoor recreation, and leadership to build stronger, more inclusive communities.",
      },
      { property: "og:title", content: "Travel, Fun and Active Community" },
      { property: "og:description", content: "Travel, cultural exchange, outdoor recreation, and community-building across Canada." },
    ],
  }),
  component: Home,
});

const PROGRAMS = [
  { icon: Mountain, title: "Outdoor & Hikes", body: "Weekly community hikes and outdoor recreation across the GTA and beyond." },
  { icon: Compass, title: "Group Travel", body: "Curated group trips designed for connection, culture, and confidence." },
  { icon: Users, title: "Cultural Exchange", body: "Potlucks, storytelling, and cross-cultural nights that celebrate every background." },
  { icon: Sparkles, title: "Leadership & Skills", body: "Workshops in leadership, employability, entrepreneurship, and communications." },
  { icon: HeartHandshake, title: "Newcomer Support", body: "Programs that help newcomers find community, mentorship, and opportunity." },
  { icon: Users, title: "Wellness & Belonging", body: "Wellness initiatives that reduce social isolation and support whole-person health." },
];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy text-cream">
        <img src={hero} alt="TFAC community members hiking at sunset" width={1920} height={1200} className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/60 to-navy" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 sm:pt-32 lg:px-10 lg:pb-32 lg:pt-40">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber backdrop-blur">
              <img src={logo.url} alt="" className="h-5 w-5 rounded-full object-cover" width={20} height={20} /> A Canadian non-profit
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
              Travel. Connect.<br />
              <span className="text-sunset">Belong.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/85 sm:text-xl">
              We use travel, cultural exchange, outdoor recreation, and leadership development to build the kind of
              community you'd want to move next door to.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/get-involved" className="inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sunset/30 transition-colors hover:bg-sunset/90">
                Get involved <ArrowRight size={16} />
              </Link>
              <Link to="/events" className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/5 px-6 py-3 text-sm font-semibold text-cream backdrop-blur hover:bg-cream/10">
                See upcoming events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Our mission</p>
            <h2 className="font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl">
              A community where every arrival feels like a homecoming.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-navy/80 lg:col-span-7">
            <p>
              TFAC reduces social isolation, promotes physical and mental well-being, fosters cultural understanding,
              strengthens community connections, and creates pathways to economic opportunity — through travel,
              education, leadership development, skills-building, and community engagement.
            </p>
            <p>
              We serve individuals, families, newcomers, youth, women, seniors, and underserved communities across Canada.
              Every program is designed to be accessible, inclusive, and genuinely fun.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-sunset font-semibold hover:gap-3 transition-all">
              Read our story <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="bg-cream/60">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">What we do</p>
              <h2 className="font-display text-4xl font-semibold text-navy sm:text-5xl">Programs built around belonging.</h2>
            </div>
            <Link to="/programs" className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-sunset">
              All programs <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border/60 bg-background p-6 transition-shadow hover:shadow-lg">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sunset/10 text-sunset">
                  <p.icon size={22} />
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold text-navy">{p.title}</h3>
                <p className="text-navy/70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <Suspense fallback={null}><UpcomingEvents /></Suspense>

      {/* FOUNDER */}
      <section className="bg-navy text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <img src={leadership} alt="Women in leadership workshop" width={1600} height={1200} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber">Founder</p>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">Faith Oloruntoba</h2>
            <p className="mt-2 text-lg text-cream/80">Founder &amp; Executive Director</p>
            <div className="mt-6 space-y-4 text-cream/80">
              <p>
                Faith is a Canadian entrepreneur, community builder, and travel professional. With over a decade in
                communications, UX, business development, and community building, she has helped thousands of people
                travel, lead, and belong.
              </p>
              <p>
                She's also the founder of <span className="text-amber">Ivory Luxe Journeys</span> and <span className="text-amber">Cotriply</span>,
                an AI-powered platform simplifying group travel.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full bg-sunset px-5 py-2.5 text-sm font-semibold text-white hover:bg-sunset/90">
                More about our leadership <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <Suspense fallback={null}><LatestPosts /></Suspense>

      {/* PHOTO STRIP */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">From the community</p>
            <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">See where we've been.</h2>
          </div>
          <a href="https://www.instagram.com/travelfunandactivecommunity/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-navy hover:text-sunset">
            Follow on Instagram →
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[hero, community, travel, leadership].map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-2xl">
              <img src={src} alt="" width={800} height={800} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function UpcomingEvents() {
  const { data } = useSuspenseQuery(eventsQ);
  if (!data.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Coming up</p>
          <h2 className="font-display text-4xl font-semibold text-navy sm:text-5xl">Upcoming events.</h2>
        </div>
        <Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-sunset">
          All events <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.slice(0, 3).map((e) => (
          <Link key={e.id} to="/events/$slug" params={{ slug: e.slug }} className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="aspect-[16/10] overflow-hidden bg-cream">
              <img src={community} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-sunset">
                {new Date(e.starts_at).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-navy group-hover:text-sunset">{e.title}</h3>
              {e.location && <p className="mt-1 text-sm text-navy/60">{e.location}</p>}
              <p className="mt-3 line-clamp-3 text-sm text-navy/70">{e.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function LatestPosts() {
  const { data } = useSuspenseQuery(postsQ);
  if (!data.length) return null;
  return (
    <section className="bg-cream/60">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">From the journal</p>
            <h2 className="font-display text-4xl font-semibold text-navy sm:text-5xl">Latest stories.</h2>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-sunset">
            All posts <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {data.slice(0, 2).map((p) => (
            <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group rounded-2xl border border-border/60 bg-background p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-sunset">
                {p.published_at && new Date(p.published_at).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-navy group-hover:text-sunset">{p.title}</h3>
              <p className="mt-3 text-navy/70">{p.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sunset">Read more <ArrowRight size={16} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
