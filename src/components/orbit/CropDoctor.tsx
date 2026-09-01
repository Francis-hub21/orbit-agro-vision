import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Microscope, ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal, SectionHeader } from "./Reveal";
import { ContactModal } from "./ContactModal";
import { crops, cropProducts } from "@/data/crops";

const regions = ["Rift Valley", "Central", "Western", "Eastern", "Coast"];
const stages = ["Seedling", "Vegetative", "Flowering", "Fruiting", "Harvest"];

export function CropDoctor() {
  const [crop, setCrop] = useState(crops[0]);
  const [region, setRegion] = useState(regions[0]);
  const [stage, setStage] = useState(stages[2]);
  const [requested, setRequested] = useState<string | null>(null);

  const matches = useMemo(() => cropProducts(crop), [crop]);
  const primary = matches[0];

  return (
    <section id="crop-doctor" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Crop Doctor · Intelligence Engine"
          title={<>Diagnose. Match. <span className="text-gradient-emerald">Treat in seconds.</span></>}
          desc="Select your crop, region and growth stage — Crop Doctor matches it to real Orbit Agro formulations with verified dosage and safety guidance drawn from the product catalogue."
        />

        <Reveal>
          <div className="glass-emerald rounded-3xl p-6 md:p-10">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Filters */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Crop</div>
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
                    key={crop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="glass rounded-2xl p-6 md:p-8 h-full"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2">Analysis Complete</div>
                        <h3 className="font-display text-3xl">
                          {crop.name} <span className="text-muted-foreground">· {region} · {stage}</span>
                        </h3>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse" />
                        <Microscope className="relative h-8 w-8 text-primary" />
                      </div>
                    </div>

                    <div className="space-y-4">
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
                          <div className="flex items-center gap-2 mb-2 text-xs tracking-[0.2em] uppercase text-primary">
                            <ShieldCheck className="h-3 w-3" /> Recommended Solution
                          </div>
                          <div className="flex items-start gap-4">
                            {primary.image && (
                              <img
                                src={primary.image}
                                alt={`${primary.name} pack`}
                                className="h-20 w-20 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <div className="font-display text-2xl">{primary.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">{primary.family}</div>
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
                              <div className="text-sm">{primary.preHarvest ?? "Follow label directions"}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {matches.length > 1 && (
                        <div>
                          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
                            Also recommended for {crop.name}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {matches.slice(1).map((m) => (
                              <Link
                                key={m.slug}
                                to="/products/$family"
                                params={{ family: m.familySlug }}
                                className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-primary/60 hover:text-primary transition-colors"
                              >
                                {m.name}
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
