import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Backpack, Briefcase, Compass, GraduationCap, HeartHandshake, Leaf, Mountain, Sparkles, Users } from "lucide-react";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Travel, Fun and Active Community" },
      { name: "description", content: "Explore TFAC's programs: outdoor recreation, cultural exchange, group travel, leadership, workforce readiness, and community-building." },
      { property: "og:title", content: "TFAC Programs" },
      { property: "og:description", content: "Outdoor recreation, cultural exchange, group travel, leadership, and workforce programs." },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: Programs,
});

const PROGRAMS = [
  { icon: Mountain, title: "Community Hikes & Outdoor Recreation", body: "Regular hikes and outdoor activities that promote active living and let members meet outside a screen. Pace set by the group; all fitness levels welcome." },
  { icon: Compass, title: "Group Travel & Experiential Learning", body: "Curated group trips built for connection, culture, and confidence — with logistics handled so you can focus on the experience." },
  { icon: Users, title: "Cultural Exchange & Education", body: "Cross-cultural nights, storytelling, and educational experiences that celebrate the diversity of our community." },
  { icon: Sparkles, title: "Wellness & Healthy Living", body: "Wellness initiatives that support mental and physical health while reducing social isolation." },
  { icon: HeartHandshake, title: "Newcomer & Youth Integration", body: "Programs designed to help newcomers and youth find community, mentorship, and belonging in their new home." },
  { icon: GraduationCap, title: "Leadership & Professional Development", body: "Workshops in leadership, communications, project coordination, and public speaking." },
  { icon: Briefcase, title: "Workforce Readiness & Employability", body: "Skills programs that build the confidence and toolkit needed to enter or advance in the Canadian workforce." },
  { icon: Backpack, title: "Entrepreneurship & Small Business", body: "Exposure and mentorship for early-stage founders — especially women, youth, and newcomers." },
  { icon: Leaf, title: "Community-Based Economic Empowerment", body: "Initiatives that connect community members to opportunity, income, and long-term participation in the economy." },
];

const SKILLS = [
  "Event planning and coordination",
  "Community engagement",
  "Marketing and communications",
  "Social media management",
  "Volunteer coordination",
  "Partnership development",
  "Customer service",
  "Program administration",
  "Fundraising and outreach",
];

function Programs() {
  return (
    <SiteLayout>
      <section className="border-b border-border/60 bg-cream/60">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Programs</p>
          <h1 className="font-display text-5xl font-semibold leading-tight text-navy sm:text-6xl">
            Nine ways to plug in.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy/75">
            Our programs blend community engagement, experiential learning, and real skills. Show up as a participant,
            a volunteer, or a leader — every entry point is a good one.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p) => (
            <article key={p.title} className="group flex flex-col rounded-2xl border border-border/60 bg-background p-7 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sunset/10 text-sunset">
                <p.icon size={24} />
              </div>
              <h2 className="font-display text-xl font-semibold text-navy">{p.title}</h2>
              <p className="mt-3 text-navy/70">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy py-24 text-cream">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber">Learning &amp; volunteering</p>
            <h2 className="font-display text-4xl font-semibold">Show up. Build skills. Grow your résumé.</h2>
            <p className="mt-6 text-cream/80">
              Participants and volunteers gain practical experience they can point to on a résumé, in an interview, or when
              starting their own venture.
            </p>
            <Link to="/get-involved" className="mt-8 inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-white hover:bg-sunset/90">
              Volunteer with us →
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {SKILLS.map((s) => (
              <li key={s} className="rounded-xl bg-cream/5 p-4 text-sm text-cream/90">{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Partnership interest</p>
        <h2 className="font-display text-4xl font-semibold text-navy">Building bridges — including with Jamaica.</h2>
        <p className="mt-6 text-lg leading-relaxed text-navy/80">
          TFAC is interested in building partnerships with organizations in Jamaica to develop initiatives that promote
          youth leadership, women's empowerment, entrepreneurship, workforce development, community-based tourism,
          cultural exchange, environmental stewardship, and economic inclusion. We believe international collaboration
          creates opportunities for shared learning, stronger communities, and sustainable social impact.
        </p>
        <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream hover:bg-navy/90">
          Reach out to partner →
        </Link>
      </section>
    </SiteLayout>
  );
}
