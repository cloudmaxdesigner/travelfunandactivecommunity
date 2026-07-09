import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getPostBySlug } from "@/lib/site.functions";

const postQ = (slug: string) =>
  queryOptions({
    queryKey: ["post", slug],
    queryFn: async () => {
      const p = await getPostBySlug({ data: { slug } });
      if (!p) throw notFound();
      return p;
    },
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(postQ(params.slug)),
  head: ({ loaderData, params }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — TFAC Journal` : "Post" },
      { name: "description", content: loaderData?.excerpt ?? "" },
      { property: "og:title", content: loaderData?.title ?? "" },
      { property: "og:description", content: loaderData?.excerpt ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/blog/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl font-semibold text-navy">Post not found</h1>
        <Link to="/blog" className="mt-8 inline-flex rounded-full bg-sunset px-6 py-3 text-white">Back to journal</Link>
      </div>
    </SiteLayout>
  ),
  component: PostDetail,
});

function PostDetail() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQ(slug));
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
        <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-navy/70 hover:text-sunset">
          <ArrowLeft size={16} /> All posts
        </Link>
        <p className="text-xs font-semibold uppercase tracking-wider text-sunset">
          {post.published_at && new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold leading-tight text-navy">{post.title}</h1>
        <p className="mt-5 text-xl text-navy/70">{post.excerpt}</p>
        <div className="prose prose-navy mt-10 max-w-none whitespace-pre-line text-lg leading-relaxed text-navy/85">
          {post.body}
        </div>
      </article>
    </SiteLayout>
  );
}
