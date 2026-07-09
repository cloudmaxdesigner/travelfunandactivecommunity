import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkyElite — Premium Private Jets" },
      {
        name: "description",
        content:
          "SkyElite offers premium, accessible private jet charters. Discover elevated travel designed for those whose dedication deserves recognition.",
      },
      { property: "og:title", content: "SkyElite — Premium Private Jets" },
      {
        property: "og:description",
        content:
          "Premium, accessible private jet charters. Your dedication deserves recognition.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SkyElite — Premium Private Jets" },
      {
        name: "twitter:description",
        content:
          "Premium, accessible private jet charters. Your dedication deserves recognition.",
      },
    ],
  }),
  component: Index,
});

const NAV_ITEMS = ["Start", "Story", "Rates", "Benefits", "FAQ"];

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4";

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookHover, setBookHover] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="relative h-full flex flex-col">
          <nav className="relative max-w-7xl mx-auto w-full px-8 py-6 flex items-center justify-between">
            <a
              href="#"
              className="text-2xl font-semibold text-gray-900"
            >
              SkyElite
            </a>

            <ul className="hidden md:flex gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-900 hover:text-gray-700 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="md:hidden text-gray-900"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {menuOpen && (
              <div className="md:hidden absolute top-full right-8 mt-2 bg-white/95 backdrop-blur rounded-xl shadow-lg p-4 flex flex-col gap-3 min-w-[160px]">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-900 hover:text-gray-700 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </nav>

          <main className="flex-1 flex items-center justify-center">
            <div className="-mt-80 text-center flex flex-col items-center px-6">
              <span className="text-sm font-semibold text-gray-600 tracking-wider mb-4 uppercase">
                Private Jets
              </span>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal text-gray-500 leading-none tracking-tighter">
                Premium.
              </h1>
              <h1
                className="text-6xl md:text-7xl lg:text-8xl font-normal leading-none tracking-tighter"
                style={{ color: "#202A36", marginTop: "-12px" }}
              >
                Accessible.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mt-6 mb-6 max-w-2xl">
                Your dedication deserves recognition.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition-colors"
                >
                  Discover
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full text-white font-medium transition-colors"
                  style={{
                    backgroundColor: bookHover ? "#1a2229" : "#202A36",
                  }}
                  onMouseEnter={() => setBookHover(true)}
                  onMouseLeave={() => setBookHover(false)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
