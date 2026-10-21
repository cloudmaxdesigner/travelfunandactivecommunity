import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Clapperboard, ScanFace, Shirt, Sun } from "lucide-react";
import { CLOSET, LOOK_IMAGES, VIBES, type ClosetItem, type Vibe } from "@/lib/fitcast/data";
import { FALLBACK_WEATHER, fetchWeather, recommend } from "@/lib/fitcast/engine";
import { ClosetScreen } from "./ClosetScreen";
import { EditScreen } from "./EditScreen";
import { TodayScreen } from "./TodayScreen";
import { TwinScreen } from "./TwinScreen";

type Tab = "today" | "closet" | "edit" | "twin";

const TABS: { id: Tab; label: string; icon: typeof Sun }[] = [
  { id: "today", label: "Today", icon: Sun },
  { id: "closet", label: "Closet", icon: Shirt },
  { id: "edit", label: "Edit", icon: Clapperboard },
  { id: "twin", label: "Twin", icon: ScanFace },
];

export function AppExperience({ className = "" }: { className?: string }) {
  const [tab, setTab] = useState<Tab>("today");
  const [closet, setCloset] = useState<ClosetItem[]>(CLOSET);
  const [vibe, setVibe] = useState<Vibe>("clean");
  const [seed, setSeed] = useState(1);
  const [notif, setNotif] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  const { data: weather = FALLBACK_WEATHER } = useQuery({
    queryKey: ["fitcast-weather"],
    queryFn: () => fetchWeather(),
    staleTime: 30 * 60_000,
    retry: false,
  });

  const outfit = useMemo(
    () => recommend(closet, weather, vibe, seed),
    [closet, weather, vibe, seed],
  );
  const vibeIndex = VIBES.findIndex((v) => v.id === vibe);
  const heroImage = LOOK_IMAGES[(seed + vibeIndex) % LOOK_IMAGES.length];
  const editImages = useMemo(
    () => LOOK_IMAGES.map((_, i) => LOOK_IMAGES[(i + seed + vibeIndex) % LOOK_IMAGES.length]),
    [seed, vibeIndex],
  );
  const weatherLine = `${Math.round(weather.temp)}° ${weather.label.toLowerCase()} in ${weather.city}`;

  // The morning push, replayed in-app so the prototype shows the moment the user gets it.
  useEffect(() => {
    const show = setTimeout(() => setNotif(true), 900);
    const hide = setTimeout(() => setNotif(false), 6400);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  function go(next: Tab) {
    setTab(next);
    scroller.current?.scrollTo({ top: 0 });
  }

  return (
    <div className={`fc-app relative h-full w-full overflow-hidden ${className}`}>
      {notif && (
        <button
          type="button"
          onClick={() => {
            setNotif(false);
            go("today");
          }}
          className="fc-a-notif absolute inset-x-2 top-2 z-50 sm:top-12 flex items-center gap-3 rounded-[22px] bg-[#1d1a18]/85 p-3 text-left shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
        >
          <span className="fc-orbitron grid h-10 w-10 shrink-0 place-items-center rounded-[11px] bg-black text-[13px] font-black text-[var(--fc-accent)]">
            F˚
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex justify-between text-[11px] text-[var(--fc-muted)]">
              <span className="font-semibold tracking-wide">FITCAST</span>
              <span>now</span>
            </span>
            <span className="block text-[14px] font-semibold leading-tight">
              Your fit for today is ready ✦
            </span>
            <span className="block truncate text-[12px] text-[var(--fc-muted)]">
              {weatherLine} — tap to see you in it.
            </span>
          </span>
        </button>
      )}

      <div ref={scroller} className="fc-scroll h-full overflow-y-auto pb-24">
        <div key={tab}>
          {tab === "today" && (
            <TodayScreen
              weather={weather}
              outfit={outfit}
              vibe={vibe}
              image={heroImage}
              onVibe={setVibe}
              onShuffle={() => setSeed((s) => s + 1)}
              onMakeEdit={() => go("edit")}
            />
          )}
          {tab === "closet" && (
            <ClosetScreen closet={closet} onAdd={(i) => setCloset((c) => [i, ...c])} />
          )}
          {tab === "edit" && <EditScreen images={editImages} weatherLine={weatherLine} />}
          {tab === "twin" && <TwinScreen />}
        </div>
      </div>

      <nav
        className="fc-glass absolute inset-x-3 bottom-3 z-30 grid h-16 grid-cols-4 rounded-[28px]"
        style={{ background: "rgba(20, 17, 15, 0.82)" }}
      >
        {TABS.map((t) => {
          const active = t.id === tab;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => go(t.id)}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold tracking-wide transition-colors ${
                active ? "text-[var(--fc-text)]" : "text-[var(--fc-muted)]"
              }`}
            >
              <t.icon size={20} strokeWidth={active ? 2 : 1.5} />
              {t.label}
              <span
                className={`h-1 w-1 rounded-full ${active ? "bg-[var(--fc-accent)]" : "bg-transparent"}`}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/** iPhone-sized frame on larger screens; edge-to-edge on phones. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="fc-phone relative h-dvh w-full overflow-hidden bg-black sm:h-[844px] sm:w-[390px] sm:rounded-[44px] sm:shadow-[0_50px_120px_-30px_rgba(0,0,0,0.75)] sm:ring-[10px] sm:ring-black">
      <span className="pointer-events-none absolute left-1/2 top-2.5 z-[60] hidden h-[30px] w-[110px] -translate-x-1/2 rounded-full bg-black sm:block" />
      {children}
    </div>
  );
}
