import {
  Bell,
  Clapperboard,
  CloudRain,
  Layers,
  Shuffle,
  Sparkles,
  Sun,
  Thermometer,
} from "lucide-react";
import { CATEGORY_LABEL, VIBES, type Category, type Vibe } from "@/lib/fitcast/data";
import type { Outfit, Weather } from "@/lib/fitcast/engine";
import { Logo } from "./Shapes";
import { Card, Chip, GlassCircle, Swatch, rise, useTodayLabel } from "./ui";

const LAYER_LABEL = ["Light", "One layer", "Mid layer", "Bundled"];
const ORDER: Category[] = ["outer", "top", "bottom", "shoes", "accessory"];

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
  const today = useTodayLabel();
  const pieces = ORDER.flatMap((c) => (outfit.pieces[c] ? [outfit.pieces[c]!] : []));
  const vibeLabel = VIBES.find((v) => v.id === vibe)?.label ?? "";
  const WeatherIcon = weather.rainy ? CloudRain : Sun;

  return (
    <div>
      {/* Hero — the user's AI twin wearing today's fit */}
      <div className="relative h-[430px] w-full overflow-hidden">
        <div className="fc-a-hero absolute inset-0">
          <img
            key={image}
            src={image}
            alt="Your AI twin wearing today's outfit"
            className="fc-a-kenburns h-full w-full object-cover object-top"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(14,12,11,0.35) 0%, transparent 22%, transparent 52%, var(--fc-bg) 100%)",
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

      {/* Identity block overlaps the hero */}
      <div className="relative -mt-28 px-5 text-center">
        <p
          className="fc-a-rise text-[11px] font-semibold tracking-[0.25em] text-[var(--fc-muted)]"
          style={rise(0.45)}
        >
          {today || " "} · TWIN PREVIEW
        </p>
        <h1 className="fc-a-rise mt-2 text-[28px] font-medium leading-tight" style={rise(0.5)}>
          Today's fit
        </h1>
        <p className="fc-a-rise mt-1 text-[15px] text-[var(--fc-muted)]" style={rise(0.58)}>
          {vibeLabel} · {LAYER_LABEL[outfit.targetWarmth]}
        </p>
        <div
          className="fc-glass fc-a-rise mx-auto mt-6 flex h-[54px] w-fit items-center gap-2.5 rounded-[27px] px-6 text-[15px] font-medium"
          style={rise(0.66)}
        >
          <WeatherIcon size={18} strokeWidth={1.6} />
          {Math.round(weather.temp)}° · {weather.label} · {weather.city}
          {!weather.live && <span className="text-[11px] text-[var(--fc-muted)]">(sample)</span>}
        </div>
      </div>

      {/* Vibe selector */}
      <div className="fc-scroll fc-a-rise mt-6 flex gap-2 overflow-x-auto px-4" style={rise(0.72)}>
        {VIBES.map((v) => (
          <Chip key={v.id} active={v.id === vibe} onClick={() => onVibe(v.id)}>
            {v.label}
          </Chip>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 px-4 pt-5">
        {[
          { icon: Thermometer, value: `${Math.round(weather.feelsLike)}°`, label: "feels like" },
          { icon: Layers, value: String(pieces.length), label: "pieces picked" },
          {
            icon: Sparkles,
            value: LAYER_LABEL[outfit.targetWarmth].split(" ")[0],
            label: "layer level",
          },
        ].map((s, i) => (
          <Card
            key={s.label}
            className="fc-a-rise flex flex-col items-center px-2 pb-4 pt-5 text-center"
            style={rise(0.78 + i * 0.06)}
          >
            <s.icon size={22} strokeWidth={1.4} className="text-[var(--fc-muted)]" />
            <span className="mt-3 text-[25px] font-medium leading-none">{s.value}</span>
            <span className="mt-1.5 text-[12px] text-[var(--fc-muted)]">{s.label}</span>
          </Card>
        ))}
      </div>

      {/* The fit */}
      <Card className="fc-a-rise mx-4 mt-3 p-4" style={rise(0.96)}>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[13px] font-medium text-[var(--fc-muted)]">From your closet</span>
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

      <div className="fc-a-fade px-4 pb-6 pt-5" style={rise(1.1)}>
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
