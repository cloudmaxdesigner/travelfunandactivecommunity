import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getEventBySlug, createRsvp } from "@/lib/site.functions";
import community from "@/assets/community-event.jpg";

const eventQ = (slug: string) =>
  queryOptions({
    queryKey: ["event", slug],
    queryFn: async () => {
      const data = await getEventBySlug({ data: { slug } });
      if (!data) throw notFound();
      return data;
    },
  });

export const Route = createFileRoute("/events/$slug")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(eventQ(params.slug)),
  head: ({ loaderData, params }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — TFAC` : "Event" },
      { name: "description", content: loaderData?.description?.slice(0, 155) ?? "TFAC event" },
      { property: "og:title", content: loaderData?.title ?? "TFAC Event" },
      { property: "og:description", content: loaderData?.description?.slice(0, 200) ?? "" },
      { property: "og:type", content: "event" },
      { property: "og:url", content: `/events/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/events/${params.slug}` }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl font-semibold text-navy">Event not found</h1>
        <p className="mt-4 text-navy/70">This event may have been unpublished or the link is incorrect.</p>
        <Link to="/events" className="mt-8 inline-flex rounded-full bg-sunset px-6 py-3 text-white">See all events</Link>
      </div>
    </SiteLayout>
  ),
  component: EventDetail,
});

function EventDetail() {
  const { slug } = Route.useParams();
  const { data: event } = useSuspenseQuery(eventQ(slug));

  return (
    <SiteLayout>
      <article>
        <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
          <img src={community} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-4xl flex-col justify-end px-6 pb-10 lg:px-10">
            <Link to="/events" className="mb-5 inline-flex w-fit items-center gap-2 text-sm text-cream/80 hover:text-cream">
              <ArrowLeft size={16} /> All events
            </Link>
            <h1 className="font-display text-4xl font-semibold text-cream sm:text-5xl">{event.title}</h1>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-3 lg:px-10">
          <div className="lg:col-span-2">
            <div className="mb-8 flex flex-wrap gap-6 text-navy/80">
              <span className="inline-flex items-center gap-2"><Calendar size={18} className="text-sunset" />
                {new Date(event.starts_at).toLocaleString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
              </span>
              {event.location && <span className="inline-flex items-center gap-2"><MapPin size={18} className="text-sunset" /> {event.location}</span>}
              {event.capacity && <span className="inline-flex items-center gap-2"><Users size={18} className="text-sunset" /> Capacity {event.capacity}</span>}
            </div>
            <div className="prose prose-navy max-w-none whitespace-pre-line text-lg leading-relaxed text-navy/85">
              {event.description}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border/60 bg-cream/40 p-6">
              <h2 className="font-display text-xl font-semibold text-navy">RSVP</h2>
              <p className="mt-1 text-sm text-navy/70">Free to attend. We'll email a confirmation.</p>
              <RsvpForm eventId={event.id} />
            </div>
          </aside>
        </div>
      </article>
    </SiteLayout>
  );
}

function RsvpForm({ eventId }: { eventId: string }) {
  const submit = useServerFn(createRsvp);
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", guests: 1, message: "" });

  if (state === "ok") {
    return (
      <div className="mt-4 rounded-xl bg-sunset/10 p-5 text-navy">
        <p className="font-semibold">You're in! 🎉</p>
        <p className="mt-1 text-sm text-navy/75">We've got your RSVP. Watch your inbox for details.</p>
      </div>
    );
  }

  return (
    <form
      className="mt-4 flex flex-col gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setState("loading");
        setErr(null);
        try {
          await submit({ data: { event_id: eventId, ...form, guests: Number(form.guests) } });
          setState("ok");
        } catch (er) {
          setState("error");
          setErr(er instanceof Error ? er.message : "Something went wrong");
        }
      }}
    >
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-navy">Name</span>
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-navy">Email</span>
        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-navy">Phone (optional)</span>
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-navy">Guests</span>
        <input type="number" min={1} max={20} value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} className="rounded-lg border border-border bg-background px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-navy">Message (optional)</span>
        <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
      </label>
      <button disabled={state === "loading"} className="mt-2 rounded-full bg-sunset px-5 py-2.5 text-sm font-semibold text-white hover:bg-sunset/90 disabled:opacity-60">
        {state === "loading" ? "Sending…" : "Confirm RSVP"}
      </button>
      {err && <p className="text-xs text-destructive">{err}</p>}
    </form>
  );
}
