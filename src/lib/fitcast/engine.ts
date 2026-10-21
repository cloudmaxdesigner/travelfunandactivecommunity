import type { Category, ClosetItem, Vibe } from "./data";

export type Weather = {
  city: string;
  temp: number;
  feelsLike: number;
  code: number;
  label: string;
  rainy: boolean;
  live: boolean;
};

export type Outfit = {
  pieces: Partial<Record<Category, ClosetItem>>;
  reasons: string[];
  targetWarmth: number;
};

const NEUTRALS = [
  "#151515",
  "#121212",
  "#131313",
  "#0f0f10",
  "#1b1b1b",
  "#f4f2ee",
  "#f6f6f4",
  "#3a3a3c",
  "#9a9a9e",
  "#c9c9cc",
];

export function warmthFor(feelsLike: number) {
  if (feelsLike >= 24) return 0;
  if (feelsLike >= 16) return 1;
  if (feelsLike >= 7) return 2;
  return 3;
}

// Deterministic pseudo-random so "shuffle" is repeatable per seed.
function noise(seed: number, id: string) {
  let h = seed * 2654435761;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 2246822519);
  return ((h >>> 0) % 1000) / 1000;
}

function score(item: ClosetItem, vibe: Vibe, target: number, weather: Weather, seed: number) {
  let s = 0;
  if (item.vibes.includes(vibe)) s += 3;
  s -= Math.abs(item.warmth - target) * 1.6;
  if (weather.rainy && item.waterproof) s += 2.5;
  s -= item.wears * 0.03; // nudge toward pieces you forget about
  s += noise(seed, item.id) * 2.2;
  return s;
}

const ORDER: Category[] = ["outer", "top", "bottom", "shoes", "accessory"];

export function recommend(
  closet: ClosetItem[],
  weather: Weather,
  vibe: Vibe,
  seed: number,
): Outfit {
  const target = warmthFor(weather.feelsLike);
  const needsOuter = weather.feelsLike < 18 || weather.rainy;
  const pieces: Outfit["pieces"] = {};
  let accents = 0;

  for (const cat of ORDER) {
    if (cat === "outer" && !needsOuter) continue;
    const ranked = closet
      .filter((i) => i.category === cat)
      .map((i) => {
        const isAccent = !NEUTRALS.includes(i.color);
        // Keep palettes calm: at most two non-neutral colours per look.
        const penalty = isAccent && accents >= 2 ? 4 : 0;
        return { i, s: score(i, vibe, target, weather, seed) - penalty };
      })
      .sort((a, b) => b.s - a.s);
    const pick = ranked[0]?.i;
    if (!pick) continue;
    if (cat === "accessory" && ranked[0].s < 0) continue;
    pieces[cat] = pick;
    if (!NEUTRALS.includes(pick.color)) accents++;
  }

  const reasons: string[] = [];
  reasons.push(
    `Feels like ${Math.round(weather.feelsLike)}° — ${["breathable layers", "one light layer", "a real mid-layer", "full warmth"][target]}.`,
  );
  if (weather.rainy) {
    const dry = Object.values(pieces).filter((p) => p?.waterproof).length;
    reasons.push(
      `${weather.label.toLowerCase()} expected — ${dry} weatherproof piece${dry === 1 ? "" : "s"} in the fit.`,
    );
  }
  const fresh = Object.values(pieces).sort((a, b) => (a?.wears ?? 0) - (b?.wears ?? 0))[0];
  if (fresh)
    reasons.push(`Bringing back your ${fresh.name.toLowerCase()} — only worn ${fresh.wears}×.`);

  return { pieces, reasons, targetWarmth: target };
}

// WMO weather codes (Open-Meteo).
export function describeCode(code: number) {
  if (code === 0) return "Clear";
  if (code <= 3) return "Cloudy";
  if (code <= 48) return "Fog";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Snow showers";
  return "Storms";
}

export const FALLBACK_WEATHER: Weather = {
  city: "Toronto",
  temp: 12,
  feelsLike: 9,
  code: 61,
  label: "Light rain",
  rainy: true,
  live: false,
};

export async function fetchWeather(lat = 43.65, lon = -79.38, city = "Toronto"): Promise<Weather> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`weather ${res.status}`);
  const json = (await res.json()) as {
    current: { temperature_2m: number; apparent_temperature: number; weather_code: number };
  };
  const code = json.current.weather_code;
  return {
    city,
    temp: json.current.temperature_2m,
    feelsLike: json.current.apparent_temperature,
    code,
    label: describeCode(code),
    rainy: (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95,
    live: true,
  };
}
