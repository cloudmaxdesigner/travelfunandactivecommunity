import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { listPublishedPosts } from "@/lib/site.functions";

const q = queryOptions({ queryKey: ["posts", "list"], queryFn: () => listPublishedPosts() });

export const Route = createFileRoute("/blog")({
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  head: () => ({
    meta: [
      { title: "Journal — TFAC" },
      { name: "description", content: "Stories from the Travel, Fun and Active Community — travel, culture, leadership, and belonging." },
      { property: "og:title", content: "TFAC Journal" },
      { property: "og:description", content: "Stories from the TFAC community." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

function Blog() {
  const { data } = useSuspenseQuery(q);
  return (
    <SiteLayout>
      <section className="border-b border-border/60 bg-cream/60">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Journal</p>
          <h1 className="font-display text-5xl font-semibold leading-tight text-navy sm:text-6xl">Stories, lessons, and dispatches.</h1>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
        {data.length === 0 ? (
          <p className="text-navy/70">No posts yet.</p>
        ) : (
          <div className="divide-y divide-border">
            {data.map((p) => (
              <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group block py-8 first:pt-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-sunset">
                  {p.published_at && new Date(p.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-navy group-hover:text-sunset">{p.title}</h2>
                <p className="mt-3 text-lg text-navy/70">{p.excerpt}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-sunset">Read more →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
