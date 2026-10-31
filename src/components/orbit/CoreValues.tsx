import { Reveal } from "./Reveal";
import growImg from "@/assets/orbit/grow.jpg";
import protectImg from "@/assets/orbit/protect.jpg";
import listenImg from "@/assets/orbit/listen.jpg";
import nurtureImg from "@/assets/orbit/nurture.jpg";
import { motion } from "framer-motion";

const pillars = [
  { img: growImg, title: "We Grow", text: "Partnering with farmers to grow stronger, more productive harvests season after season." },
  { img: protectImg, title: "We Protect", text: "Defending crops from pests, weeds and disease with safe, proven formulations." },
  { img: listenImg, title: "We Listen", text: "Our agronomists work side-by-side with farmers to understand every field's needs." },
  { img: nurtureImg, title: "We Nurture", text: "Nourishing soils and crops with precision fertilizers and biostimulants for the long term." },
];

export function CoreValues() {
  return (
    <section id="core-values" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <motion.div
                animate={{ y: i % 2 === 0 ? [0, -14, 0, 14, 0] : [0, 14, 0, -14, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                className="glass rounded-2xl overflow-hidden h-full group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-display text-xl mb-2 text-primary">{p.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
