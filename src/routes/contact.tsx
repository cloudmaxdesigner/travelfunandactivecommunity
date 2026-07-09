import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { createContactMessage } from "@/lib/site.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TFAC" },
      { name: "description", content: "Get in touch with Travel, Fun and Active Community. Toronto, Canada." },
      { property: "og:title", content: "Contact TFAC" },
      { property: "og:description", content: "Reach out about programs, partnerships, media, or volunteering." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const submit = useServerFn(createContactMessage);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);
  return (
    <SiteLayout>
      <section className="border-b border-border/60 bg-cream/60">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-sunset">Contact</p>
          <h1 className="font-display text-5xl font-semibold leading-tight text-navy sm:text-6xl">Let's talk.</h1>
          <p className="mt-6 max-w-2xl text-lg text-navy/75">Programs, partnerships, media — send us a note.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-5 lg:gap-20 lg:px-10">
        <div className="space-y-5 lg:col-span-2">
          <div className="flex items-start gap-3"><MapPin className="mt-1 shrink-0 text-sunset" size={20} /><div><p className="font-semibold text-navy">Location</p><p className="text-navy/70">Toronto, Canada</p></div></div>
          <div className="flex items-start gap-3"><Mail className="mt-1 shrink-0 text-sunset" size={20} /><div><p className="font-semibold text-navy">Email</p><a href="mailto:travelfunandactivecommunity@gmail.com" className="text-navy/70 hover:text-sunset break-all">travelfunandactivecommunity@gmail.com</a></div></div>
          <div className="flex items-start gap-3"><Phone className="mt-1 shrink-0 text-sunset" size={20} /><div><p className="font-semibold text-navy">Phone</p><a href="tel:+14168392209" className="text-navy/70 hover:text-sunset">+1 (416) 839-2209</a></div></div>
          <div className="flex items-start gap-3"><Instagram className="mt-1 shrink-0 text-sunset" size={20} /><div><p className="font-semibold text-navy">Instagram</p><a href="https://www.instagram.com/travelfunandactivecommunity/" target="_blank" rel="noopener noreferrer" className="text-navy/70 hover:text-sunset">@travelfunandactivecommunity</a></div></div>
        </div>

        <form
          className="rounded-3xl border border-border/60 bg-cream/40 p-8 lg:col-span-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setState("loading");
            setErr(null);
            try {
              await submit({ data: form });
              setState("ok");
              setForm({ name: "", email: "", subject: "", message: "" });
            } catch (er) {
              setState("error");
              setErr(er instanceof Error ? er.message : "Something went wrong");
            }
          }}
        >
          {state === "ok" && <div className="mb-5 rounded-xl bg-sunset/10 p-5 text-navy"><p className="font-semibold">Message sent!</p><p className="mt-1 text-sm text-navy/75">We'll get back to you soon.</p></div>}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm"><span className="font-medium text-navy">Name</span>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1 text-sm"><span className="font-medium text-navy">Email</span>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
            </label>
          </div>
          <label className="mt-4 flex flex-col gap-1 text-sm"><span className="font-medium text-navy">Subject</span>
            <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <label className="mt-4 flex flex-col gap-1 text-sm"><span className="font-medium text-navy">Message</span>
            <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <button disabled={state === "loading"} className="mt-6 w-full rounded-full bg-navy px-5 py-3 text-sm font-semibold text-cream hover:bg-navy/90 disabled:opacity-60">
            {state === "loading" ? "Sending…" : "Send message"}
          </button>
          {err && <p className="mt-3 text-xs text-destructive">{err}</p>}
        </form>
      </section>
    </SiteLayout>
  );
}
