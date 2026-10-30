import { Bell, Clapperboard, CloudRain, Shuffle, Sparkles, Sun, Thermometer } from "lucide-react";
import { CATEGORY_LABEL, VIBES, type Category, type Vibe } from "@/lib/fitcast/data";
import type { Outfit, Weather } from "@/lib/fitcast/engine";
import { Logo } from "./Shapes";
import { Card, Chip, GlassCircle, Swatch, rise } from "./ui";

const LAYER_LABEL = ["Light", "One layer", "Mid layer", "Bundled"];
const ORDER: Category[] = ["outer", "top", "bottom", "shoes", "accessory"];

// Backdrop the twin stands in, tinted by the forecast.
const SCENE = {
  rain: "radial-gradient(120% 80% at 50% 30%, #3b4a5c 0%, #1b2027 55%, var(--fc-bg) 100%)",
  clear: "radial-gradient(120% 80% at 50% 30%, #6e5435 0%, #2a1f16 55%, var(--fc-bg) 100%)",
};

export function TodayScreen({
  weather,
  outfit,
  vibe,
  image,
  onVibe,
  onShuffle,
  onMakeEdit,
}: {
  weather: Weather;
  outfit: Outfit;
  vibe: Vibe;
  image: string;
  onVibe: (v: Vibe) => void;
  onShuffle: () => void;
  onMakeEdit: () => void;
}) {
  const pieces = ORDER.flatMap((c) => (outfit.pieces[c] ? [outfit.pieces[c]!] : []));
  const vibeLabel = VIBES.find((v) => v.id === vibe)?.label ?? "";
  const WeatherIcon = weather.rainy ? CloudRain : Sun;

  return (
    <div>
      {/* Hero — the user's AI twin wearing today's fit */}
      <div
        className="relative h-[470px] w-full overflow-hidden"
        style={{ background: weather.rainy ? SCENE.rain : SCENE.clear }}
      >
        <p
          aria-hidden
          className="fc-orbitron fc-a-fade absolute inset-x-0 top-[92px] whitespace-nowrap text-center text-[64px] font-black uppercase leading-none tracking-[0.04em] text-white/[0.07] sm:top-[118px]"
        >
          {vibeLabel}
        </p>
        <span className="absolute bottom-[34px] left-1/2 h-6 w-44 -translate-x-1/2 rounded-full bg-black/45 blur-xl" />
        <div className="fc-a-hero absolute inset-x-0 bottom-[40px] top-[78px] sm:top-[104px]">
          <img
            key={image}
            src={image}
            alt="Your AI twin wearing today's outfit"
            className="fc-a-kenburns mx-auto h-full w-auto max-w-[86%] object-contain object-bottom"
            style={{ transformOrigin: "50% 100%" }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(14,12,11,0.35) 0%, transparent 18%, transparent 80%, var(--fc-bg) 100%)",
          }}
        />
        <div className="absolute inset-x-4 top-[18px] flex items-center justify-between sm:top-[52px]">
          <GlassCircle aria-label="Notifications" className="fc-a-drop relative" style={rise(0.35)}>
            <Bell size={18} strokeWidth={1.6} />
            <span className="absolute right-[18px] top-[11px] h-1.5 w-1.5 rounded-full bg-[var(--fc-accent)]" />
          </GlassCircle>
          <Logo className="fc-a-fade text-[13px] text-white/90" />
          <GlassCircle
            aria-label="Shuffle outfit"
            onClick={onShuffle}
            className="fc-a-drop"
            style={rise(0.42)}
          >
            <Shuffle size={18} strokeWidth={1.6} />
          </GlassCircle>
        </div>
      </div>

      {/* Vibe selector */}
      <div
        className="fc-scroll fc-a-rise relative -mt-4 flex gap-2 overflow-x-auto px-4"
        style={rise(0.5)}
      >
        {VIBES.map((v) => (
          <Chip key={v.id} active={v.id === vibe} onClick={() => onVibe(v.id)}>
            {v.label}
          </Chip>
        ))}
      </div>

      {/* Weather */}
      <div className="grid grid-cols-3 gap-3 px-4 pt-5">
        {[
          {
            icon: WeatherIcon,
            value: `${Math.round(weather.temp)}°`,
            label: weather.live ? weather.label : `${weather.label} (sample)`,
          },
          { icon: Thermometer, value: `${Math.round(weather.feelsLike)}°`, label: "feels like" },
          {
            icon: Sparkles,
            value: LAYER_LABEL[outfit.targetWarmth].split(" ")[0],
            label: "layer level",
          },
        ].map((s, i) => (
          <Card
            key={s.label}
            className="fc-a-rise flex flex-col items-center px-2 pb-4 pt-5 text-center"
            style={rise(0.56 + i * 0.06)}
          >
            <s.icon size={22} strokeWidth={1.4} className="text-[var(--fc-muted)]" />
            <span className="mt-3 text-[25px] font-medium leading-none">{s.value}</span>
            <span className="mt-1.5 text-[12px] text-[var(--fc-muted)]">{s.label}</span>
          </Card>
        ))}
      </div>

      {/* The fit */}
      <Card className="fc-a-rise mx-4 mt-3 p-4" style={rise(0.74)}>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[13px] font-medium text-[var(--fc-muted)]">
            From your closet · {pieces.length} pieces · {weather.city}
          </span>
          <GlassCircle aria-label="Shuffle outfit" onClick={onShuffle} className="!h-9 !w-12">
            <Shuffle size={16} strokeWidth={1.6} />
          </GlassCircle>
        </div>
        <ul className="divide-y divide-white/5">
          {pieces.map((p) => (
            <li key={p.id} className="flex items-center gap-3 py-2.5">
              <Swatch color={p.color} photo={p.photo} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-medium">{p.name}</p>
                <p className="text-[12px] text-[var(--fc-muted)]">
                  {CATEGORY_LABEL[p.category]}
                  {p.waterproof && weather.rainy ? " · weatherproof" : ""}
                </p>
              </div>
              <span className="text-[12px] text-[var(--fc-muted)]">{p.wears}×</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="fc-a-fade px-4 pb-6 pt-5" style={rise(0.82)}>
        <button
          type="button"
          onClick={onMakeEdit}
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-[27px] bg-[var(--fc-accent)] text-[15px] font-semibold text-black transition-transform active:scale-[0.97]"
        >
          <Clapperboard size={18} strokeWidth={2} />
          Make my hype edit
        </button>
      </div>
    </div>
  );
}
