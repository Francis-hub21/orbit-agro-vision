import { Shield, Sprout, FlaskConical, Bug, Leaf, Droplets, HeartPulse, SprayCan } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, SectionHeader } from "./Reveal";

const items = [
  { icon: Bug, title: "Insecticides", desc: "Targeted insect control protecting crops from destructive pests at every growth stage." },
  { icon: Shield, title: "Fungicides", desc: "Broad-spectrum antifungal protection against blights, rusts and mildews." },
  { icon: Leaf, title: "Herbicides", desc: "Selective and non-selective weed control engineered for minimum crop stress." },
  { icon: Sprout, title: "Fertilizers", desc: "Foliar and soil nutrient blends tuned to Kenyan soils and growth stages." },
  { icon: FlaskConical, title: "Bio Stimulants", desc: "Bio-active compounds that unlock yield potential and stress resilience." },
  { icon: Droplets, title: "Soil Conditioners", desc: "Restorative formulations that rebuild soil structure, pH and microbial life." },
  { icon: HeartPulse, title: "Public Health", desc: "Vector and pest control solutions for homes, institutions and public spaces." },
  { icon: SprayCan, title: "Knapsack Sprayers", desc: "Durable, precision-engineered sprayers for accurate field application." },
];

export function Solutions() {
  return (
    <section id="solutions" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Our Products"
          title={<>Superior quality <span className="text-gradient-emerald">crop protection</span> for the Kenyan farmer.</>}
          desc="Eight product lines specially formulated to help farmers enjoy high yields with very minimal investment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
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
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
