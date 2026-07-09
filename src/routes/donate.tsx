import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Mail, Phone, HandCoins } from "lucide-react";
import hero from "@/assets/hero-hike.jpg";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — TFAC" },
      { name: "description", content: "Support Travel, Fun and Active Community. Your donation funds hikes, cultural programs, leadership workshops, and newcomer support." },
      { property: "og:title", content: "Donate to TFAC" },
      { property: "og:description", content: "Support community-building work across Canada." },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: Donate,
});

function Donate() {
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden bg-navy text-cream">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 to-navy" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber"><HandCoins size={14} /> Support TFAC</p>
          <h1 className="font-display text-5xl font-semibold leading-tight sm:text-6xl">Fund the next hike, workshop, and welcome dinner.</h1>
          <p className="mt-6 max-w-2xl text-lg text-cream/85">
            Every dollar goes directly into programs — transit for a newcomer to reach a hike, refreshments at a cultural
            night, a facilitator for a leadership workshop.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
        <div className="rounded-3xl border border-border/60 bg-cream/40 p-8 lg:p-12">
          <h2 className="font-display text-3xl font-semibold text-navy">How to give</h2>
          <p className="mt-4 text-navy/80">
            We're setting up online donations shortly. In the meantime, please reach out directly and we'll walk you
            through options that work best for you (e-transfer, cheque, or a scheduled monthly contribution).
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="mailto:travelfunandactivecommunity@gmail.com?subject=Donation%20inquiry" className="inline-flex items-center justify-center gap-2 rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-white hover:bg-sunset/90">
              <Mail size={16} /> Email us to donate
            </a>
            <a href="tel:+14168392209" className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 bg-background px-6 py-3 text-sm font-semibold text-navy hover:bg-cream">
              <Phone size={16} /> +1 (416) 839-2209
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { amount: "$25", body: "Covers transit for a newcomer to attend a community hike." },
            { amount: "$100", body: "Sponsors refreshments and materials for a cultural exchange evening." },
            { amount: "$500", body: "Underwrites a full leadership workshop with facilitators." },
          ].map((c) => (
            <div key={c.amount} className="rounded-2xl border border-border/60 bg-background p-6">
              <p className="font-display text-3xl font-semibold text-sunset">{c.amount}</p>
              <p className="mt-2 text-navy/75">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
