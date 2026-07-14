import { useEffect } from "react";
import { Instagram, ArrowUpRight } from "lucide-react";

const IG_HANDLE = "travelfunandactivecommunity";
const IG_URL = `https://www.instagram.com/${IG_HANDLE}?igsh=OHhjNmgybzRpbmhr`;
const ELFSIGHT_APP_ID = "7a639fa4-7284-491a-a3d2-4880f89db17a";
const ELFSIGHT_SRC = "https://elfsightcdn.com/platform.js";

export function InstagramSection() {
  useEffect(() => {
    if (document.querySelector(`script[src="${ELFSIGHT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = ELFSIGHT_SRC;
    script.async = true;
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

        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-background p-4 sm:p-6">
          <div
            className={`elfsight-app-${ELFSIGHT_APP_ID}`}
            data-elfsight-app-lazy
          />
        </div>
      </div>
    </section>
  );
}
