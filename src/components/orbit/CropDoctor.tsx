import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Microscope, ShieldCheck, AlertTriangle } from "lucide-react";
import { Reveal, SectionHeader } from "./Reveal";

const crops = [
  { id: "tomato", name: "Tomato", emoji: "🍅", threats: ["Late Blight", "Whitefly", "Bacterial Wilt"], product: "Orbit Phytoshield 250 SC", dose: "30 ml / 20L", safety: "Re-entry 24h · PHI 7 days" },
  { id: "maize", name: "Maize", emoji: "🌽", threats: ["Fall Armyworm", "Maize Streak", "Rust"], product: "Orbit Armorforce 480 EC", dose: "40 ml / 20L", safety: "Re-entry 12h · PHI 14 days" },
  { id: "coffee", name: "Coffee", emoji: "☕", threats: ["Coffee Berry Disease", "Leaf Rust", "Antestia Bug"], product: "Orbit BerryGuard Pro", dose: "25 ml / 20L", safety: "Re-entry 24h · PHI 30 days" },
  { id: "wheat", name: "Wheat", emoji: "🌾", threats: ["Stem Rust", "Aphids", "Septoria"], product: "Orbit TriCore 300 EC", dose: "35 ml / 20L", safety: "Re-entry 12h · PHI 21 days" },
  { id: "potato", name: "Potato", emoji: "🥔", threats: ["Late Blight", "Tuber Moth", "Bacterial Wilt"], product: "Orbit Tuberon 500", dose: "50 ml / 20L", safety: "Re-entry 24h · PHI 10 days" },
  { id: "kale", name: "Kale", emoji: "🥬", threats: ["Diamondback Moth", "Aphids", "Black Rot"], product: "Orbit Greenshield 200", dose: "20 ml / 20L", safety: "Re-entry 6h · PHI 7 days" },
];

const regions = ["Rift Valley", "Central", "Western", "Eastern", "Coast"];
const stages = ["Seedling", "Vegetative", "Flowering", "Fruiting", "Harvest"];

export function CropDoctor() {
  const [crop, setCrop] = useState(crops[0]);
  const [region, setRegion] = useState(regions[0]);
  const [stage, setStage] = useState(stages[2]);

  return (
    <section id="crop-doctor" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Crop Doctor · Intelligence Engine"
          title={<>Diagnose. Match. <span className="text-gradient-emerald">Treat in seconds.</span></>}
          desc="Skip hours of guesswork. Select your crop, region and stage — receive precision-matched Orbit solutions with verified dosage and safety guidance."
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
                        <h3 className="font-display text-3xl">{crop.name} <span className="text-muted-foreground">· {region}</span></h3>
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
                            <span key={t} className="rounded-full px-3 py-1 text-xs glass border-destructive/30 text-destructive-foreground/90">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl bg-primary/10 border border-primary/30 p-5">
                        <div className="flex items-center gap-2 mb-2 text-xs tracking-[0.2em] uppercase text-primary">
                          <ShieldCheck className="h-3 w-3" /> Recommended Solution
                        </div>
                        <div className="font-display text-2xl mb-1">{crop.product}</div>
                        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-primary/20">
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Dosage</div>
                            <div className="font-display text-lg text-primary">{crop.dose}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Safety</div>
                            <div className="text-sm">{crop.safety}</div>
                          </div>
                        </div>
                      </div>

                      <button className="w-full rounded-full bg-primary py-3.5 text-sm uppercase tracking-[0.2em] text-primary-foreground hover:shadow-[0_0_30px_oklch(0.72_0.20_150/0.7)] transition-all">
                        Request This Product
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
