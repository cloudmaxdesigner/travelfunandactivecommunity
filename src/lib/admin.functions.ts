import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

export const adminListEvents = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase.from("events").select("*").order("starts_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

const eventUpsert = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers and hyphens only"),
  description: z.string().max(10000).default(""),
  location: z.string().max(200).optional().or(z.literal("")),
  starts_at: z.string().min(1),
  ends_at: z.string().optional().or(z.literal("")),
  cover_url: z.string().max(500).optional().or(z.literal("")),
  capacity: z.number().int().positive().nullable().optional(),
  published: z.boolean().default(false),
});

export const adminSaveEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => eventUpsert.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const row = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      location: data.location || null,
      starts_at: data.starts_at,
      ends_at: data.ends_at || null,
      cover_url: data.cover_url || null,
      capacity: data.capacity ?? null,
      published: data.published,
    };
    if (data.id) {
      const { error } = await context.supabase.from("events").update(row).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }
    const { data: inserted, error } = await context.supabase.from("events").insert(row).select("id").single();
    if (error) throw new Error(error.message);
    return { ok: true, id: inserted.id };
  });

export const adminDeleteEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("events").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminListPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

const postUpsert = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).default(""),
  body: z.string().max(50000).default(""),
  cover_url: z.string().max(500).optional().or(z.literal("")),
  published: z.boolean().default(false),
});

export const adminSavePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => postUpsert.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const row = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      body: data.body,
      cover_url: data.cover_url || null,
      published: data.published,
      published_at: data.published ? new Date().toISOString() : null,
      author_id: context.userId,
    };
    if (data.id) {
      const { error } = await context.supabase.from("blog_posts").update(row).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }
    const { data: inserted, error } = await context.supabase.from("blog_posts").insert(row).select("id").single();
    if (error) throw new Error(error.message);
    return { ok: true, id: inserted.id };
  });

export const adminDeletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("blog_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminListSubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const [rsvps, volunteers, contacts, subscribers] = await Promise.all([
      context.supabase.from("event_rsvps").select("*, events(title,slug)").order("created_at", { ascending: false }).limit(200),
      context.supabase.from("volunteers").select("*").order("created_at", { ascending: false }).limit(200),
      context.supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(200),
      context.supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }).limit(500),
    ]);
    return {
      rsvps: rsvps.data ?? [],
      volunteers: volunteers.data ?? [],
      contacts: contacts.data ?? [],
      subscribers: subscribers.data ?? [],
    };
  });

export const adminCheck = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    return { isAdmin: !!data, userId: context.userId };
  });
