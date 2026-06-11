import { Reveal, SectionHeader } from "./Reveal";
import aboutImg from "@/assets/orbit/about.jpg";
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

export function Storytelling() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="About Us"
          title={<>You need agrochemicals? <span className="text-gradient-emerald">Think Orbit Agro.</span></>}
          desc="We grow through partnerships."
        />

        <Reveal>
          <div className="relative rounded-3xl overflow-hidden mb-16 aspect-[16/9] md:aspect-[21/9]">
            <img
              src={aboutImg}
              alt="Orbit Agro farmland and crop fields in Kenya"
              width={1280}
              height={854}
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
                <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4">Established 2009</div>
                <h3 className="font-display text-3xl md:text-5xl font-light leading-tight">
                  Orbit Agro Chemical <span className="text-gradient-emerald">Industries Limited.</span>
                </h3>
              </motion.div>
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Reveal>
            <div className="glass rounded-2xl p-8 md:p-10 h-full">
              <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4">Who We Are</div>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
                Orbit Agro Chemical Industries Limited (OACIL) was established in 2009. We specialize in
                the provision of superior quality crop protection products specially formulated for the
                Kenyan farmer, enabling them to enjoy high yields with very minimal investment.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Our approach is unique. We source finished products from reputable international
                manufacturers as well as raw materials, which are then formulated into finished products
                for local use.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="glass-emerald rounded-2xl p-8 md:p-10 h-full">
              <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4">Our Mission</div>
              <p className="text-xl md:text-2xl font-display font-light leading-snug">
                To achieve <span className="text-gradient-emerald">world-class manufacturing excellence</span> by
                providing competitive farming solutions tailored for farmers in Kenya and the region.
              </p>
            </div>
          </Reveal>
        </div>

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
