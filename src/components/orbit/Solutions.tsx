import { Shield, Sprout, FlaskConical, Bug, Leaf, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, SectionHeader } from "./Reveal";

const items = [
  { icon: Shield, title: "Crop Protection", desc: "Broad-spectrum defense systems engineered for African agroclimates." },
  { icon: Sprout, title: "Precision Fertilization", desc: "Soil-aware nutrient blends timed to growth stage and weather." },
  { icon: FlaskConical, title: "Biostimulants", desc: "Bio-active compounds that unlock yield potential sustainably." },
  { icon: Bug, title: "Fungicides", desc: "Targeted antifungal protocols proven across staple crops." },
  { icon: Leaf, title: "Herbicides", desc: "Selective weed control engineered for minimum crop stress." },
  { icon: Brain, title: "Smart Agronomy", desc: "Field-level advisory powered by AI and regional intelligence." },
];

export function Solutions() {
  return (
    <section id="solutions" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Smart Farming Solutions"
          title={<>The complete <span className="text-gradient-emerald">agro intelligence</span> stack.</>}
          desc="Six precision-built solution lines, unified into one ecosystem trusted by farmers, distributors and enterprise growers across Africa."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full glass rounded-2xl p-7 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-700" />

                <div className="relative">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl glass-emerald group-hover:shadow-[0_0_20px_oklch(0.72_0.20_150/0.6)] transition-shadow">
                    <it.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl mb-2">{it.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>

                  <div className="mt-6 flex items-center text-xs tracking-[0.2em] uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more →
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
