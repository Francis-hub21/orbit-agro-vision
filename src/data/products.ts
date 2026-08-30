export type Product = {
  slug: string;
  name: string;
  activeIngredient?: string;
  classification?: string;
  description?: string;
  targets?: string[];
  preHarvest?: string;
  applicationRate?: string;
  modeOfAction?: string;
  benefits?: string[];
  image?: string;
};

export type Family = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  products: Product[];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const p = (name: string, rest: Omit<Product, "slug" | "name"> = {}): Product => ({
  slug: slugify(name),
  name,
  ...rest,
});

export const families: Family[] = [
  {
    slug: "fungicides",
    title: "Fungicides",
    tagline: "Broad-spectrum protection against blights, rusts, mildews and leaf spots.",
    intro:
      "Preventive and systemic fungicides formulated for vegetables, field crops, fruits and flowers — engineered to stop disease before it takes hold.",
    products: [
      p("Penncozeb 80% WP"),
      p("Devisulphur 80WP"),
      p("Mosthane"),
      p("Zyban 500SC"),
      p("Sherrif 75WP"),
      p("Lavida 73WDG"),
      p("Samurai 72WP"),
      p("Vidalia 69WP"),
      p("X-Spore 43SC"),
      p("Headlines 700WP"),
      p("Esteem 50WDG"),
      p("Efosite 80WP"),
    ],
  },
  {
    slug: "insecticides",
    title: "Insecticides",
    tagline: "Targeted insect control at every crop growth stage.",
    intro:
      "Fast knock-down and long-residual insecticides for aphids, thrips, whiteflies, caterpillars, bollworms, borers and mites.",
    products: [
      p("Alpha Cymba 10EC"),
      p("Halothrin 2.5EC"),
      p("Robust 48EC"),
      p("Rajput 40EC"),
      p("Chordata 10.2EC"),
      p("Em-actin 57SC"),
      p("Blazer 221ZC"),
    ],
  },
  {
    slug: "public-health",
    title: "Public Health",
    tagline: "Vector and pest control for homes, institutions and public spaces.",
    intro: "Household and institutional insect control for crawling and flying pests.",
    products: [p("Expel"), p("Vagan 50SC")],
  },
  {
    slug: "bio-stimulants",
    title: "Bio Stimulants",
    tagline: "Bio-active compounds that unlock yield potential and stress resilience.",
    intro: "Plant growth promoters and amino-acid based biostimulants for flowering, fruit set and stress recovery.",
    products: [p("Blossom EC"), p("Pronto")],
  },
  {
    slug: "herbicides",
    title: "Herbicides",
    tagline: "Non-selective weed control engineered for minimum crop stress.",
    intro: "Systemic post-emergence herbicides for grasses, sedges and broad-leaved weeds.",
    products: [p("Glyweed 41SL"), p("Eradika 41SL")],
  },
  {
    slug: "fertilizers",
    title: "Fertilizers",
    tagline: "Foliar and soluble nutrient blends tuned to Kenyan soils and growth stages.",
    intro: "Water-soluble and foliar fertilizers delivering macro-nutrients, trace elements and amino acids.",
    products: [p("Morgro"), p("Wopro-Fert"), p("Velji")],
  },
  {
    slug: "soil-conditioners",
    title: "Soil Conditioners",
    tagline: "Restorative formulations that rebuild soil structure and biology.",
    intro: "Humic and fulvic acid based conditioners that improve nutrient availability and root development.",
    products: [p("Humigold")],
  },
  {
    slug: "knapsack-sprayers",
    title: "Knapsack Sprayers",
    tagline: "Durable, precision-engineered sprayers for accurate field application.",
    intro: "High-pressure knapsack sprayers built for day-to-day farm operations.",
    products: [p("Orbit Knapsack Sprayer")],
  },
];

export const getFamily = (slug: string) => families.find((f) => f.slug === slug);

export const allProducts = families.flatMap((f) =>
  f.products.map((prod) => ({ ...prod, family: f.title, familySlug: f.slug })),
);
