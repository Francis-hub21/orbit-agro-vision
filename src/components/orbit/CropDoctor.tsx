import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Microscope, ShieldCheck, AlertTriangle, ArrowRight, CloudSun, Sprout } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal, SectionHeader } from "./Reveal";
import { ContactModal } from "./ContactModal";
import { crops, cropProducts } from "@/data/crops";
import type { Product } from "@/data/products";

const regions = ["Rift Valley", "Central", "Western", "Eastern", "Coast"] as const;
const stages = ["Seedling", "Vegetative", "Flowering", "Fruiting", "Harvest"] as const;

type Region = (typeof regions)[number];
type Stage = (typeof stages)[number];

const regionNotes: Record<Region, { climate: string; pressure: string; interval: string }> = {
  "Rift Valley": {
    climate: "Cool highland nights with heavy dew",
    pressure: "High fungal pressure — blights, rusts and mildews build fast",
    interval: "Spray every 7 days during cool, wet spells",
  },
  Central: {
    climate: "High-altitude, frequent mist and long wet seasons",
    pressure: "Very high disease pressure; moderate insect pressure",
    interval: "Spray every 7 days, tightening to 5 days in prolonged rain",
  },
  Western: {
    climate: "Warm and humid with bimodal rainfall",
    pressure: "High mixed pressure — leaf diseases plus caterpillars and borers",
    interval: "Spray every 7–10 days and rotate modes of action",
  },
  Eastern: {
    climate: "Hot, semi-arid with short rains",
    pressure: "Insect-dominated pressure — thrips, mites, armyworm",
    interval: "Spray every 10–14 days; scout weekly for insects",
  },
  Coast: {
    climate: "Hot and very humid year round",
    pressure: "Persistent fungal and sucking-pest pressure",
    interval: "Spray every 7 days; apply in the cool of the morning",
  },
};

const stageNotes: Record<Stage, { focus: string; strategy: "preventive" | "curative" | "short-phi" | "nutrition" }> = {
  Seedling: { focus: "Protect young tissue and roots — avoid harsh rates", strategy: "nutrition" },
  Vegetative: { focus: "Build a protective canopy shield before disease arrives", strategy: "preventive" },
  Flowering: { focus: "Protect flowers from botrytis, thrips and mites", strategy: "curative" },
  Fruiting: { focus: "Systemic, curative cover with residue awareness", strategy: "curative" },
  Harvest: { focus: "Only short pre-harvest interval products from here on", strategy: "short-phi" },
};

export function phiDays(preHarvest?: string): number | null {
  if (!preHarvest) return null;
  const m = preHarvest.match(/(\d+)(?:\s*(?:–|-)\s*(\d+))?\s*day/i);
  if (!m) return null;
  const low = parseInt(m[1], 10);
  const high = m[2] ? parseInt(m[2], 10) : low;
  return Math.round((low + high) / 2);
}

const text = (p: Product) =>
  `${p.classification ?? ""} ${p.modeOfAction ?? ""} ${p.description ?? ""}`.toLowerCase();

function scoreProduct(p: Product, stage: Stage, region: Region) {
  const t = text(p);
  const days = phiDays(p.preHarvest);
  let score = 0;
  const strategy = stageNotes[stage].strategy;

  if (strategy === "preventive" && /preventive|contact|protectant/.test(t)) score += 4;
  if (strategy === "curative" && /systemic|curative|translaminar/.test(t)) score += 4;
  if (strategy === "nutrition" && /stimulant|fertilizer|amino|humic|nutrient|conditioner/.test(t)) score += 4;
  if (strategy === "short-phi" && days !== null) score += Math.max(0, 6 - days);

  // Region weighting: fungal-pressure regions favour fungicides, dry regions favour insecticides.
  const fungalRegion = region === "Central" || region === "Rift Valley" || region === "Coast";
  if (fungalRegion && /fungicide|mildew|blight|rust|dithiocarbamate|triazole|strobilurin/.test(t)) score += 3;
  if (!fungalRegion && /insecticide|acaricide|pyrethroid|avermectin|neonicotinoid|mite|thrips/.test(t)) score += 3;

  if (days !== null && days <= 7) score += 1;
  return score;
}

export function CropDoctor() {
  const [crop, setCrop] = useState(crops[0]);
  const [region, setRegion] = useState<Region>(regions[0]);
  const [stage, setStage] = useState<Stage>(stages[2]);
  const [requested, setRequested] = useState<string | null>(null);

  const matches = useMemo(() => cropProducts(crop), [crop]);
  const ranked = useMemo(
    () => [...matches].sort((a, b) => scoreProduct(b, stage, region) - scoreProduct(a, stage, region)),
    [matches, stage, region],
  );
  const primary = ranked[0];
  const rNote = regionNotes[region];
  const sNote = stageNotes[stage];
  const primaryPhi = phiDays(primary?.preHarvest);

  return (
    <section id="crop-doctor" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Crop Doctor · Intelligence Engine"
          title={<>Diagnose. Match. <span className="text-gradient-emerald">Treat in seconds.</span></>}
          desc="Select your crop, region and growth stage — Crop Doctor weighs local disease pressure and crop stage, then matches real Orbit Agro formulations with the dosage and pre-harvest interval taken straight from each product label."
        />

        <Reveal>
          <div className="glass-emerald rounded-3xl p-6 md:p-10">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Filters */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Crop / Plant</div>
                  <div className="grid grid-cols-3 gap-2">
                    {crops.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCrop(c)}
                        className={`group relative rounded-xl p-3 border transition-all ${
                          crop.id === c.id
                            ? "border-primary bg-primary/15 shadow-[0_0_20px_oklch(0.72_0.20_150/0.4)]"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="text-2xl mb-1">{c.emoji}</div>
                        <div className="text-[10px] uppercase tracking-wider">{c.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Region</div>
                  <div className="flex flex-wrap gap-2">
                    {regions.map((r) => (
                      <button
                        key={r}
                        onClick={() => setRegion(r)}
                        className={`rounded-full px-4 py-1.5 text-xs border transition-all ${
                          region === r ? "border-primary bg-primary/15 text-primary" : "border-border hover:border-primary/50"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Growth Stage</div>
                  <div className="flex flex-wrap gap-2">
                    {stages.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStage(s)}
                        className={`rounded-full px-4 py-1.5 text-xs border transition-all ${
                          stage === s ? "border-primary bg-primary/15 text-primary" : "border-border hover:border-primary/50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${crop.id}-${region}-${stage}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45 }}
                    className="glass rounded-2xl p-6 md:p-8 h-full"
                  >
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 mb-6">
                      <div className="min-w-0">
                        <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2">Analysis Complete</div>
                        <h3 className="font-display text-2xl md:text-3xl">
                          {crop.name} <span className="text-muted-foreground">· {region} · {stage}</span>
                        </h3>
                      </div>
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse" />
                        <Microscope className="relative h-8 w-8 text-primary" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-border p-4">
                          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                            <CloudSun className="h-3 w-3 text-primary" /> {region} conditions
                          </div>
                          <div className="text-sm text-foreground/90">{rNote.climate}</div>
                          <div className="text-xs text-muted-foreground mt-2">{rNote.pressure}</div>
                          <div className="text-xs text-primary mt-2">{rNote.interval}</div>
                        </div>
                        <div className="rounded-xl border border-border p-4">
                          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                            <Sprout className="h-3 w-3 text-primary" /> {stage} stage focus
                          </div>
                          <div className="text-sm text-foreground/90">{sNote.focus}</div>
                          <div className="text-xs text-muted-foreground mt-2">
                            Programme bias: {sNote.strategy === "short-phi" ? "shortest safety interval" : sNote.strategy}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3 text-xs tracking-[0.2em] uppercase text-muted-foreground">
                          <AlertTriangle className="h-3 w-3" /> Common Threats
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {crop.threats.map((t) => (
                            <span key={t} className="rounded-full px-3 py-1 text-xs glass border-destructive/30 text-foreground/90">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {primary && (
                        <div className="rounded-xl bg-primary/10 border border-primary/30 p-5">
                          <div className="flex items-center gap-2 mb-3 text-xs tracking-[0.2em] uppercase text-primary">
                            <ShieldCheck className="h-3 w-3" /> Recommended Solution
                          </div>
                          <div className="grid grid-cols-[96px_minmax(0,1fr)] items-start gap-4">
                            <div className="aspect-square w-24 shrink-0 rounded-lg bg-background/40 overflow-hidden">
                              {primary.image ? (
                                <img
                                  src={primary.image}
                                  alt={`${primary.name} pack`}
                                  loading="lazy"
                                  className="h-full w-full object-contain p-1.5"
                                />
                              ) : null}
                            </div>
                            <div className="min-w-0">
                              <div className="font-display text-xl md:text-2xl">{primary.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">{primary.family}</div>
                              {primary.targets?.length ? (
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {primary.targets.slice(0, 4).map((t) => (
                                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-full border border-primary/25">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-primary/20">
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Dosage</div>
                              <div className="text-sm text-primary">{primary.applicationRate ?? "See label"}</div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Active Ingredient</div>
                              <div className="text-sm">{primary.activeIngredient ?? "—"}</div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Safety / PHI</div>
                              <div className="text-sm">
                                {primary.preHarvest ?? "Follow label directions"}
                                {stage === "Harvest" && primaryPhi !== null && (
                                  <span className="block text-[11px] text-primary mt-1">
                                    Harvest only after {primaryPhi} day{primaryPhi === 1 ? "" : "s"} from this spray.
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {ranked.length > 1 && (
                        <div>
                          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                            Also recommended for {crop.name} · {stage}
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {ranked.slice(1).map((m) => (
                              <Link
                                key={m.slug}
                                to="/products/$family"
                                params={{ family: m.familySlug }}
                                search={{ from: "crop-doctor" }}
                                className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-3 rounded-xl border border-border p-3 hover:border-primary/60 transition-colors"
                              >
                                <div className="aspect-square w-14 shrink-0 rounded-lg bg-primary/5 overflow-hidden">
                                  {m.image ? (
                                    <img
                                      src={m.image}
                                      alt={`${m.name} pack`}
                                      loading="lazy"
                                      className="h-full w-full object-contain p-1"
                                    />
                                  ) : null}
                                </div>
                                <div className="min-w-0">
                                  <div className="truncate text-sm">{m.name}</div>
                                  <div className="truncate text-[11px] text-muted-foreground">
                                    PHI: {m.preHarvest ?? "see label"}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => primary && setRequested(primary.name)}
                          className="flex-1 min-w-[200px] rounded-full bg-primary py-3.5 text-sm uppercase tracking-[0.2em] text-primary-foreground hover:shadow-[0_0_30px_oklch(0.72_0.20_150/0.7)] transition-all"
                        >
                          Request This Product
                        </button>
                        {primary && (
                          <Link
                            to="/products/$family"
                            params={{ family: primary.familySlug }}
                            search={{ from: "crop-doctor" }}
                            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-3.5 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10 transition-colors"
                          >
                            Full details <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <ContactModal open={!!requested} onClose={() => setRequested(null)} productName={requested ?? undefined} />
    </section>
  );
}
