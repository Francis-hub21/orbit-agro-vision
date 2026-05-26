import { Reveal, SectionHeader } from "./Reveal";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const items = [
  {
    quote: "Orbit's crop intelligence cut our pesticide spend by 22% in one season — while increasing yield. The platform feels like a co-pilot for the entire farm.",
    name: "Joseph Kimani",
    role: "Estate Manager · Nakuru",
  },
  {
    quote: "We onboarded 340 agrovets to the distributor portal in under three months. Inventory transparency changed everything for our regional logistics.",
    name: "Achieng Otieno",
    role: "Regional Director · Kisumu",
  },
  {
    quote: "The dosage calculator alone has saved my smallholder farmers thousands. Precise, scientific and beautifully simple.",
    name: "Dr. Amina Yusuf",
    role: "Lead Agronomist · Meru",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Trusted Across Africa"
          title={<>Voices from the <span className="text-gradient-emerald">field.</span></>}
        />
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl p-8 h-full flex flex-col"
              >
                <Quote className="h-7 w-7 text-primary mb-5" />
                <p className="text-base leading-relaxed text-foreground/90 flex-1">{t.quote}</p>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="font-display text-lg">{t.name}</div>
                  <div className="text-xs tracking-wider uppercase text-muted-foreground mt-1">{t.role}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
