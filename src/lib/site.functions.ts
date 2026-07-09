import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function serverClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export const listPublishedEvents = createServerFn({ method: "GET" }).handler(async () => {
  const sb = serverClient();
  const { data, error } = await sb
    .from("events")
    .select("id,title,slug,description,location,starts_at,ends_at,cover_url,capacity")
    .eq("published", true)
    .gte("starts_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .order("starts_at", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getEventBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const sb = serverClient();
    const { data: row, error } = await sb
      .from("events")
      .select("id,title,slug,description,location,starts_at,ends_at,cover_url,capacity")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const sb = serverClient();
  const { data, error } = await sb
    .from("blog_posts")
    .select("id,slug,title,excerpt,cover_url,published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const sb = serverClient();
    const { data: row, error } = await sb
      .from("blog_posts")
      .select("id,slug,title,excerpt,body,cover_url,published_at")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

const rsvpSchema = z.object({
  event_id: z.string().uuid(),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  guests: z.number().int().min(1).max(20).default(1),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const createRsvp = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => rsvpSchema.parse(d))
  .handler(async ({ data }) => {
    const sb = serverClient();
    const { error } = await sb.from("event_rsvps").insert({
      event_id: data.event_id,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      guests: data.guests,
      message: data.message || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const volunteerSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  interests: z.array(z.string().max(60)).max(20).default([]),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const createVolunteer = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => volunteerSchema.parse(d))
  .handler(async ({ data }) => {
    const sb = serverClient();
    const { error } = await sb.from("volunteers").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      interests: data.interests,
      message: data.message || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
});

export const createContactMessage = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    const sb = serverClient();
    const { error } = await sb.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      subject: data.subject || null,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const subscribeSchema = z.object({ email: z.string().trim().email().max(200) });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => subscribeSchema.parse(d))
  .handler(async ({ data }) => {
    const sb = serverClient();
    const { error } = await sb.from("newsletter_subscribers").insert({ email: data.email });
    if (error && !error.message.toLowerCase().includes("duplicate")) throw new Error(error.message);
    return { ok: true };
  });
