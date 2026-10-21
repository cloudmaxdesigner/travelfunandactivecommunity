import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Camera, Check, Droplets, Loader2, Plus, X } from "lucide-react";
import {
  CATEGORY_LABEL,
  VIBES,
  type Category,
  type ClosetItem,
  type Vibe,
} from "@/lib/fitcast/data";
import { Card, Chip, GlassCircle, ScreenHeader, Swatch, rise } from "./ui";

const CATS = Object.keys(CATEGORY_LABEL) as Category[];

type Draft = { photo: string; name: string; category: Category; vibes: Vibe[]; tagging: boolean };

export function ClosetScreen({
  closet,
  onAdd,
}: {
  closet: ClosetItem[];
  onAdd: (item: ClosetItem) => void;
}) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [draft, setDraft] = useState<Draft | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const items = filter === "all" ? closet : closet.filter((i) => i.category === filter);

  // Simulates the vision-model tagging pass that runs after a garment photo upload.
  useEffect(() => {
    if (!draft?.tagging) return;
    const t = setTimeout(() => setDraft((d) => (d ? { ...d, tagging: false } : d)), 1200);
    return () => clearTimeout(t);
  }, [draft?.tagging]);

  function pick(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setDraft({
      photo: URL.createObjectURL(file),
      name: "New piece",
      category: "top",
      vibes: ["clean"],
      tagging: true,
    });
  }

  function save() {
    if (!draft) return;
    onAdd({
      id: `u${Date.now()}`,
      name: draft.name.trim() || "New piece",
      category: draft.category,
      color: "#777777",
      warmth: draft.category === "outer" ? 2 : 1,
      vibes: draft.vibes,
      wears: 0,
      photo: draft.photo,
    });
    setDraft(null);
  }

  return (
    <div className="relative min-h-full">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={pick}
      />
      <ScreenHeader
        title="Closet"
        sub={`${closet.length} pieces · tap + to scan`}
        right={
          <GlassCircle aria-label="Scan a piece" onClick={() => fileRef.current?.click()}>
            <Camera size={18} strokeWidth={1.6} />
          </GlassCircle>
        }
      />

      <div className="fc-scroll fc-a-rise flex gap-2 overflow-x-auto px-4" style={rise(0.15)}>
        <Chip active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </Chip>
        {CATS.map((c) => (
          <Chip key={c} active={filter === c} onClick={() => setFilter(c)}>
            {CATEGORY_LABEL[c]}
          </Chip>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pb-6 pt-4">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="fc-a-rise flex aspect-[4/5] flex-col items-center justify-center gap-2 rounded-[24px] border border-dashed border-white/15 text-[var(--fc-muted)]"
          style={rise(0.2)}
        >
          <Plus size={26} strokeWidth={1.4} />
          <span className="text-[13px] font-medium">Scan a piece</span>
        </button>
        {items.map((item, i) => (
          <Card
            key={item.id}
            className="fc-a-rise overflow-hidden"
            style={rise(0.24 + Math.min(i, 8) * 0.04)}
          >
            <div className="relative aspect-square">
              {item.photo ? (
                <img src={item.photo} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <div
                  className="h-full w-full"
                  style={{
                    background: `radial-gradient(120% 90% at 30% 20%, color-mix(in oklab, ${item.color}, white 22%), ${item.color} 60%)`,
                  }}
                />
              )}
              {item.waterproof && (
                <span className="fc-glass absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full">
                  <Droplets size={13} />
                </span>
              )}
            </div>
            <div className="px-3 py-2.5">
              <p className="truncate text-[13px] font-medium">{item.name}</p>
              <p className="text-[11px] text-[var(--fc-muted)]">
                {CATEGORY_LABEL[item.category]} · worn {item.wears}×
              </p>
            </div>
          </Card>
        ))}
      </div>

      {draft && (
        <div className="absolute inset-0 z-40 flex items-end bg-black/50 backdrop-blur-sm">
          <div className="fc-a-rise w-full rounded-t-[32px] bg-[#171413] p-5 pb-28">
            <div className="flex items-center justify-between">
              <p className="text-[17px] font-medium">New piece</p>
              <GlassCircle
                aria-label="Cancel"
                onClick={() => setDraft(null)}
                className="!h-9 !w-11"
              >
                <X size={16} />
              </GlassCircle>
            </div>
            <div className="mt-4 flex gap-4">
              <Swatch color="#333" photo={draft.photo} size={96} />
              <div className="flex-1 text-[13px] text-[var(--fc-muted)]">
                {draft.tagging ? (
                  <p className="flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" /> Cutting out background & tagging…
                  </p>
                ) : (
                  <p className="flex items-center gap-2 text-[var(--fc-text)]">
                    <Check size={14} className="text-[var(--fc-accent)]" /> Confirm the tags
                  </p>
                )}
                <input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className="fc-glass mt-3 w-full rounded-[14px] bg-transparent px-3 py-2 text-[14px] text-[var(--fc-text)] outline-none"
                  aria-label="Piece name"
                />
              </div>
            </div>
            <p className="mb-2 mt-4 text-[12px] text-[var(--fc-muted)]">Type</p>
            <div className="fc-scroll flex gap-2 overflow-x-auto">
              {CATS.map((c) => (
                <Chip
                  key={c}
                  active={draft.category === c}
                  onClick={() => setDraft({ ...draft, category: c })}
                >
                  {CATEGORY_LABEL[c]}
                </Chip>
              ))}
            </div>
            <p className="mb-2 mt-4 text-[12px] text-[var(--fc-muted)]">Vibes</p>
            <div className="flex flex-wrap gap-2">
              {VIBES.map((v) => (
                <Chip
                  key={v.id}
                  active={draft.vibes.includes(v.id)}
                  onClick={() =>
                    setDraft({
                      ...draft,
                      vibes: draft.vibes.includes(v.id)
                        ? draft.vibes.filter((x) => x !== v.id)
                        : [...draft.vibes, v.id],
                    })
                  }
                >
                  {v.label}
                </Chip>
              ))}
            </div>
            <button
              type="button"
              disabled={draft.tagging}
              onClick={save}
              className="mt-5 h-[50px] w-full rounded-[25px] bg-[var(--fc-text)] text-[15px] font-semibold text-black disabled:opacity-40"
            >
              Add to closet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
