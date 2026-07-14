import { useEffect, useRef } from "react";
import { Instagram, ArrowUpRight } from "lucide-react";
import logo from "@/assets/tfac-logo.asset.json";

const IG_HANDLE = "travelfunandactivecommunity";
const IG_URL = `https://www.instagram.com/${IG_HANDLE}?igsh=OHhjNmgybzRpbmhr`;

// Add post or reel URLs from @travelfunandactivecommunity here to embed them.
// Examples:
//   "https://www.instagram.com/p/ABC123/",
//   "https://www.instagram.com/reel/XYZ789/",
const POST_URLS: string[] = [];

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export function InstagramSection() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (POST_URLS.length === 0) return;
    const SRC = "https://www.instagram.com/embed.js";

    const process = () => window.instgrm?.Embeds.process();

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SRC}"]`,
    );
    if (existing) {
      process();
      return;
    }
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    script.onload = process;
    document.body.appendChild(script);
  }, []);

  return (
    <section
      id="instagram"
      className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
    >
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
                Trip highlights, event announcements, and community moments from
                @{IG_HANDLE}
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

        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-background p-6 sm:p-8">
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
                <p className="font-display text-xl font-semibold text-navy">
                  @{IG_HANDLE}
                </p>
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

          {POST_URLS.length > 0 ? (
            <div
              ref={gridRef}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {POST_URLS.map((url) => (
                <blockquote
                  key={url}
                  className="instagram-media"
                  data-instgrm-permalink={url}
                  data-instgrm-version="14"
                  style={{
                    background: "#FFF",
                    border: 0,
                    borderRadius: 12,
                    margin: 0,
                    maxWidth: "100%",
                    minWidth: 0,
                    padding: 0,
                    width: "100%",
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-dashed border-border/70 bg-cream/40 p-8 text-center">
              <p className="text-navy/80">
                See our latest trips, events, and community moments on Instagram.
              </p>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-semibold text-sunset hover:underline"
              >
                Open @{IG_HANDLE} on Instagram <ArrowUpRight size={14} />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
