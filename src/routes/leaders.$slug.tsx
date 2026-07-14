import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getLeader, LEADERS } from "@/data/leaders";

export const Route = createFileRoute("/leaders/$slug")({
  loader: ({ params }) => {
    const leader = getLeader(params.slug);
    if (!leader) throw notFound();
    return { leader };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Leader not found — TFAC" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { leader } = loaderData;
    const name = `${leader.firstName} ${leader.lastName}`;
    const title = `${name}, ${leader.role} — TFAC`;
    const description = leader.fullBio[0];
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { property: "og:image", content: leader.imageUrl },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: LeaderNotFound,
  errorComponent: ({ reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-semibold text-navy">
          Something went wrong loading this profile.
        </h1>
        <button
          onClick={reset}
          className="mt-6 rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </SiteLayout>
  ),
  component: LeaderDetail,
});

function LeaderNotFound() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sunset">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-navy">
          Leader not found
        </h1>
        <p className="mt-4 text-navy/70">
          We couldn't find the person you're looking for.
        </p>
        <Link
          to="/"
          hash="leadership"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream hover:bg-sunset"
        >
          <ArrowLeft size={16} /> Back to leadership
        </Link>
      </div>
    </SiteLayout>
  );
}

function LeaderDetail() {
  const { leader } = Route.useLoaderData();
  const others = LEADERS.filter((l) => l.slug !== leader.slug);

  return (
    <SiteLayout>
      <article className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
        <Link
          to="/"
          hash="leadership"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy/70 hover:text-sunset"
        >
          <ArrowLeft size={16} /> Back to leadership
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-cream shadow-xl shadow-navy/10">
              <img
                src={leader.imageUrl}
                alt={`${leader.firstName} ${leader.lastName}`}
                width={1200}
                height={1500}
                className={`h-full w-full object-cover ${leader.imageClassName ?? ""}`}
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sunset">
              {leader.role}
            </p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] text-navy sm:text-6xl">
              <span className="block">{leader.firstName}</span>
              <span className="block text-sunset">{leader.lastName}</span>
            </h1>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-navy/80">
              {leader.fullBio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        {others.length > 0 && (
          <section className="mt-24 border-t border-border/60 pt-12">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">
              Meet the rest of the team
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to="/leaders/$slug"
                  params={{ slug: o.slug }}
                  className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-background p-4 transition-colors hover:border-sunset/40 hover:bg-cream/40"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-cream">
                    <img
                      src={o.imageUrl}
                      alt=""
                      className={`h-full w-full object-cover ${o.imageClassName ?? ""}`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-semibold text-navy group-hover:text-sunset">
                      {o.firstName} {o.lastName}
                    </p>
                    <p className="truncate text-sm text-navy/60">{o.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </SiteLayout>
  );
}
