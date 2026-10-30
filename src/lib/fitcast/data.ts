// Seed data for the FITCAST prototype. In production these come from the user's
// scanned closet (Supabase `closet_items`) and generated try-on renders.

const higgs = (host: string, file: string, w = 1280) =>
  `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(
    `https://${host}/user_38xzZboKViGWJOttwIXH07lWA1P/${file}`,
  )}&w=${w}&q=85`;

// Editorial fashion imagery from the MotionSites "Synth Mode", "Orla Fashion" and
// "Editorial Eyewear" prompts. Stand-ins for the user's own AI twin renders.
export const IMAGES = {
  base: higgs(
    "d8j0ntlcm91z4.cloudfront.net",
    "hf_20260802_074534_f0d9d476-3f86-4c67-9b12-dfc63d99da41.png",
    1920,
  ),
  reveal: higgs(
    "d8j0ntlcm91z4.cloudfront.net",
    "hf_20260802_075145_1b557479-775b-43af-8270-f45d79d97d5a.png",
    1920,
  ),
  orla: higgs(
    "d8j0ntlcm91z4.cloudfront.net",
    "hf_20260914_051133_318774e7-6f37-421b-8425-9c9150ea61e8.png",
  ),
  eyewear: higgs(
    "d8j0ntlcm91z4.cloudfront.net",
    "hf_20260725_062453_dc114dcf-5023-4772-b5ed-37e16147412a.png",
  ),
  synth: higgs("d2ol7oe51mr4n9.cloudfront.net", "755a0ca1-974c-431d-a45b-eab83067850d.png"),
};

export const FITCAST_FONTS =
  "https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";

export type Category = "outer" | "top" | "bottom" | "shoes" | "accessory";
export type Vibe = "clean" | "street" | "night" | "soft" | "work";

export type ClosetItem = {
  id: string;
  name: string;
  category: Category;
  color: string;
  /** 0 = summer-light, 3 = deep-winter */
  warmth: 0 | 1 | 2 | 3;
  waterproof?: boolean;
  vibes: Vibe[];
  wears: number;
  photo?: string;
};

export const CATEGORY_LABEL: Record<Category, string> = {
  outer: "Outerwear",
  top: "Tops",
  bottom: "Bottoms",
  shoes: "Shoes",
  accessory: "Extras",
};

export const VIBES: { id: Vibe; label: string }[] = [
  { id: "clean", label: "Clean" },
  { id: "street", label: "Street" },
  { id: "night", label: "Night out" },
  { id: "soft", label: "Soft" },
  { id: "work", label: "Work" },
];

export const CLOSET: ClosetItem[] = [
  {
    id: "c1",
    name: "Black wool overcoat",
    category: "outer",
    color: "#151515",
    warmth: 3,
    vibes: ["clean", "night", "work"],
    wears: 14,
  },
  {
    id: "c2",
    name: "Olive shell parka",
    category: "outer",
    color: "#4b5235",
    warmth: 2,
    waterproof: true,
    vibes: ["street", "soft"],
    wears: 9,
  },
  {
    id: "c3",
    name: "Cropped denim jacket",
    category: "outer",
    color: "#5b7290",
    warmth: 1,
    vibes: ["street", "soft"],
    wears: 21,
  },
  {
    id: "c4",
    name: "Stone trench",
    category: "outer",
    color: "#c7b79a",
    warmth: 2,
    waterproof: true,
    vibes: ["clean", "work"],
    wears: 6,
  },
  {
    id: "t1",
    name: "White heavyweight tee",
    category: "top",
    color: "#f4f2ee",
    warmth: 0,
    vibes: ["clean", "street", "soft"],
    wears: 32,
  },
  {
    id: "t2",
    name: "Charcoal merino knit",
    category: "top",
    color: "#3a3a3c",
    warmth: 2,
    vibes: ["clean", "work", "night"],
    wears: 11,
  },
  {
    id: "t3",
    name: "Grey marl hoodie",
    category: "top",
    color: "#9a9a9e",
    warmth: 2,
    vibes: ["street", "soft"],
    wears: 27,
  },
  {
    id: "t4",
    name: "Black silk shirt",
    category: "top",
    color: "#0f0f10",
    warmth: 1,
    vibes: ["night", "work"],
    wears: 4,
  },
  {
    id: "t5",
    name: "Oat linen shirt",
    category: "top",
    color: "#e3d8c3",
    warmth: 0,
    vibes: ["soft", "clean"],
    wears: 8,
  },
  {
    id: "b1",
    name: "Wide black trousers",
    category: "bottom",
    color: "#121212",
    warmth: 1,
    vibes: ["clean", "night", "work"],
    wears: 19,
  },
  {
    id: "b2",
    name: "Washed straight jeans",
    category: "bottom",
    color: "#6d7f98",
    warmth: 1,
    vibes: ["street", "soft"],
    wears: 30,
  },
  {
    id: "b3",
    name: "Cargo pants",
    category: "bottom",
    color: "#57553f",
    warmth: 2,
    vibes: ["street"],
    wears: 12,
  },
  {
    id: "b4",
    name: "Cream pleated trousers",
    category: "bottom",
    color: "#ece3d0",
    warmth: 1,
    vibes: ["soft", "work", "clean"],
    wears: 5,
  },
  {
    id: "s1",
    name: "White leather sneakers",
    category: "shoes",
    color: "#f6f6f4",
    warmth: 1,
    vibes: ["clean", "street", "soft"],
    wears: 40,
  },
  {
    id: "s2",
    name: "Black Chelsea boots",
    category: "shoes",
    color: "#131313",
    warmth: 2,
    waterproof: true,
    vibes: ["night", "work", "clean"],
    wears: 16,
  },
  {
    id: "s3",
    name: "Chunky trail runners",
    category: "shoes",
    color: "#7a7468",
    warmth: 2,
    waterproof: true,
    vibes: ["street"],
    wears: 10,
  },
  {
    id: "a1",
    name: "Silver chain",
    category: "accessory",
    color: "#c9c9cc",
    warmth: 0,
    vibes: ["night", "street"],
    wears: 18,
  },
  {
    id: "a2",
    name: "Black beanie",
    category: "accessory",
    color: "#1b1b1b",
    warmth: 3,
    vibes: ["street", "soft"],
    wears: 7,
  },
  {
    id: "a3",
    name: "Tortoise sunglasses",
    category: "accessory",
    color: "#5a3a22",
    warmth: 0,
    vibes: ["clean", "soft"],
    wears: 9,
  },
];

export type EditTemplate = {
  id: string;
  name: string;
  bpm: number;
  effects: ("punch" | "flash" | "shake" | "glide")[];
  captions: string[];
};

export const TEMPLATES: EditTemplate[] = [
  {
    id: "runway",
    name: "Runway Cut",
    bpm: 128,
    effects: ["punch", "flash", "punch", "shake"],
    captions: ["FIT CHECK", "TODAY'S DROP", "WEATHER: HANDLED", "OUT THE DOOR"],
  },
  {
    id: "flash",
    name: "Flash Drop",
    bpm: 140,
    effects: ["flash", "shake", "flash", "punch"],
    captions: ["3", "2", "1", "DRIP"],
  },
  {
    id: "glide",
    name: "Slow Glide",
    bpm: 88,
    effects: ["glide", "glide", "flash", "glide"],
    captions: ["soft hours", "layered", "unbothered", "main character"],
  },
];

export const RENDER_ENGINES = [
  { id: "omni", name: "Gemini Omni Flash", note: "Gemini API · ~$0.10/s · native audio" },
  { id: "kling", name: "Kling via fal", note: "image→video · strong fabric motion" },
  { id: "higgs", name: "Higgsfield", note: "camera-move presets · verify API" },
] as const;

// Background-removed model cut-outs in public/fitcast/models — stand-ins for the user's
// AI twin renders. Unsplash (free licence) plus three from the MotionSites Sur(face) and
// Maren prompts; sources in public/fitcast/models/CREDITS.md.
export const MODEL_NAMES = [
  "navy-suit",
  "plaid-coat",
  "pink-sweater",
  "blue-coat",
  "striped-trousers",
  "yellow-tracksuit",
  "camel-blazer",
  "chevron-boots",
  "lilac-tee",
  "grey-knit",
  "red-straps",
] as const;
export type ModelName = (typeof MODEL_NAMES)[number];

export const MODEL_SRC = Object.fromEntries(
  MODEL_NAMES.map((n) => [n, `/fitcast/models/${n}.webp`]),
) as Record<ModelName, string>;

export const VIBE_LOOKS: Record<Vibe, ModelName[]> = {
  clean: ["navy-suit", "camel-blazer", "blue-coat"],
  street: ["pink-sweater", "yellow-tracksuit", "lilac-tee", "grey-knit"],
  night: ["striped-trousers", "plaid-coat", "red-straps"],
  soft: ["chevron-boots", "blue-coat", "lilac-tee"],
  work: ["navy-suit", "plaid-coat", "camel-blazer"],
};
