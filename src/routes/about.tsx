import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import community from "@/assets/community-event.jpg";
import leadership from "@/assets/leadership.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Travel, Fun and Active Community" },
      { name: "description", content: "TFAC is a Canadian non-profit strengthening communities through travel, culture, outdoor recreation, leadership, and skills-building." },
      { property: "og:title", content: "About TFAC" },
      { property: "og:description", content: "Our mission, story, and the community-building work we do across Canada." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const WHAT_WE_DO = [
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
  "Skills development for youth, women, newcomers, and underserved communities",
  "Community-based economic empowerment initiatives",
];

const IMPACT = [
  "Promoting active and healthy lifestyles",
  "Supporting social inclusion and belonging",
  "Encouraging cross-cultural understanding",
  "Creating opportunities for leadership and volunteerism",
  "Connecting newcomers and underserved communities to meaningful experiences and support networks",
];

function About() {
  return (
    <SiteLayout>
      <section className="border-b border-border/60 bg-cream/60">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">About TFAC</p>
          <h1 className="font-display text-5xl font-semibold leading-tight text-navy sm:text-6xl">
            We believe travel, recreation, and cultural exchange are powerful tools for community development.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-navy/75">
            Travel, Fun and Active Community (TFAC) is a Canadian non-profit community development organization that uses
            travel, cultural exchange, outdoor recreation, leadership development, and skills-building to improve social
            inclusion, economic participation, and community well-being.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-12 lg:gap-20 lg:px-10">
        <div className="lg:col-span-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Our mission</p>
          <h2 className="font-display text-4xl font-semibold text-navy">Reduce isolation. Strengthen belonging. Open doors.</h2>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-navy/80 lg:col-span-7">
          <p>
            Our mission is to reduce social isolation, promote physical and mental well-being, foster cultural understanding,
            strengthen community connections, and create pathways to economic opportunity through travel, education,
            leadership development, skills-building, and community engagement.
          </p>
          <p>
            We create opportunities for individuals, families, newcomers, youth, women, seniors, and underserved communities
            to connect, learn, explore, and build meaningful relationships through accessible and inclusive experiences.
          </p>
        </div>
      </section>

      <section className="bg-navy py-24 text-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber">What we do</p>
              <h2 className="font-display text-4xl font-semibold">A wide range of programs — one shared purpose.</h2>
              <p className="mt-6 text-cream/80">
                Combining community engagement with skills development and experiential learning, we help participants
                expand their networks, build confidence, enhance economic participation, and contribute positively to
                their communities.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {WHAT_WE_DO.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl bg-cream/5 p-4 text-cream/90">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sunset" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <img src={community} alt="Community event" width={1600} height={1200} loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Community impact</p>
            <h2 className="font-display text-4xl font-semibold text-navy">Serving diverse communities across Canada.</h2>
            <p className="mt-5 text-navy/75">
              Through our programs and events, we bring together individuals from different backgrounds, cultures, and age
              groups to build relationships, improve well-being, and strengthen community participation.
            </p>
            <ul className="mt-6 space-y-3">
              {IMPACT.map((item) => (
                <li key={item} className="flex items-start gap-3 text-navy/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sunset" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-cream/60 py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Economic &amp; social development</p>
          <h2 className="font-display text-4xl font-semibold text-navy">Strong communities need social connection AND economic opportunity.</h2>
          <p className="mt-6 text-lg leading-relaxed text-navy/80">
            Through our programs, participants develop transferable skills in leadership, project coordination,
            communications, event management, teamwork, digital engagement, and community organizing. These experiences
            help improve employability, build confidence, strengthen entrepreneurial thinking, and create pathways to
            greater economic participation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <img src={leadership} alt="Faith Oloruntoba, Founder" width={1600} height={1200} loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover" />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Leadership</p>
            <h2 className="font-display text-4xl font-semibold text-navy">Faith Oloruntoba</h2>
            <p className="mt-2 text-lg text-navy/70">Founder &amp; Executive Director</p>
            <div className="mt-6 space-y-4 text-navy/80">
              <p>
                Faith is a Canadian entrepreneur, community builder, travel professional, and advocate for inclusive
                economic and community development. With over a decade of experience in communications, user experience
                design, business development, and community building, she has dedicated her career to creating opportunities
                that foster connection, belonging, personal growth, and social impact.
              </p>
              <p>
                She is also the founder of <span className="font-semibold text-sunset">Ivory Luxe Journeys</span>, a travel
                consultancy that has coordinated experiences for thousands of travelers across more than 200 destinations,
                and <span className="font-semibold text-sunset">Cotriply</span>, an AI-powered platform simplifying group
                travel coordination for organizations and communities.
              </p>
              <p>
                Faith holds academic and professional credentials in communications, business leadership, and design, and
                has received recognition for her contributions to entrepreneurship, innovation, and community impact in Canada.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
