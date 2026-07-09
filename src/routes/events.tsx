import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { listPublishedEvents } from "@/lib/site.functions";
import community from "@/assets/community-event.jpg";
import { Calendar, MapPin } from "lucide-react";

const q = queryOptions({ queryKey: ["events", "upcoming"], queryFn: () => listPublishedEvents() });

export const Route = createFileRoute("/events")({
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  head: () => ({
    meta: [
      { title: "Upcoming Events — TFAC" },
      { name: "description", content: "Community hikes, cultural nights, group trips, and leadership workshops. RSVP for an upcoming TFAC event." },
      { property: "og:title", content: "Upcoming TFAC events" },
      { property: "og:description", content: "Community hikes, cultural nights, group trips, and leadership workshops." },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { data } = useSuspenseQuery(q);
  return (
    <SiteLayout>
      <section className="border-b border-border/60 bg-cream/60">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Events</p>
          <h1 className="font-display text-5xl font-semibold leading-tight text-navy sm:text-6xl">
            Come find your people.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-navy/75">
            RSVP to an event below. You'll get a confirmation from us and a friendly reminder as the date approaches.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        {data.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/70 p-12 text-center">
            <p className="text-lg text-navy/70">No upcoming events yet. Check back soon — or subscribe to our newsletter for updates.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.map((e) => (
              <Link key={e.id} to="/events/$slug" params={{ slug: e.slug }} className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-[16/10] overflow-hidden bg-cream">
                  <img src={community} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sunset">
                    <Calendar size={14} /> {new Date(e.starts_at).toLocaleDateString(undefined, { weekday: "short", month: "long", day: "numeric", year: "numeric" })}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-navy group-hover:text-sunset">{e.title}</h2>
                  {e.location && (
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-navy/60"><MapPin size={14} /> {e.location}</p>
                  )}
                  <p className="mt-4 line-clamp-3 text-sm text-navy/70">{e.description}</p>
                  <span className="mt-6 inline-block rounded-full bg-navy px-4 py-2 text-center text-sm font-semibold text-cream group-hover:bg-sunset">RSVP →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
