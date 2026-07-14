import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { InstagramSection } from "@/components/site/InstagramSection";
import { LeaderCard } from "@/components/site/LeaderCard";
import { LEADERS } from "@/data/leaders";
import hero from "@/assets/hero-hike.jpg";
import community from "@/assets/community-event.jpg";
import logo from "@/assets/tfac-logo.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Travel, Fun and Active Community (TFAC) — Canadian non-profit" },
      {
        name: "description",
        content:
          "TFAC is a Canadian non-profit using travel, cultural exchange, outdoor recreation, leadership development, and skills-building to strengthen communities.",
      },
      { property: "og:title", content: "Travel, Fun and Active Community (TFAC) — Canadian non-profit" },
      {
        property: "og:description",
        content:
          "TFAC is a Canadian non-profit using travel, cultural exchange, outdoor recreation, leadership development, and skills-building to strengthen communities.",
      },
    ],
  }),
  component: Home,
});

const ACTIVITIES = [
  "Community hikes and outdoor recreation programs",
  "Cultural exchange and educational experiences",
  "Wellness and healthy living initiatives",
  "Community events and networking opportunities",
  "Volunteer engagement and leadership development",
  "Youth and newcomer integration programs",
  "Group travel and experiential learning activities",
  "Community outreach and social inclusion initiatives",
  "Workforce readiness and employability programs",
  "Entrepreneurship and small business exposure initiatives",
  "Leadership and professional development opportunities",
  "Skills development programs for youth, women, newcomers, and underserved communities",
  "Community-based economic empowerment initiatives",
];

const IMPACT = [
  "Promoting active and healthy lifestyles",
  "Supporting social inclusion and belonging",
  "Encouraging cross-cultural understanding",
  "Creating opportunities for leadership and volunteerism",
  "Connecting newcomers and underserved communities to meaningful experiences and support networks",
];

const LEARNING = [
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

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section id="top" className="relative isolate overflow-hidden bg-navy text-cream">
        <img src={hero} alt="TFAC community" width={1920} height={1200} className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/60 to-navy" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 sm:pt-32 lg:px-10 lg:pb-32 lg:pt-40">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber backdrop-blur">
              <img src={logo.url} alt="" className="h-5 w-5 rounded-full object-cover" width={20} height={20} /> A Canadian non-profit
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
              Travel Fun and Active Community <span className="text-sunset">(TFAC)</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-cream/85 sm:text-xl">
              A Canadian non-profit community development organization that uses travel, cultural exchange, outdoor
              recreation, leadership development, and skills-building to improve social inclusion, economic
              participation, and community well-being.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#about" className="inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sunset/30 transition-colors hover:bg-sunset/90">
                Learn more <ArrowRight size={16} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/5 px-6 py-3 text-sm font-semibold text-cream backdrop-blur hover:bg-cream/10">
                Connect with us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">About Us</p>
            <h2 className="font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl">
              A Canadian non-profit community development organization.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-navy/80 lg:col-span-7">
            <p>
              We are dedicated to strengthening communities through travel, outdoor recreation, cultural exchange,
              wellness initiatives, leadership development, and economic empowerment programs.
            </p>
            <p>
              We create opportunities for individuals, families, newcomers, youth, women, seniors, and underserved
              communities to connect, learn, explore, and build meaningful relationships through accessible and
              inclusive experiences. Our programs are designed to promote social inclusion, cultural understanding,
              personal growth, and active living while equipping participants with valuable leadership, employability,
              entrepreneurial, and life skills.
            </p>
            <p>
              By combining community engagement with skills development and experiential learning, TFAC helps
              participants expand their networks, build confidence, enhance economic participation, and contribute
              positively to their communities. We believe that travel, recreation, education, and cultural exchange can
              serve as powerful tools for community development, sustainable livelihoods, and long-term social and
              economic impact.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10 lg:py-28">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber">Our Mission</p>
          <p className="font-display text-3xl font-semibold leading-snug sm:text-4xl">
            Our mission is to reduce social isolation, promote physical and mental well-being, foster cultural
            understanding, strengthen community connections, and create pathways to economic opportunity through
            travel, education, leadership development, skills-building, and community engagement.
          </p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="what-we-do" className="bg-cream/60">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">What We Do</p>
            <h2 className="font-display text-4xl font-semibold text-navy sm:text-5xl">Our activities include:</h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVITIES.map((a) => (
              <li key={a} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background p-5">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sunset/10 text-sunset">
                  <Check size={14} />
                </span>
                <span className="text-navy/85">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COMMUNITY IMPACT */}
      <section id="impact" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <img src={community} alt="" width={1600} height={2000} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Community Impact</p>
            <h2 className="font-display text-4xl font-semibold text-navy sm:text-5xl">TFAC serves a growing and diverse community across Canada.</h2>
            <p className="mt-6 text-lg leading-relaxed text-navy/80">
              TFAC serves a growing and diverse community across Canada. Through our programs and events, we bring
              together individuals from different backgrounds, cultures, and age groups to build relationships, improve
              well-being, and strengthen community participation.
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-sunset">Our work focuses on:</p>
            <ul className="mt-4 space-y-3">
              {IMPACT.map((i) => (
                <li key={i} className="flex items-start gap-3 text-navy/85">
                  <Check size={18} className="mt-1 shrink-0 text-sunset" /> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ECONOMIC & SOCIAL DEV */}
      <section className="bg-cream/60">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10 lg:py-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Economic and Social Development</p>
          <p className="text-lg leading-relaxed text-navy/85">
            TFAC recognizes that strong communities are built through both social connection and economic opportunity.
            Through our programs, participants develop transferable skills in leadership, project coordination,
            communications, event management, teamwork, digital engagement, and community organizing. These experiences
            help improve employability, build confidence, strengthen entrepreneurial thinking, and create pathways to
            greater economic participation.
          </p>
        </div>
      </section>

      {/* LEARNING & VOLUNTEER */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Learning and Volunteer Opportunities</p>
        <h2 className="font-display text-4xl font-semibold text-navy sm:text-5xl">
          Participants and volunteers gain practical experience in:
        </h2>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LEARNING.map((l) => (
            <li key={l} className="rounded-2xl border border-border/60 bg-background p-5 text-navy/85">
              {l}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-lg text-navy/75">
          These opportunities help participants develop valuable personal and professional skills while contributing to
          positive community outcomes.
        </p>
      </section>

      {/* PARTNERSHIP */}
      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10 lg:py-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber">Partnership Interest</p>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Collaboration for shared learning and stronger communities.</h2>
          <div className="mt-6 space-y-5 text-lg text-cream/85">
            <p>
              Travel Fun and Active Community is interested in building partnerships with organizations to
              develop initiatives that promote youth leadership, women's empowerment, entrepreneurship, workforce
              development, community-based tourism, cultural exchange, environmental stewardship, and economic
              inclusion.
            </p>
            <p>
              We believe that collaboration creates opportunities for shared learning, stronger
              communities, and sustainable social impact.
            </p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Leadership</p>
          <h2 className="font-display text-4xl font-semibold text-navy sm:text-5xl">
            The team behind TFAC.
          </h2>
          <p className="mt-4 text-lg text-navy/70">
            A collective of leaders bringing travel, wellness, technology, and community-building expertise to
            everything we do.
          </p>
        </div>

        <div className="grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-20 lg:gap-x-14">
          {LEADERS.map((leader, i) => (
            <LeaderCard key={leader.slug} leader={leader} position={i % 2 === 0 ? "left" : "right"} />
          ))}
        </div>
      </section>


      <InstagramSection />
    </SiteLayout>
  );
}
