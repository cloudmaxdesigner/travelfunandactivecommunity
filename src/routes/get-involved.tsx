import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { createVolunteer } from "@/lib/site.functions";
import travel from "@/assets/group-travel.jpg";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved — TFAC" },
      { name: "description", content: "Volunteer with TFAC. Gain skills, meet people, and help build a more inclusive community." },
      { property: "og:title", content: "Volunteer with TFAC" },
      { property: "og:description", content: "Sign up to volunteer or join TFAC's community." },
      { property: "og:url", content: "/get-involved" },
    ],
    links: [{ rel: "canonical", href: "/get-involved" }],
  }),
  component: GetInvolved,
});

const INTERESTS = ["Event planning", "Community engagement", "Marketing & comms", "Social media", "Volunteer coordination", "Partnerships", "Customer service", "Program admin", "Fundraising"];

function GetInvolved() {
  const submit = useServerFn(createVolunteer);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [interests, setInterests] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  const toggle = (v: string) => setInterests((cur) => (cur.includes(v) ? cur.filter((c) => c !== v) : [...cur, v]));

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden bg-navy text-cream">
        <img src={travel} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 to-navy" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber">Get Involved</p>
          <h1 className="font-display text-5xl font-semibold leading-tight sm:text-6xl">Volunteer with TFAC.</h1>
          <p className="mt-6 max-w-2xl text-lg text-cream/85">
            Bring your skills, learn new ones, and help build a community that shows up for its people. Whether you have
            two hours a month or want to lead a program, there's a way in.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-5 lg:gap-16 lg:px-10">
        <div className="lg:col-span-2">
          <h2 className="font-display text-3xl font-semibold text-navy">What you'll gain.</h2>
          <ul className="mt-6 space-y-3 text-navy/80">
            {["Practical, résumé-ready experience", "A network of driven, kind humans", "Mentorship from Faith and the leadership team", "First look at upcoming events and trips", "The joy of contributing to something bigger than a job title"].map((b) => (
              <li key={b} className="flex items-start gap-3"><CheckCircle2 className="mt-1 shrink-0 text-sunset" size={18} /> <span>{b}</span></li>
            ))}
          </ul>
        </div>

        <form
          className="rounded-3xl border border-border/60 bg-cream/40 p-8 lg:col-span-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setState("loading");
            setErr(null);
            try {
              await submit({ data: { ...form, interests } });
              setState("ok");
              setForm({ name: "", email: "", phone: "", message: "" });
              setInterests([]);
            } catch (er) {
              setState("error");
              setErr(er instanceof Error ? er.message : "Something went wrong");
            }
          }}
        >
          {state === "ok" && (
            <div className="mb-5 rounded-xl bg-sunset/10 p-5 text-navy">
              <p className="font-semibold">Thank you!</p>
              <p className="mt-1 text-sm text-navy/75">We'll be in touch within a few days.</p>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-navy">Name</span>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-navy">Email</span>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
            </label>
          </div>
          <label className="mt-4 flex flex-col gap-1 text-sm">
            <span className="font-medium text-navy">Phone (optional)</span>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <div className="mt-4">
            <span className="text-sm font-medium text-navy">I'm interested in…</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {INTERESTS.map((i) => {
                const on = interests.includes(i);
                return (
                  <button key={i} type="button" onClick={() => toggle(i)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${on ? "bg-sunset text-white" : "bg-background text-navy/80 border border-border"}`}>
                    {i}
                  </button>
                );
              })}
            </div>
          </div>
          <label className="mt-4 flex flex-col gap-1 text-sm">
            <span className="font-medium text-navy">Tell us more (optional)</span>
            <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <button disabled={state === "loading"} className="mt-6 w-full rounded-full bg-navy px-5 py-3 text-sm font-semibold text-cream hover:bg-navy/90 disabled:opacity-60">
            {state === "loading" ? "Sending…" : "Submit application"}
          </button>
          {err && <p className="mt-3 text-xs text-destructive">{err}</p>}
        </form>
      </section>
    </SiteLayout>
  );
}
