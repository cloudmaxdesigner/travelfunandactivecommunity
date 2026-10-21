import { useEffect, useState } from "react";
import { Check, Loader2, Pause, Play, Share2, Wand2 } from "lucide-react";
import { RENDER_ENGINES, TEMPLATES } from "@/lib/fitcast/data";
import { Logo } from "./Shapes";
import { Card, Chip, GlassCircle, ScreenHeader, rise } from "./ui";

const STAGES = [
  "Locking your twin's face & body",
  "Generating motion clips",
  "Beat-syncing cuts to the track",
  "Colour grade + captions",
  "Exporting 1080×1920",
];

export function EditScreen({ images, weatherLine }: { images: string[]; weatherLine: string }) {
  const [templateId, setTemplateId] = useState(TEMPLATES[0].id);
  const [engine, setEngine] = useState<string>(RENDER_ENGINES[0].id);
  const [playing, setPlaying] = useState(true);
  const [beat, setBeat] = useState(0);
  const [progress, setProgress] = useState<number | null>(null);
  const template = TEMPLATES.find((t) => t.id === templateId)!;
  const effect = template.effects[beat % template.effects.length];
  const caption = template.captions[beat % template.captions.length];

  // Cut every two beats (four for slow templates) — this is the "edit" rhythm.
  useEffect(() => {
    if (!playing) return;
    const beatsPerCut = template.bpm < 100 ? 4 : 2;
    const id = setInterval(() => setBeat((b) => b + 1), (60000 / template.bpm) * beatsPerCut);
    return () => clearInterval(id);
  }, [playing, template.bpm]);

  // Simulated render job; production swaps this for a queued server render.
  useEffect(() => {
    if (progress === null || progress >= 100) return;
    const t = setTimeout(() => setProgress((p) => Math.min(100, (p ?? 0) + 2.5)), 90);
    return () => clearTimeout(t);
  }, [progress]);

  const stage =
    progress === null
      ? -1
      : Math.min(STAGES.length - 1, Math.floor((progress / 100) * STAGES.length));
  const done = progress === 100;
  const engineName = RENDER_ENGINES.find((e) => e.id === engine)!.name;

  async function share() {
    const data = {
      title: "My FITCAST edit",
      text: `Today's fit — ${weatherLine}`,
      url: window.location.href,
    };
    if (navigator.share) await navigator.share(data).catch(() => {});
    else await navigator.clipboard?.writeText(data.url);
  }

  return (
    <div className="pb-6">
      <ScreenHeader title="Hype edit" sub="Your week of fits, cut to the beat" />

      {/* 9:16 live preview */}
      <div className="fc-a-rise px-4" style={rise(0.12)}>
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[28px] bg-black">
          <img
            key={`${beat}-${templateId}`}
            src={images[beat % images.length]}
            alt="Edit frame"
            className={`absolute inset-0 h-full w-full object-cover fc-a-${effect}`}
          />
          {effect === "flash" && (
            <div key={`f${beat}`} className="fc-a-flash absolute inset-0 bg-white" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

          <div className="absolute inset-x-3 top-3 flex gap-1">
            {template.captions.map((_, i) => (
              <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
                <span
                  className="block h-full bg-white transition-[width] duration-200"
                  style={{ width: i <= beat % template.captions.length ? "100%" : "0%" }}
                />
              </span>
            ))}
          </div>
          <div className="absolute inset-x-4 top-7 flex items-center justify-between text-[10px] font-semibold tracking-[0.2em] text-white/80">
            <Logo className="text-[11px]" />
            <span>{template.bpm} BPM</span>
          </div>

          <p
            key={`c${beat}-${templateId}`}
            className="fc-orbitron fc-a-caption absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center text-[26px] font-extrabold uppercase leading-tight tracking-[0.08em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          >
            {caption}
          </p>

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
            <p className="max-w-[70%] text-[11px] font-medium leading-snug text-white/85">
              {weatherLine}
            </p>
            <GlassCircle
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying(!playing)}
              className="!h-10 !w-10 !rounded-full"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </GlassCircle>
          </div>
        </div>
      </div>

      <p
        className="fc-a-rise mb-2 mt-6 px-5 text-[12px] font-medium text-[var(--fc-muted)]"
        style={rise(0.2)}
      >
        Template
      </p>
      <div className="fc-scroll fc-a-rise flex gap-2 overflow-x-auto px-4" style={rise(0.24)}>
        {TEMPLATES.map((t) => (
          <Chip
            key={t.id}
            active={t.id === templateId}
            onClick={() => {
              setTemplateId(t.id);
              setBeat(0);
            }}
          >
            {t.name} · {t.bpm}
          </Chip>
        ))}
      </div>

      <p
        className="fc-a-rise mb-2 mt-5 px-5 text-[12px] font-medium text-[var(--fc-muted)]"
        style={rise(0.28)}
      >
        Motion engine
      </p>
      <Card className="fc-a-rise mx-4 p-1.5" style={rise(0.32)}>
        {RENDER_ENGINES.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setEngine(e.id)}
            className={`flex w-full items-center gap-3 rounded-[18px] px-3 py-2.5 text-left transition-colors ${
              engine === e.id ? "bg-white/10" : ""
            }`}
          >
            <span
              className={`grid h-5 w-5 place-items-center rounded-full border ${
                engine === e.id
                  ? "border-[var(--fc-accent)] bg-[var(--fc-accent)] text-black"
                  : "border-white/25"
              }`}
            >
              {engine === e.id && <Check size={12} strokeWidth={3} />}
            </span>
            <span className="flex-1">
              <span className="block text-[14px] font-medium">{e.name}</span>
              <span className="block text-[11px] text-[var(--fc-muted)]">{e.note}</span>
            </span>
          </button>
        ))}
      </Card>

      <div className="fc-a-fade px-4 pt-5" style={rise(0.4)}>
        {progress === null ? (
          <button
            type="button"
            onClick={() => setProgress(0)}
            className="fc-a-pulse flex h-[54px] w-full items-center justify-center gap-2 rounded-[27px] bg-[var(--fc-accent)] text-[15px] font-semibold text-black active:scale-[0.97]"
          >
            <Wand2 size={18} /> Render HD edit
          </button>
        ) : (
          <Card className="p-4">
            <div className="flex items-center gap-2 text-[14px] font-medium">
              {done ? (
                <Check size={16} className="text-[var(--fc-accent)]" />
              ) : (
                <Loader2 size={16} className="animate-spin" />
              )}
              {done ? "Ready to post" : `${STAGES[stage]} · ${engineName}`}
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-[var(--fc-accent)] transition-[width]"
                style={{ width: `${progress}%` }}
              />
            </div>
            {done && (
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={share}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-[22px] bg-[var(--fc-text)] text-[14px] font-semibold text-black"
                >
                  <Share2 size={16} /> Share
                </button>
                <button
                  type="button"
                  onClick={() => setProgress(null)}
                  className="fc-glass h-11 flex-1 rounded-[22px] text-[14px] font-medium"
                >
                  New edit
                </button>
              </div>
            )}
            <p className="mt-3 text-[11px] leading-snug text-[var(--fc-muted)]">
              Prototype: the preview above is cut live in the browser. HD renders run server-side
              once the motion API key is connected.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
