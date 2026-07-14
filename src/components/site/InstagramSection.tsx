import { useEffect, useRef, useState } from "react";
import { Instagram, ArrowUpRight } from "lucide-react";
import logo from "@/assets/tfac-logo.asset.json";

const IG_HANDLE = "travelfunandactivecommunity";
const IG_URL = `https://www.instagram.com/${IG_HANDLE}/`;
const IG_EMBED_URL = `https://www.instagram.com/${IG_HANDLE}/embed/`;


export function InstagramSection() {
  const [inView, setInView] = useState(false);
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const [embedFailed, setEmbedFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || inView) return;
    const el = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  useEffect(() => {
    if (!inView || embedLoaded || embedFailed) return;
    const t = setTimeout(() => setEmbedFailed(true), 6000);
    return () => clearTimeout(t);
  }, [inView, embedLoaded, embedFailed]);

  const showPreview = !embedLoaded; // covers both loading and failed states

  return (
    <section id="instagram" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
      <div ref={containerRef} className="rounded-3xl border border-border/60 bg-cream/50 p-6 sm:p-10">
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

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-border/60 bg-background">
          {showPreview && (
            <div className="p-6 sm:p-8">
              {/* Profile header */}
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
                <img
                  src={logo.url}
                  alt="TFAC"
                  width={88}
                  height={88}
                  className="h-20 w-20 rounded-full border-2 border-sunset object-cover shadow-sm sm:h-24 sm:w-24"
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
                    <p className="font-display text-xl font-semibold text-navy">@{IG_HANDLE}</p>
                    <a
                      href={IG_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-navy px-4 py-1.5 text-xs font-semibold text-cream hover:bg-navy/90"
                    >
                      Follow <ArrowUpRight size={12} />
                    </a>
                  </div>
                  <p className="mt-2 text-sm text-navy/70">
                    Travel Fun and Active Community · Canadian non-profit
                  </p>
                </div>
              </div>

              {/* Placeholder grid — neutral tiles, no photos */}
              <div className="mt-6 grid grid-cols-3 gap-1.5 sm:gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative flex aspect-square items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-cream to-muted text-navy/20"
                  >
                    <Instagram size={28} strokeWidth={1.5} />
                  </div>
                ))}
              </div>


              <div className="mt-6 flex items-center justify-between gap-3 text-sm text-navy/60">
                <span className="inline-flex items-center gap-2">
                  {!embedFailed && inView && (
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-sunset border-t-transparent" />
                  )}
                  {embedFailed
                    ? "Live feed unavailable — view the latest on Instagram."
                    : inView
                      ? "Loading the latest posts…"
                      : "Scroll to load the latest posts."}
                </span>
                <a
                  href={IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sunset hover:underline"
                >
                  Open on Instagram →
                </a>
              </div>
            </div>
          )}

          {inView && !embedFailed && (
            <iframe
              src={IG_EMBED_URL}
              title={`Instagram feed for @${IG_HANDLE}`}
              className={`h-[720px] w-full ${embedLoaded ? "block" : "hidden"}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setEmbedLoaded(true)}
              onError={() => setEmbedFailed(true)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
