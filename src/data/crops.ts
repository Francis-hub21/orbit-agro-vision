import { allProducts } from "./products";
import tomatoImg from "@/assets/orbit/crops/Tomato.png.asset.json";
import maizeImg from "@/assets/orbit/crops/Maize.png.asset.json";
import coffeeImg from "@/assets/orbit/crops/coffee.png.asset.json";
import wheatImg from "@/assets/orbit/crops/Wheat.png.asset.json";
import potatoImg from "@/assets/orbit/crops/Potato.png.asset.json";
import kaleImg from "@/assets/orbit/crops/kale.png.asset.json";
import frenchBeanImg from "@/assets/orbit/crops/french_bean.png.asset.json";
import onionImg from "@/assets/orbit/crops/Onion.png.asset.json";
import roseImg from "@/assets/orbit/crops/rose_flower.png.asset.json";

export type CropGuide = {
  id: string;
  name: string;
  emoji: string;
  /** photo of the crop itself */
  image: string;
  threats: string[];
  /** product slugs from src/data/products.ts */
  recommended: string[];
};

export const crops: CropGuide[] = [
  {
    id: "tomato",
    name: "Tomato",
    emoji: "🍅",
    image: tomatoImg.url,
    threats: ["Late blight", "Early blight", "Leafminer (Tuta absoluta)", "Whitefly"],
    recommended: ["lavida-73wdg", "em-actin-57sc", "chordata-120-ec"],
  },
  {
    id: "maize",
    name: "Maize",
    emoji: "🌽",
    image: maizeImg.url,
    threats: ["Fall armyworm", "Stem borers", "Rust"],
    recommended: ["blazer", "em-actin-57sc", "morgro"],
  },
  {
    id: "coffee",
    name: "Coffee",
    emoji: "☕",
    image: coffeeImg.url,
    threats: ["Coffee leaf rust", "Antestia bug"],
    recommended: ["samurai", "robust-48ec", "pronto"],
  },
  {
    id: "wheat",
    name: "Wheat",
    emoji: "🌾",
    image: wheatImg.url,
    threats: ["Stem rust", "Stripe rust", "Yellow leafspot", "Aphids"],
    recommended: ["samurai", "alpha-cymba-10ec", "blossom-ec"],
  },
  {
    id: "potato",
    name: "Potato",
    emoji: "🥔",
    image: potatoImg.url,
    threats: ["Late blight", "Early blight", "Cutworms"],
    recommended: ["samurai-72wp", "penncozeb-80-wp", "halothrin-2-5ec"],
  },
  {
    id: "kale",
    name: "Kale",
    emoji: "🥬",
    image: kaleImg.url,
    threats: ["Diamond back moth", "Aphids", "Leafspot"],
    recommended: ["halothrin-2-5ec", "mosthane", "pronto"],
  },
  {
    id: "french-bean",
    name: "French Bean",
    emoji: "🫛",
    image: frenchBeanImg.url,
    threats: ["Rust", "Anthracnose", "Leafspot", "Thrips"],
    recommended: ["lavida-73wdg", "rajput-40ec"],
  },
  {
    id: "onion",
    name: "Onion",
    emoji: "🧅",
    image: onionImg.url,
    threats: ["Downy mildew", "Purple blotch", "Rust", "Thrips"],
    recommended: ["efosite", "chordata-120-ec"],
  },
  {
    id: "rose",
    name: "Rose / Flowers",
    emoji: "🌹",
    image: roseImg.url,
    threats: ["Powdery mildew", "Botrytis", "Downy mildew", "Spidermites"],
    recommended: ["lavida-73wdg", "vagan-50sc"],
  },
];

export const productBySlug = (slug: string) => allProducts.find((p) => p.slug === slug);

export const cropProducts = (crop: CropGuide) =>
  crop.recommended.map(productBySlug).filter((p): p is NonNullable<typeof p> => Boolean(p));
