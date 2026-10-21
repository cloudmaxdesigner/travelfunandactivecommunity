import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppExperience, PhoneFrame } from "@/components/fitcast/AppExperience";
import { Logo } from "@/components/fitcast/Shapes";
import { FITCAST_FONTS } from "@/lib/fitcast/data";

export const Route = createFileRoute("/fitcast/app")({
  head: () => ({
    meta: [
      { title: "FITCAST — Today's fit" },
      {
        name: "description",
        content: "Your AI twin in today's outfit, picked for the weather and your vibe.",
      },
      { name: "theme-color", content: "#0e0c0b" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FITCAST_FONTS },
    ],
  }),
  component: FitcastApp,
});

function FitcastApp() {
  return (
    <div
      className="flex min-h-dvh items-center justify-center gap-16 sm:p-8"
      style={{
        background: [
          "radial-gradient(ellipse 65% 55% at 15% 52%, rgba(120, 110, 90, 0.22), transparent)",
          "radial-gradient(ellipse 52% 48% at 83% 26%, rgba(217, 255, 61, 0.07), transparent)",
          "radial-gradient(ellipse 44% 52% at 56% 92%, rgba(90, 80, 70, 0.16), transparent)",
          "#070605",
        ].join(","),
      }}
    >
      <aside className="fc-jakarta hidden max-w-xs text-[#efe9e2] lg:block">
        <Link
          to="/fitcast"
          className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-white"
        >
          <ArrowLeft size={14} /> Back
        </Link>
        <Logo className="text-3xl" />
        <p className="mt-4 text-sm leading-relaxed text-white/55">
          Prototype of the daily drop. Weather is live for Toronto via Open-Meteo; outfits are
          picked from the sample closet by the recommendation engine. Try shuffling, switching
          vibes, scanning a piece, or cutting an edit.
        </p>
      </aside>
      <PhoneFrame>
        <AppExperience />
      </PhoneFrame>
    </div>
  );
}
