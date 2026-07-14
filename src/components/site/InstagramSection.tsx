import { useState } from "react";
import { Instagram } from "lucide-react";

const IG_HANDLE = "travelfunandactivecommunity";
const IG_URL = `https://www.instagram.com/${IG_HANDLE}/`;
const IG_EMBED_URL = `https://www.instagram.com/${IG_HANDLE}/embed/`;

export function InstagramSection() {
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const [embedFailed, setEmbedFailed] = useState(false);

  return (
    <section id="instagram" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
      <div className="rounded-3xl border border-border/60 bg-cream/50 p-6 sm:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sunset via-amber to-sunset text-white shadow-md">
              <Instagram size={22} />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">
                Follow us on Instagram
              </h2>
              <p className="mt-1 text-navy/70">
                Trip highlights, event announcements, and community moments from @{IG_HANDLE}
              </p>
            </div>
          </div>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sunset/30 transition-colors hover:bg-sunset/90 md:self-auto"
          >
            <Instagram size={16} />
            Follow @{IG_HANDLE}
          </a>
        </div>

        {!embedFailed && (
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-border/60 bg-background">
            {!embedLoaded && (
              <div className="flex h-[520px] items-center justify-center text-navy/60">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-sunset border-t-transparent" />
                  <p className="text-sm">Loading Instagram…</p>
                </div>
              </div>
            )}
            <iframe
              src={IG_EMBED_URL}
              title={`Instagram feed for @${IG_HANDLE}`}
              className={`h-[720px] w-full ${embedLoaded ? "block" : "hidden"}`}
              loading="lazy"
              onLoad={() => setEmbedLoaded(true)}
              onError={() => setEmbedFailed(true)}
            />
          </div>
        )}

        <p className="mt-6 text-center text-sm text-navy/60">
          Can't see the feed?{" "}
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-sunset hover:underline">
            Open @{IG_HANDLE} on Instagram
          </a>
        </p>
      </div>
    </section>
  );
}
