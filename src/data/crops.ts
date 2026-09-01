import { allProducts } from "./products";

export type CropGuide = {
  id: string;
  name: string;
  emoji: string;
  threats: string[];
  /** product slugs from src/data/products.ts */
  recommended: string[];
};

export const crops: CropGuide[] = [
  {
    id: "tomato",
    name: "Tomato",
    emoji: "🍅",
    threats: ["Late blight", "Early blight", "Leafminer (Tuta absoluta)", "Whitefly"],
    recommended: ["lavida-73wdg", "vidalia-69wp", "em-actin-57sc", "headlines-700wp"],
  },
  {
    id: "maize",
    name: "Maize",
    emoji: "🌽",
    threats: ["Fall armyworm", "Stem borers", "Rust"],
    recommended: ["blazer-221zc", "em-actin-57sc", "morgro"],
  },
  {
    id: "coffee",
    name: "Coffee",
    emoji: "☕",
    threats: ["Coffee leaf rust", "Antestia bug"],
    recommended: ["x-spore-43sc", "robust-48ec", "pronto"],
  },
  {
    id: "wheat",
    name: "Wheat",
    emoji: "🌾",
    threats: ["Stem rust", "Stripe rust", "Yellow leafspot", "Aphids"],
    recommended: ["x-spore-43sc", "alpha-cymba-10ec", "blossom-ec"],
  },
  {
    id: "potato",
    name: "Potato",
    emoji: "🥔",
    threats: ["Late blight", "Early blight", "Cutworms"],
    recommended: ["samurai-72wp", "penncozeb-80-wp", "halothrin-2-5ec"],
  },
  {
    id: "kale",
    name: "Kale",
    emoji: "🥬",
    threats: ["Diamond back moth", "Aphids", "Leafspot"],
    recommended: ["halothrin-2-5ec", "mosthane", "velji"],
  },
  {
    id: "french-bean",
    name: "French Bean",
    emoji: "🫛",
    threats: ["Rust", "Anthracnose", "Leafspot", "Thrips"],
    recommended: ["esteem-50wdg", "x-spore-43sc", "rajput-40ec"],
  },
  {
    id: "onion",
    name: "Onion",
    emoji: "🧅",
    threats: ["Downy mildew", "Purple blotch", "Rust", "Thrips"],
    recommended: ["efosite-80wp", "x-spore-43sc", "chordata-10-2ec"],
  },
  {
    id: "rose",
    name: "Rose / Flowers",
    emoji: "🌹",
    threats: ["Powdery mildew", "Botrytis", "Downy mildew", "Spidermites"],
    recommended: ["headlines-700wp", "esteem-50wdg", "vagan-50sc"],
  },
];

export const productBySlug = (slug: string) => allProducts.find((p) => p.slug === slug);

export const cropProducts = (crop: CropGuide) =>
  crop.recommended.map(productBySlug).filter((p): p is NonNullable<typeof p> => Boolean(p));
