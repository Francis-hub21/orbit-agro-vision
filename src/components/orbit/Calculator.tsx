import { useState, useMemo, useEffect } from "react";
import { Reveal, SectionHeader } from "./Reveal";
import { Calculator as CalcIcon, Droplets, Clock, ShieldAlert, Leaf, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";
import { crops, cropProducts } from "@/data/crops";
import { phiDays } from "./CropDoctor";

/** Pull the "x ml/g per 20 L" figure out of a catalogue application-rate string. */
function parseRatePer20L(rate?: string): { value: number; unit: string } | null {
  if (!rate) return null;
  const m = rate.match(/(\d+(?:\.\d+)?)\s*(?:–|-)?\s*(\d+(?:\.\d+)?)?\s*(ml|g|gms|gm)\s*\/\s*20\s*L/i);
  if (!m) return null;
  const low = parseFloat(m[1]);
  const high = m[2] ? parseFloat(m[2]) : low;
  const unit = m[3].toLowerCase().startsWith("g") ? "g" : "ml";
  return { value: (low + high) / 2, unit };
}

export function Calculator() {
  const [cropId, setCropId] = useState(crops[0].id);
  const crop = crops.find((c) => c.id === cropId) ?? crops[0];
  const products = useMemo(() => cropProducts(crop), [crop]);

  const [productSlug, setProductSlug] = useState(products[0]?.slug ?? "");
  useEffect(() => {
    setProductSlug(products[0]?.slug ?? "");
  }, [products]);
  const product = products.find((p) => p.slug === productSlug) ?? products[0];

  const parsed = parseRatePer20L(product?.applicationRate);
  const [acres, setAcres] = useState(2.5);
  const [sprayer, setSprayer] = useState(20);
  const [rate, setRate] = useState(parsed?.value ?? 35);

  useEffect(() => {
    if (parsed) setRate(parsed.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSlug]);

  const unit = parsed?.unit ?? "ml";
  const totalWater = useMemo(() => Math.round(acres * 200), [acres]); // 200 L/acre baseline
  const totalProduct = useMemo(() => Math.round((totalWater / 20) * rate), [totalWater, rate]);
  const tanks = useMemo(() => Math.ceil(totalWater / sprayer), [totalWater, sprayer]);

  /**
   * Safety interval (PHI) adjusted to the actual programme: the product's own label PHI is
   * the baseline, then scaled by how far the chosen rate sits above/below the label rate and
   * by tank size (bigger tanks = heavier, coarser deposits per pass).
   */
  const labelRate = parsed?.value ?? rate;
  const basePhi = phiDays(product?.preHarvest);
  const rateFactor = labelRate > 0 ? rate / labelRate : 1;
  const tankFactor = 1 + (sprayer - 20) / 400;
  const phiFactor = Math.min(2.5, Math.max(0.6, rateFactor * tankFactor));
  const adjustedPhi = basePhi !== null ? Math.max(1, Math.round(basePhi * phiFactor)) : null;

  return (
    <section id="calculator" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Precision Dosage Calculator"
          title={<>Zero waste. <span className="text-gradient-emerald">Zero guesswork.</span></>}
          desc="Pick your crop and the matched Orbit Agro product — dosage, water volume and the product's own pre-harvest safety interval are calculated for you."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="glass rounded-3xl p-8 md:p-10 space-y-8">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Crop / Plant</div>
                <div className="flex flex-wrap gap-2">
                  {crops.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCropId(c.id)}
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs border transition-all ${
                        cropId === c.id ? "border-primary bg-primary/15 text-primary" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img src={c.image} alt="" loading="lazy" className="h-5 w-5 object-contain" />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                  Product for {crop.name}
                </div>
                <div className="flex flex-wrap gap-2">
                  {products.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => setProductSlug(p.slug)}
                      className={`rounded-xl px-4 py-2 text-xs border text-left transition-all ${
                        productSlug === p.slug
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <Slider label="Acreage" value={acres} min={0.25} max={50} step={0.25} unit="acres" onChange={setAcres} />
              <Slider label="Sprayer Tank" value={sprayer} min={5} max={200} step={5} unit="L" onChange={setSprayer} />
              <Slider
                label="Product Rate"
                value={rate}
                min={1}
                max={150}
                step={1}
                unit={`${unit} / 20L`}
                onChange={setRate}
              />
              {product?.applicationRate && (
                <p className="text-xs text-muted-foreground">
                  Label rate for {product.name}: {product.applicationRate}
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="glass-emerald rounded-3xl p-8 md:p-10 h-full relative overflow-hidden">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl glass-emerald flex items-center justify-center">
                    <CalcIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-primary">Live Calculation</div>
                </div>

                <ResultRow icon={Leaf} label="Crop / Plant" value={crop.name} />
                <ResultRow icon={FlaskConical} label="Product" value={product?.name ?? "—"} />
                <ResultRow
                  icon={ShieldAlert}
                  label="Targets on this crop"
                  value={(product?.targets?.slice(0, 3).join(", ") || crop.threats.slice(0, 3).join(", ")) ?? "—"}
                />
                <ResultRow
                  icon={Droplets}
                  label="Total Product Needed"
                  value={`${totalProduct.toLocaleString()} ${unit}`}
                  accent
                />
                <ResultRow icon={Droplets} label="Total Water Volume" value={`${totalWater.toLocaleString()} L`} />
                <ResultRow icon={Clock} label="Spray Tanks Required" value={`${tanks} tanks`} />
                <ResultRow
                  icon={ShieldAlert}
                  label="Adjusted Safety Interval (PHI)"
                  value={adjustedPhi !== null ? `${adjustedPhi} days` : product?.preHarvest ?? "Follow label directions"}
                  accent
                />
                <ResultRow
                  icon={ShieldAlert}
                  label="Label PHI"
                  value={product?.preHarvest ?? "Follow label directions"}
                />

                <div className="mt-8 pt-6 border-t border-primary/20 text-xs text-muted-foreground leading-relaxed">
                  {adjustedPhi !== null && basePhi !== null && (
                    <>
                      At {rate} {unit}/20L in a {sprayer} L tank, the interval on {product?.name} shifts from{" "}
                      {basePhi} to {adjustedPhi} days — heavier rates and larger tanks leave more residue, lighter rates
                      less. Never harvest earlier than the label PHI.{" "}
                    </>
                  )}
                  Always read the {product?.name ?? "product"} label. Wear appropriate PPE. Apply during cool, low-wind
                  conditions for optimal absorption.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label, value, min, max, step, unit, onChange,
}: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{label}</div>
        <div className="font-display text-2xl text-gradient-emerald">
          {value} <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </div>
      <div className="relative h-1.5 rounded-full bg-border">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-emerald-glow shadow-[0_0_10px_var(--color-primary)]"
          style={{ width: `${pct}%` }}
        />
        <input name={label.toLowerCase().replace(/\s+/g, "-")}
          type="range"
          min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          aria-label={label}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_14px_var(--color-primary)] pointer-events-none"
          style={{ left: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ResultRow({ icon: Icon, label, value, accent = false }: { icon: typeof Droplets; label: string; value: string; accent?: boolean }) {
  return (
    <motion.div layout className="flex items-center justify-between gap-4 py-4 border-b border-border last:border-0">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </div>
      <div className={`font-display text-right ${accent ? "text-3xl text-gradient-emerald" : "text-lg"}`}>{value}</div>
    </motion.div>
  );
}
