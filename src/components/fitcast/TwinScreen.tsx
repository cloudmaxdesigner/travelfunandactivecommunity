import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { BellRing, Check, Loader2, Lock, Plus, ScanFace } from "lucide-react";
import { Card, Chip, ScreenHeader, rise } from "./ui";

const SLOTS = ["Face · front", "Face · side", "Full body · front", "Full body · side"];
const DNA = [
  "Minimal",
  "Oversized",
  "Monochrome",
  "Earth tones",
  "Tailored",
  "Sporty",
  "Y2K",
  "Quiet luxury",
];
const TIMES = ["6:45", "7:30", "8:15"];

export function TwinScreen() {
  const [photos, setPhotos] = useState<(string | null)[]>(SLOTS.map(() => null));
  const [training, setTraining] = useState<number | null>(null);
  const [dna, setDna] = useState<string[]>(["Minimal", "Monochrome"]);
  const [time, setTime] = useState("7:30");
  const [notify, setNotify] = useState<NotificationPermission | "unsupported">("default");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const filled = photos.filter(Boolean).length;
  const ready = training === 100;

  useEffect(() => {
    setNotify(typeof Notification === "undefined" ? "unsupported" : Notification.permission);
  }, []);

  useEffect(() => {
    if (training === null || training >= 100) return;
    const t = setTimeout(() => setTraining((p) => Math.min(100, (p ?? 0) + 4)), 110);
    return () => clearTimeout(t);
  }, [training]);

  function pick(i: number, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setPhotos((p) => p.map((x, j) => (j === i ? URL.createObjectURL(file) : x)));
  }

  async function enableDrops() {
    if (typeof Notification === "undefined") return;
    const result = await Notification.requestPermission();
    setNotify(result);
    if (result === "granted") {
      new Notification("FITCAST˚ — your fit is ready", {
        body: `Daily drop set for ${time}. Tap to see you in today's look.`,
      });
    }
  }

  return (
    <div className="pb-6">
      <ScreenHeader
        title="Your twin"
        sub={ready ? "Trained · renders you in every look" : "4 photos → a private AI model of you"}
        right={
          <span
            className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold ${
              ready ? "bg-[var(--fc-accent)] text-black" : "fc-glass text-[var(--fc-muted)]"
            }`}
          >
            <ScanFace size={14} /> {ready ? "Live" : `${filled}/4`}
          </span>
        }
      />

      <div className="grid grid-cols-2 gap-3 px-4">
        {SLOTS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => inputs.current[i]?.click()}
            className="fc-a-rise relative aspect-[3/4] overflow-hidden rounded-[24px] bg-[var(--fc-card)] text-left"
            style={rise(0.12 + i * 0.05)}
          >
            <input
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="file"
              accept="image/*"
              capture="user"
              className="hidden"
              onChange={(e) => pick(i, e)}
            />
            {photos[i] ? (
              <img
                src={photos[i]!}
                alt={label}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <span className="absolute inset-0 grid place-items-center text-[var(--fc-muted)]">
                <Plus size={24} strokeWidth={1.4} />
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-6 text-[12px] font-medium">
              {label}
            </span>
          </button>
        ))}
      </div>

      <div className="fc-a-rise px-4 pt-4" style={rise(0.35)}>
        {training === null ? (
          <button
            type="button"
            disabled={filled < 3}
            onClick={() => setTraining(0)}
            className="h-[54px] w-full rounded-[27px] bg-[var(--fc-text)] text-[15px] font-semibold text-black transition-opacity disabled:opacity-30"
          >
            {filled < 3
              ? `Add ${3 - filled} more photo${3 - filled === 1 ? "" : "s"}`
              : "Build my twin"}
          </button>
        ) : (
          <Card className="p-4">
            <p className="flex items-center gap-2 text-[14px] font-medium">
              {ready ? (
                <Check size={16} className="text-[var(--fc-accent)]" />
              ) : (
                <Loader2 size={16} className="animate-spin" />
              )}
              {ready
                ? `Twin ready — first drop tomorrow at ${time}`
                : "Learning your proportions & features…"}
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-[var(--fc-accent)]" style={{ width: `${training}%` }} />
            </div>
          </Card>
        )}
        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[var(--fc-muted)]">
          <Lock size={11} /> Photos stay private and are only used to render you. Delete anytime.
        </p>
      </div>

      <p
        className="fc-a-rise mb-2 mt-6 px-5 text-[12px] font-medium text-[var(--fc-muted)]"
        style={rise(0.42)}
      >
        Style DNA
      </p>
      <div className="fc-a-rise flex flex-wrap gap-2 px-4" style={rise(0.46)}>
        {DNA.map((d) => (
          <Chip
            key={d}
            active={dna.includes(d)}
            onClick={() => setDna(dna.includes(d) ? dna.filter((x) => x !== d) : [...dna, d])}
          >
            {d}
          </Chip>
        ))}
      </div>

      <Card className="fc-a-rise mx-4 mt-5 p-4" style={rise(0.52)}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[15px] font-medium">Daily drop</p>
            <p className="text-[12px] text-[var(--fc-muted)]">
              New outfit + weather, every morning
            </p>
          </div>
          <BellRing size={20} strokeWidth={1.5} className="text-[var(--fc-muted)]" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1 rounded-[16px] bg-black/30 p-1">
          {TIMES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTime(t)}
              className={`h-9 rounded-[12px] text-[13px] font-medium ${t === time ? "bg-white/15" : "text-[var(--fc-muted)]"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={enableDrops}
          disabled={notify === "unsupported" || notify === "denied"}
          className="fc-glass mt-3 h-11 w-full rounded-[22px] text-[14px] font-medium disabled:opacity-40"
        >
          {notify === "granted"
            ? "Notifications on — send a test"
            : notify === "denied"
              ? "Notifications blocked in browser settings"
              : notify === "unsupported"
                ? "Notifications need the installed app"
                : "Turn on morning notifications"}
        </button>
      </Card>
    </div>
  );
}
