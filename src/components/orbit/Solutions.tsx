import { Shield, Sprout, FlaskConical, Bug, Leaf, Droplets, HeartPulse, SprayCan, Download, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Reveal, SectionHeader } from "./Reveal";

type Product = {
  name?: string;
  activeIngredient?: string;
  classification?: string;
  description: string;
  targets?: string[];
  applicationRate?: string;
  modeOfAction?: string;
  preHarvest?: string;
  benefits?: string[];
};

type Category = {
  icon: typeof Bug;
  title: string;
  tagline: string;
  products: Product[];
};

const categories: Category[] = [
  {
    icon: Shield,
    title: "Fungicides",
    tagline: "Broad-spectrum protection against blights, rusts and mildews.",
    products: [
      {
        activeIngredient: "Mancozeb 800g/Kg",
        classification: "Dithiocarbamate",
        description: "High quality preventive fungicide with broad spectrum for the control of fungal diseases in vegetables, field crops, fruits and flowers/ornamentals.",
        targets: ["Late blight", "Early blight", "Anthracnose", "Powdery mildew", "Leafspot", "Damping off"],
        applicationRate: "50g / 20L  ·  2 kg / Ha",
        preHarvest: "7 days in vegetables",
        modeOfAction: "Contact fungicide with protective action — applied prior to disease set, with non-specific thiol reactant inhibiting respiration.",
        benefits: ["Broad spectrum fungicide", "No known resistance", "High level of control before disease pressure"],
      },
      {
        activeIngredient: "Sulphur 800g/Kg",
        classification: "Multi-site inorganic",
        description: "A premium sulphur fungicide and miticide with preventative action — a micronized wettable formulation specifically designed to provide superior disease and mite control.",
        targets: ["Powdery mildew", "Rusts", "Mites", "Scab"],
        applicationRate: "As per label recommendation",
      },
    ],
  },
  {
    icon: Bug,
    title: "Insecticides",
    tagline: "Targeted insect control at every growth stage.",
    products: [
      {
        activeIngredient: "Alpha-Cypermethrin 100g/L",
        classification: "Pyrethroid",
        description: "A broad spectrum, low dose acting insecticide with rapid knock-down action and high mortality.",
        targets: ["Aphids", "Cutworms", "Thrips", "Whiteflies", "Caterpillars", "Borers", "Leaf miners"],
        applicationRate: "5 ml / 20L  ·  250 ml / Ha",
        preHarvest: "1–3 days in vegetables",
        modeOfAction: "Non-systemic insecticide with contact and stomach action. Acts on the central and peripheral nervous system in very low doses.",
        benefits: ["Suitable for IPM programs", "Compatible with most fungicides and fertilizers", "Fast acting with knock-down effect", "Low product residues on crops"],
      },
      {
        activeIngredient: "Lambda-Cyhalothrin 25g/L",
        classification: "Pyrethroid",
        description: "A fast and rapid knock-down insecticide with long residual activity and short pre-harvest interval.",
        targets: ["Aphids", "Thrips", "Whiteflies", "Caterpillars", "Bollworms"],
        applicationRate: "10–20 ml / 20L",
      },
    ],
  },
  {
    icon: FlaskConical,
    title: "Bio Stimulants",
    tagline: "Bio-active compounds that unlock yield potential and stress resilience.",
    products: [
      {
        name: "Blossom",
        description: "A unique combination of 2.2% W/W aromatic Nitrogen + proteins + vitamins. A highly effective Plant Growth Promoter that increases reproductive and vegetative buds, improves canopy, induces profuse flowering, promotes high conversion of flowers to fruits and reduces flower and fruit drop.",
        applicationRate: "2–3 L / Ha  ·  2–3 ml / L of water",
        benefits: [
          "Enhances vegetative growth",
          "Increases nutrient uptake and use efficiency",
          "Induces profuse flowering",
          "Reduces flower and fruit shedding",
          "Increases total harvestable yield",
          "Foliar use on all major agricultural crops",
          "Compatible with pesticides",
        ],
      },
      {
        name: "Pronto",
        description: "Amino acid biostimulant that combines a nutritional complement with a complex of amino acids — enabling cell formation and enhancing metabolism in plants. Pronto revitalizes stressed plants, maintains and improves pesticide efficacy, and supports growth, flowering and yield.",
        applicationRate: "2 L / Ha  ·  20 ml / 20L of water",
      },
    ],
  },
  {
    icon: Leaf,
    title: "Herbicides",
    tagline: "Selective and non-selective weed control engineered for minimum crop stress.",
    products: [
      {
        name: "Glyweed",
        activeIngredient: "Glyphosate 360g/L",
        classification: "Glycine derivative",
        description: "A systemic, non-selective herbicide for the control of grasses, sedges and broad-leaved weeds. Depending on the crop, Glyweed can be used as pre-plant or post-plant. An important tool in zero-tillage farming.",
        applicationRate: "135 ml / 20L",
        modeOfAction: "Rapidly absorbed through foliage and green stems, then translocated to roots, stolons, tubers and rhizomes. Inhibits biosynthesis of essential amino acids needed for protein synthesis.",
        benefits: ["Inactivated on contact with soil", "Rapid translocation to roots, rhizomes, tubers and stolons", "Broad spectrum activity"],
      },
      {
        activeIngredient: "Glyphosate 410g/L",
        description: "A non-selective systemic post-emergence herbicide for the control of weeds in non-cropped areas.",
        applicationRate: "2 L / Ha  ·  200 ml / 20L",
      },
    ],
  },
  {
    icon: Sprout,
    title: "Fertilizers",
    tagline: "Foliar and soil nutrient blends tuned to Kenyan soils and growth stages.",
    products: [
      {
        name: "Morgro Multipurpose",
        description: "A liquid foliar fertilizer and plant booster, rapidly absorbed through the leaves to deliver essential nutrients. Provides trace elements, macro-nutrients and amino acids that improve general plant condition.",
        targets: ["Vegetables", "Flowers", "Coffee", "Fruit trees", "Pineapples", "Potatoes", "Maize", "Cereals"],
        applicationRate: "Vegetables 50 ml/20L · Cereals 50 ml/20L · Fruit trees 80 ml/20L",
        modeOfAction: "Improves the suspendability of spray liquids; reduces transplant shock, improves root and stem development, and gives produce a more appealing appearance.",
        benefits: ["Balanced foliar nutrition", "Quick crop response under stress", "Readily absorbed by leaf, shoot, stem and root tissue", "Multi-crop use"],
      },
      {
        name: "Iron Chelate",
        description: "Iron chelate that can be used as a foliar feed and in all types of fertigation systems. Compatible with the majority of pesticide products.",
      },
    ],
  },
  {
    icon: Droplets,
    title: "Soil Conditioners",
    tagline: "Restorative formulations that rebuild soil structure, pH and microbial life.",
    products: [
      {
        description: "Bio-organic humic granules that mix and blend well with fertilizer or manure for a rich humic-based soil.",
        targets: ["Horticulture crops", "Cereals", "Field crops", "Lawns", "Flowers", "Kitchen gardens"],
        applicationRate: "Fertilizer blend 1–2 kg per 50 kg bag of D.A.P, T.S.P, M.A.P, C.A.N etc",
        benefits: [
          "Reduces toxicity by buffering excessive elements in soil",
          "Reduces nutrient lock-up",
          "Promotes root development",
          "Improves soil structure",
        ],
      },
    ],
  },
  {
    icon: HeartPulse,
    title: "Public Health",
    tagline: "Vector and pest control for homes, institutions and public spaces.",
    products: [
      {
        activeIngredient: "Fipronil 3% w/v",
        description: "Public health insecticide for the control of flying and crawling household insects — cockroaches, bedbugs, house flies and ants.",
        applicationRate: "50 ml per 1 L of water",
      },
      {
        activeIngredient: "Fipronil 5% w/v",
        description: "Broad spectrum insecticide and termiticide for the control of termites in agroforestry.",
        targets: ["Termites", "Thrips"],
        applicationRate: "50 ml / 20L  ·  75 ml / 30L  ·  2.5 L per 1000 L / Ha",
        benefits: ["Agroforestry", "Building and construction", "Roses", "Carnation"],
      },
    ],
  },
  {
    icon: SprayCan,
    title: "Knapsack Sprayers",
    tagline: "Durable, precision-engineered sprayers for accurate field application.",
    products: [
      {
        description: "A premium, powerful and high-pressure pump with a fully internal pump mechanism that keeps the spray solution off the operator. Built to withstand day-to-day farm operations.",
        benefits: [
          "High pressure piston pump",
          "Lightweight with trigger on the handle",
          "Left/right hand operation",
          "Easy-to-adjust carrying strap",
          "Internal mechanical agitator for constant mixing",
          "Ergonomic design — comfort and reduced back strain",
          "High-density polyethylene UV-resistant tank",
        ],
      },
    ],
  },
];

const CATALOGUE_URL = "https://www.orbitagro.co.ke/assets/orbit-agro-product-catalogue_web.pdf";

function ProductCard({ p }: { p: Product }) {
  return (
    <div className="rounded-xl border border-border bg-background/30 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <div className="font-display text-lg">
          {p.name || p.activeIngredient}
        </div>
        {p.classification && (
          <span className="text-[10px] tracking-[0.25em] uppercase text-primary/80 border border-primary/30 rounded-full px-2 py-0.5">
            {p.classification}
          </span>
        )}
      </div>
      {p.activeIngredient && p.name && (
        <div className="text-xs text-muted-foreground mb-2">
          <span className="text-primary/80">Active:</span> {p.activeIngredient}
        </div>
      )}
      <p className="text-sm text-foreground/85 leading-relaxed">{p.description}</p>

      <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
        {p.targets && (
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-primary mb-2">Targets</div>
            <div className="flex flex-wrap gap-1.5">
              {p.targets.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-foreground/90 border border-primary/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
        {p.applicationRate && (
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-primary mb-2">Application Rate</div>
            <div className="text-foreground/90">{p.applicationRate}</div>
            {p.preHarvest && (
              <div className="text-xs text-muted-foreground mt-1">Pre-harvest: {p.preHarvest}</div>
            )}
          </div>
        )}
      </div>

      {p.modeOfAction && (
        <div className="mt-4">
          <div className="text-[10px] tracking-[0.25em] uppercase text-primary mb-1">Mode of Action</div>
          <p className="text-sm text-muted-foreground leading-relaxed">{p.modeOfAction}</p>
        </div>
      )}

      {p.benefits && (
        <div className="mt-4">
          <div className="text-[10px] tracking-[0.25em] uppercase text-primary mb-2">Benefits</div>
          <ul className="grid sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm text-foreground/85">
            {p.benefits.map((b) => (
              <li key={b} className="flex gap-2"><span className="text-primary mt-1">•</span>{b}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Solutions() {
  const [open, setOpen] = useState<string | null>("Fungicides");

  return (
    <section id="solutions" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Our Products"
          title={<>Superior quality <span className="text-gradient-emerald">crop protection</span> for the Kenyan farmer.</>}
          desc="Eight product lines specially formulated to help farmers enjoy high yields with very minimal investment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {categories.map((c, i) => {
            const isOpen = open === c.title;
            return (
              <Reveal key={c.title} delay={i * 0.05}>
                <motion.button
                  onClick={() => setOpen(isOpen ? null : c.title)}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative w-full text-left h-full glass rounded-2xl p-7 overflow-hidden cursor-pointer ${isOpen ? "ring-1 ring-primary/60 shadow-[0_0_30px_oklch(0.72_0.20_150/0.25)]" : ""}`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                  <div className="relative">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl glass-emerald">
                      <c.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display text-xl mb-2 flex items-center gap-2">
                      {c.title}
                      <ChevronDown className={`h-4 w-4 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.tagline}</p>
                    <div className="mt-3 text-xs text-primary/80">{c.products.length} product{c.products.length > 1 ? "s" : ""} →</div>
                  </div>
                </motion.button>
              </Reveal>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key={open}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-6 md:p-8 mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-1">Category Details</div>
                  <h4 className="font-display text-2xl">{open}</h4>
                </div>
                <a
                  href={CATALOGUE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.15em] text-primary hover:bg-primary/10 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" /> Full Catalogue
                </a>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                {categories.find((c) => c.title === open)!.products.map((p, idx) => (
                  <ProductCard key={idx} p={p} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Reveal>
          <div className="glass rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2">Product Catalogue</div>
              <h4 className="font-display text-2xl md:text-3xl mb-2">Experience TOTAL satisfaction with us.</h4>
              <p className="text-muted-foreground max-w-xl">Download our complete product catalogue — every formulation, target pest, application rate and crop, in one PDF.</p>
            </div>
            <a
              href={CATALOGUE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-[0_0_24px_oklch(0.72_0.20_150/0.5)] hover:shadow-[0_0_40px_oklch(0.72_0.20_150/0.7)] transition-all"
            >
              <Download className="h-4 w-4" /> Download Catalogue
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
