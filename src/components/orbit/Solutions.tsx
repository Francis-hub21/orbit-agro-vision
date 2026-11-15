import { Shield, Sprout, FlaskConical, Bug, Leaf, Droplets, HeartPulse, SprayCan, Download, ChevronDown, Mail, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal, SectionHeader } from "./Reveal";
import { ContactModal } from "./ContactModal";
import { families, type Family, type Product } from "@/data/products";
import imgFung from "@/assets/orbit/categories/fungicides.png.asset.json";
import imgInsect from "@/assets/orbit/categories/insecticides.png.asset.json";
import imgBio from "@/assets/orbit/categories/biostimulants.png.asset.json";
import imgHerb from "@/assets/orbit/categories/herbicides.png.asset.json";
import imgFert from "@/assets/orbit/categories/fertilizers.png.asset.json";
import imgSoil from "@/assets/orbit/categories/soil-conditioners.png.asset.json";
import imgPub from "@/assets/orbit/categories/public-health.png.asset.json";
import imgSpray from "@/assets/orbit/categories/knapsack-sprayers.png.asset.json";

const CATALOGUE_URL = "https://www.orbitagro.co.ke/assets/orbit-agro-product-catalogue_web.pdf";

const meta: Record<string, { icon: typeof Bug; image: { url: string } }> = {
  fungicides: { icon: Shield, image: imgFung },
  insecticides: { icon: Bug, image: imgInsect },
  "bio-stimulants": { icon: Sprout, image: imgBio },
  herbicides: { icon: Leaf, image: imgHerb },
  fertilizers: { icon: Droplets, image: imgFert },
  "soil-conditioners": { icon: FlaskConical, image: imgSoil },
  "public-health": { icon: HeartPulse, image: imgPub },
  "knapsack-sprayers": { icon: SprayCan, image: imgSpray },
};

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="border-t border-border pt-2.5">
      <div className="text-[10px] tracking-[0.25em] uppercase text-primary mb-1">{label}</div>
      <div className="text-sm text-foreground/90 leading-relaxed">{value}</div>
    </div>
  );
}

function Chips({ label, items }: { label: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="border-t border-border pt-2.5">
      <div className="text-[10px] tracking-[0.25em] uppercase text-primary mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((t) => (
          <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-foreground/90">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ p, onContact }: { p: Product; onContact: (n: string) => void }) {
  return (
    <div className="glass rounded-2xl overflow-hidden flex flex-col">
      {p.image && (
        <div className="aspect-[4/3] bg-primary/5 overflow-hidden">
          <img src={p.image} alt={`${p.name} pack`} loading="lazy" className="w-full h-full object-contain p-3" />
        </div>
      )}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h5 className="font-display text-xl">{p.name}</h5>
        {p.description && <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>}
        <Row label="Active Ingredient" value={p.activeIngredient} />
        <Row label="Classification" value={p.classification} />
        <Chips label="Target Disease / Pest" items={p.targets} />
        <Row label="Pre-Harvest Interval" value={p.preHarvest} />
        <Row label="Application Rates" value={p.applicationRate} />
        <Row label="Mode of Action" value={p.modeOfAction} />
        <Chips label="Benefits" items={p.benefits} />
        <button
          onClick={() => onContact(p.name)}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground hover:shadow-[0_0_30px_oklch(0.72_0.20_150/0.6)] transition-all"
        >
          <Mail className="h-3.5 w-3.5" /> Contact Us
        </button>
      </div>
    </div>
  );
}

function FamilyPanel({ family, onContact }: { family: Family; onContact: (n: string) => void }) {
  const m = meta[family.slug];
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? family.products : family.products.slice(0, 2);
  const hidden = family.products.length - visible.length;
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="glass rounded-2xl p-6 md:p-8 mt-5">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-1">Product Family</div>
            <h4 className="font-display text-2xl md:text-3xl">{family.title}</h4>
            <p className="text-muted-foreground mt-2 max-w-2xl">{family.intro}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/products/$family"
              params={{ family: family.slug }}
              search={{ from: "solutions" }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs uppercase tracking-[0.15em] text-primary-foreground"
            >
              Full {family.title} page <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={CATALOGUE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.15em] text-primary hover:bg-primary/10 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Full Catalogue
            </a>
          </div>
        </div>
        {m && (
          <div className="rounded-xl overflow-hidden mb-6 aspect-[16/7] sm:aspect-[21/7] bg-white/90">
            <img src={m.image.url} alt={family.title} loading="lazy" className="w-full h-full object-contain p-3" />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((p) => (
            <ProductCard key={p.slug} p={p} onContact={onContact} />
          ))}
        </div>
        {hidden > 0 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-xs uppercase tracking-[0.15em] text-primary hover:bg-primary/10 transition-colors"
          >
            Show {hidden} more {family.title.toLowerCase()} <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
        {showAll && family.products.length > 2 && (
          <button
            onClick={() => setShowAll(false)}
            className="mt-6 ml-3 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-xs uppercase tracking-[0.15em] hover:border-primary/60 transition-colors"
          >
            Show fewer
          </button>
        )}
      </div>
    </motion.div>
  );
}

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function Solutions() {
  const [open, setOpen] = useState<string | null>(null);
  const [requested, setRequested] = useState<string | null>(null);
  const rows = chunk(families, 4);

  return (
    <section id="solutions" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Our Products"
          title={<>Superior quality <span className="text-gradient-emerald">crop protection</span> for the Kenyan farmer.</>}
          desc="Eight product lines specially formulated to help farmers enjoy high yields with very minimal investment."
        />

        {rows.map((row, r) => {
          const openInRow = row.find((f) => f.slug === open);
          return (
            <div key={r} className="mb-5">
              <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-40 w-40 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.20_150/0.35),transparent_70%)] blur-2xl"
                  />
                </div>
                {row.map((f, i) => {
                  const angle = ((r * 4 + i) / families.length) * Math.PI * 2;
                  const radius = 180;
                  const Icon = meta[f.slug]?.icon ?? Bug;
                  const isOpen = open === f.slug;
                  return (
                    <motion.div
                      key={f.slug}
                      initial={{ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, opacity: 0, scale: 0.55, rotate: -25 }}
                      whileInView={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 1.1, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.button
                        onClick={() => setOpen(isOpen ? null : f.slug)}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className={`group relative w-full text-left h-full glass rounded-2xl overflow-hidden cursor-pointer ${isOpen ? "ring-1 ring-primary/60 shadow-[0_0_30px_oklch(0.72_0.20_150/0.25)]" : ""}`}
                      >
                        <div className="aspect-[4/3] overflow-hidden relative bg-white/90">
                          <img
                            src={meta[f.slug]?.image?.url}
                            alt={f.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                          <div className="absolute top-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-xl glass-emerald">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-display text-xl mb-2 flex items-center gap-2">
                            {f.title}
                            <ChevronDown className={`h-4 w-4 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{f.tagline}</p>
                          <div className="mt-3 text-xs text-primary/90">
                            {f.products.length} product{f.products.length > 1 ? "s" : ""} →
                          </div>
                        </div>
                      </motion.button>
                      <div className="md:hidden">
                        <AnimatePresence initial={false}>
                          {isOpen && <FamilyPanel key={f.slug} family={f} onContact={setRequested} />}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="hidden md:block">
                <AnimatePresence initial={false} mode="wait">
                  {openInRow && <FamilyPanel key={openInRow.slug} family={openInRow} onContact={setRequested} />}
                </AnimatePresence>
              </div>
            </div>
          );
        })}

        <Reveal>
          <div className="mt-10 glass rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2">Product Catalogue</div>
              <h4 className="font-display text-2xl md:text-3xl mb-2">Experience TOTAL satisfaction with us.</h4>
              <p className="text-muted-foreground max-w-xl">
                Download our complete product catalogue — every formulation, target pest, application rate and crop, in one PDF.
              </p>
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

      <ContactModal open={!!requested} onClose={() => setRequested(null)} productName={requested ?? undefined} />
    </section>
  );
}
