import { Reveal, SectionHeader } from "./Reveal";
import heroBg from "@/assets/hero-bg.jpg";
import { motion } from "framer-motion";

const pillars = [
  { n: "01", title: "Carbon-Smart Agriculture", text: "Lower-input formulations cut emissions per hectare while restoring soil biology." },
  { n: "02", title: "Food Security at Scale", text: "Equipping smallholder and enterprise growers alike with the same precision intelligence." },
  { n: "03", title: "Africa-Wide Vision", text: "From Nairobi to Lagos to Accra — building the continental backbone of agri-tech." },
];

export function Storytelling() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="The Vision"
          title={<>Africa's most advanced <span className="text-gradient-emerald">agricultural intelligence platform.</span></>}
          desc="A continent-scale ecosystem unifying crop science, distribution, AI advisory and real-time intelligence."
        />

        <Reveal>
          <div className="relative rounded-3xl overflow-hidden mb-16 aspect-[16/9] md:aspect-[21/9]">
            <img
              src={heroBg}
              alt="Aerial view of futuristic African farmland at twilight with glowing emerald crop fields and holographic data overlays"
              width={1920} height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
            <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4">Operating System of Agriculture</div>
                <h3 className="font-display text-3xl md:text-5xl font-light leading-tight">
                  Where ancient soil meets <span className="text-gradient-emerald">future intelligence.</span>
                </h3>
              </motion.div>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.1}>
              <div className="glass rounded-2xl p-8 h-full">
                <div className="font-display text-5xl text-primary/30 mb-4">{p.n}</div>
                <h4 className="font-display text-xl mb-3">{p.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
