
-- Tighten public insert policies with basic validation
DROP POLICY "Anyone can RSVP" ON public.event_rsvps;
CREATE POLICY "Anyone can RSVP" ON public.event_rsvps FOR INSERT
  WITH CHECK (char_length(name) BETWEEN 1 AND 120 AND char_length(email) BETWEEN 3 AND 200 AND guests BETWEEN 1 AND 20);

DROP POLICY "Anyone can volunteer" ON public.volunteers;
CREATE POLICY "Anyone can volunteer" ON public.volunteers FOR INSERT
  WITH CHECK (char_length(name) BETWEEN 1 AND 120 AND char_length(email) BETWEEN 3 AND 200);

DROP POLICY "Anyone contacts" ON public.contact_messages;
CREATE POLICY "Anyone contacts" ON public.contact_messages FOR INSERT
  WITH CHECK (char_length(name) BETWEEN 1 AND 120 AND char_length(email) BETWEEN 3 AND 200 AND char_length(message) BETWEEN 1 AND 5000);

DROP POLICY "Anyone subscribes" ON public.newsletter_subscribers;
CREATE POLICY "Anyone subscribes" ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (char_length(email) BETWEEN 3 AND 200);

-- Lock down direct RPC access on helper/trigger functions
REVOKE ALL ON FUNCTION public.tg_set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.tg_seed_admin() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
