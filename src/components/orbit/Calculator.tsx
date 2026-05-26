import { useState, useMemo } from "react";
import { Reveal, SectionHeader } from "./Reveal";
import { Calculator as CalcIcon, Droplets, Clock, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export function Calculator() {
  const [acres, setAcres] = useState(2.5);
  const [sprayer, setSprayer] = useState(20);
  const [rate, setRate] = useState(35); // ml/20L

  const totalWater = useMemo(() => Math.round(acres * 200), [acres]); // 200 L/acre baseline
  const totalProduct = useMemo(() => Math.round((totalWater / sprayer) * rate), [totalWater, sprayer, rate]);
  const tanks = useMemo(() => Math.ceil(totalWater / sprayer), [totalWater, sprayer]);

  return (
    <section id="calculator" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Precision Dosage Calculator"
          title={<>Zero waste. <span className="text-gradient-emerald">Zero guesswork.</span></>}
          desc="Calibrate your spray to the milliliter. Engineered to eliminate over-application, protect crops and maximize your investment."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="glass rounded-3xl p-8 md:p-10 space-y-8">
              <Slider label="Acreage" value={acres} min={0.25} max={50} step={0.25} unit="acres" onChange={setAcres} />
              <Slider label="Sprayer Tank" value={sprayer} min={5} max={200} step={5} unit="L" onChange={setSprayer} />
              <Slider label="Product Rate" value={rate} min={5} max={100} step={1} unit="ml / 20L" onChange={setRate} />
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

                <ResultRow icon={Droplets} label="Total Product Needed" value={`${totalProduct.toLocaleString()} ml`} accent />
                <ResultRow icon={Droplets} label="Total Water Volume" value={`${totalWater.toLocaleString()} L`} />
                <ResultRow icon={Clock} label="Spray Tanks Required" value={`${tanks} tanks`} />
                <ResultRow icon={ShieldAlert} label="Safety Interval (PHI)" value="14 days" />

                <div className="mt-8 pt-6 border-t border-primary/20 text-xs text-muted-foreground leading-relaxed">
                  Always read the product label. Wear appropriate PPE. Apply during cool, low-wind conditions for optimal absorption.
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
        <input
          type="range"
          min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
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
    <motion.div
      layout
      className={`flex items-center justify-between py-4 border-b border-border last:border-0 ${accent ? "" : ""}`}
    >
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </div>
      <div className={`font-display ${accent ? "text-3xl text-gradient-emerald" : "text-lg"}`}>{value}</div>
    </motion.div>
  );
}
