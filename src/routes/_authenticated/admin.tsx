import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  adminCheck,
  adminListEvents,
  adminSaveEvent,
  adminDeleteEvent,
  adminListPosts,
  adminSavePost,
  adminDeletePost,
  adminListSubmissions,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — TFAC" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

type Tab = "events" | "posts" | "submissions";

function Admin() {
  const navigate = useNavigate();
  const check = useServerFn(adminCheck);
  const [tab, setTab] = useState<Tab>("events");

  const { data: role, isLoading } = useQuery({
    queryKey: ["admin", "check"],
    queryFn: () => check(),
  });

  if (isLoading) {
    return <SiteLayout><div className="mx-auto max-w-2xl p-20 text-center text-navy/70">Loading…</div></SiteLayout>;
  }
  if (!role?.isAdmin) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h1 className="font-display text-3xl font-semibold text-navy">Not authorized</h1>
          <p className="mt-3 text-navy/70">Your account isn't an admin. Contact Faith to be granted access.</p>
          <button
            className="mt-6 rounded-full bg-navy px-5 py-2 text-sm text-cream"
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}
          >
            Sign out
          </button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sunset">Admin</p>
            <h1 className="mt-1 font-display text-4xl font-semibold text-navy">Dashboard</h1>
          </div>
          <button
            className="rounded-full border border-border bg-background px-4 py-2 text-sm text-navy hover:bg-cream"
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }}
          >
            Sign out
          </button>
        </div>

        <div className="mb-8 flex gap-2 border-b border-border">
          {(["events", "posts", "submissions"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium capitalize transition-colors ${
                tab === t ? "border-sunset text-navy" : "border-transparent text-navy/60 hover:text-navy"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "events" && <EventsPanel />}
        {tab === "posts" && <PostsPanel />}
        {tab === "submissions" && <SubmissionsPanel />}
      </section>
    </SiteLayout>
  );
}

type EventRow = { id: string; title: string; slug: string; description: string; location: string | null; starts_at: string; ends_at: string | null; cover_url: string | null; capacity: number | null; published: boolean };

function EventsPanel() {
  const list = useServerFn(adminListEvents);
  const save = useServerFn(adminSaveEvent);
  const del = useServerFn(adminDeleteEvent);
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({ queryKey: ["admin", "events"], queryFn: () => list() });
  const [editing, setEditing] = useState<EventRow | null>(null);
  const [creating, setCreating] = useState(false);

  const saveMut = useMutation({
    mutationFn: (payload: any) => save({ data: payload }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "events"] }); setEditing(null); setCreating(false); },
  });
  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "events"] }),
  });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button onClick={() => setCreating(true)} className="rounded-full bg-sunset px-4 py-2 text-sm font-semibold text-white">+ New event</button>
      </div>
      {isLoading ? <p className="text-navy/60">Loading…</p> : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-cream/60 text-left"><tr>
              <th className="p-3">Title</th><th className="p-3">Date</th><th className="p-3">Published</th><th className="p-3"></th>
            </tr></thead>
            <tbody>
              {data.map((e: EventRow) => (
                <tr key={e.id} className="border-t border-border">
                  <td className="p-3 font-medium text-navy">{e.title}</td>
                  <td className="p-3 text-navy/70">{new Date(e.starts_at).toLocaleDateString()}</td>
                  <td className="p-3">{e.published ? "✓" : "—"}</td>
                  <td className="p-3 text-right">
                    <button className="mr-3 text-sunset hover:underline" onClick={() => setEditing(e)}>Edit</button>
                    <button className="text-destructive hover:underline" onClick={() => confirm(`Delete "${e.title}"?`) && delMut.mutate(e.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {!data.length && <tr><td colSpan={4} className="p-6 text-center text-navy/60">No events yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
      {(editing || creating) && (
        <EventForm
          initial={editing || undefined}
          onCancel={() => { setEditing(null); setCreating(false); }}
          onSave={(payload) => saveMut.mutate(payload)}
          saving={saveMut.isPending}
        />
      )}
    </div>
  );
}

function EventForm({ initial, onCancel, onSave, saving }: { initial?: EventRow; onCancel: () => void; onSave: (p: any) => void; saving: boolean }) {
  const [form, setForm] = useState({
    id: initial?.id,
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    location: initial?.location ?? "",
    starts_at: initial?.starts_at ? initial.starts_at.slice(0, 16) : "",
    ends_at: initial?.ends_at ? initial.ends_at.slice(0, 16) : "",
    cover_url: initial?.cover_url ?? "",
    capacity: initial?.capacity ?? undefined,
    published: initial?.published ?? false,
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4">
      <form
        className="w-full max-w-2xl rounded-2xl bg-background p-6 shadow-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            ...form,
            starts_at: new Date(form.starts_at).toISOString(),
            ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : "",
            capacity: form.capacity ? Number(form.capacity) : null,
          });
        }}
      >
        <h2 className="font-display text-2xl font-semibold text-navy">{initial ? "Edit event" : "New event"}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">Title
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">Slug (URL)
            <input required pattern="[a-z0-9-]+" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">Location
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">Starts at
            <input required type="datetime-local" value={form.starts_at} onChange={(e) => setForm({ ...form, starts_at: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">Ends at
            <input type="datetime-local" value={form.ends_at} onChange={(e) => setForm({ ...form, ends_at: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">Capacity
            <input type="number" value={form.capacity ?? ""} onChange={(e) => setForm({ ...form, capacity: e.target.value ? Number(e.target.value) : undefined })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">Cover image URL
            <input value={form.cover_url} onChange={(e) => setForm({ ...form, cover_url: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">Description
            <textarea rows={5} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-full border border-border px-4 py-2 text-sm">Cancel</button>
          <button disabled={saving} className="rounded-full bg-sunset px-5 py-2 text-sm font-semibold text-white">{saving ? "Saving…" : "Save"}</button>
        </div>
      </form>
    </div>
  );
}

type PostRow = { id: string; slug: string; title: string; excerpt: string; body: string; cover_url: string | null; published: boolean; published_at: string | null };

function PostsPanel() {
  const list = useServerFn(adminListPosts);
  const save = useServerFn(adminSavePost);
  const del = useServerFn(adminDeletePost);
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({ queryKey: ["admin", "posts"], queryFn: () => list() });
  const [editing, setEditing] = useState<PostRow | null>(null);
  const [creating, setCreating] = useState(false);

  const saveMut = useMutation({
    mutationFn: (payload: any) => save({ data: payload }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "posts"] }); setEditing(null); setCreating(false); },
  });
  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "posts"] }),
  });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button onClick={() => setCreating(true)} className="rounded-full bg-sunset px-4 py-2 text-sm font-semibold text-white">+ New post</button>
      </div>
      {isLoading ? <p className="text-navy/60">Loading…</p> : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-cream/60 text-left"><tr><th className="p-3">Title</th><th className="p-3">Published</th><th className="p-3"></th></tr></thead>
            <tbody>
              {data.map((p: PostRow) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-3 font-medium text-navy">{p.title}</td>
                  <td className="p-3">{p.published ? "✓" : "—"}</td>
                  <td className="p-3 text-right">
                    <button className="mr-3 text-sunset hover:underline" onClick={() => setEditing(p)}>Edit</button>
                    <button className="text-destructive hover:underline" onClick={() => confirm(`Delete "${p.title}"?`) && delMut.mutate(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {!data.length && <tr><td colSpan={3} className="p-6 text-center text-navy/60">No posts yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
      {(editing || creating) && (
        <PostForm
          initial={editing || undefined}
          onCancel={() => { setEditing(null); setCreating(false); }}
          onSave={(p) => saveMut.mutate(p)}
          saving={saveMut.isPending}
        />
      )}
    </div>
  );
}

function PostForm({ initial, onCancel, onSave, saving }: { initial?: PostRow; onCancel: () => void; onSave: (p: any) => void; saving: boolean }) {
  const [form, setForm] = useState({
    id: initial?.id,
    slug: initial?.slug ?? "",
    title: initial?.title ?? "",
    excerpt: initial?.excerpt ?? "",
    body: initial?.body ?? "",
    cover_url: initial?.cover_url ?? "",
    published: initial?.published ?? false,
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4">
      <form className="w-full max-w-3xl rounded-2xl bg-background p-6 shadow-2xl" onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
        <h2 className="font-display text-2xl font-semibold text-navy">{initial ? "Edit post" : "New post"}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">Slug
            <input required pattern="[a-z0-9-]+" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">Cover image URL
            <input value={form.cover_url} onChange={(e) => setForm({ ...form, cover_url: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">Title
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">Excerpt
            <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">Body (Markdown / plain)
            <textarea rows={12} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs" />
          </label>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-full border border-border px-4 py-2 text-sm">Cancel</button>
          <button disabled={saving} className="rounded-full bg-sunset px-5 py-2 text-sm font-semibold text-white">{saving ? "Saving…" : "Save"}</button>
        </div>
      </form>
    </div>
  );
}

function SubmissionsPanel() {
  const list = useServerFn(adminListSubmissions);
  const { data, isLoading } = useQuery({ queryKey: ["admin", "submissions"], queryFn: () => list() });
  if (isLoading) return <p className="text-navy/60">Loading…</p>;
  if (!data) return null;
  return (
    <div className="grid gap-8">
      <SubTable title={`RSVPs (${data.rsvps.length})`} rows={data.rsvps} columns={["created_at", "name", "email", "guests", "events.title"]} />
      <SubTable title={`Volunteers (${data.volunteers.length})`} rows={data.volunteers} columns={["created_at", "name", "email", "phone", "interests"]} />
      <SubTable title={`Contact messages (${data.contacts.length})`} rows={data.contacts} columns={["created_at", "name", "email", "subject", "message"]} />
      <SubTable title={`Newsletter (${data.subscribers.length})`} rows={data.subscribers} columns={["created_at", "email"]} />
    </div>
  );
}

function SubTable({ title, rows, columns }: { title: string; rows: any[]; columns: string[] }) {
  const val = (row: any, key: string): string => {
    const parts = key.split(".");
    let v: any = row;
    for (const p of parts) v = v?.[p];
    if (Array.isArray(v)) return v.join(", ");
    if (key === "created_at" && v) return new Date(v).toLocaleString();
    return v ?? "";
  };
  return (
    <div>
      <h3 className="mb-3 font-display text-lg font-semibold text-navy">{title}</h3>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-cream/60 text-left"><tr>{columns.map((c) => <th key={c} className="p-3 capitalize">{c.replace(".", " ").replace("_", " ")}</th>)}</tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border align-top">
                {columns.map((c) => <td key={c} className="p-3 text-navy/80">{val(r, c)}</td>)}
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={columns.length} className="p-6 text-center text-navy/60">None yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
